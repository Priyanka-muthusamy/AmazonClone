import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShipping } from "./Shipping";
import { CardNumberElement, CardExpiryElement,CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
  const stripe = useStripe(); //using this hook func for do some front-end stripe works
  const elements = useElements(); //using this react hook func for access the front-end payment related elements
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')); //here get the orderInfo from the sessionstorage and this sessionstorage is string type so here using parse to change string to obj and stored it
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems={}, shippingInfo={} } = useSelector(
    (state) => state.cartState
  );
  const { error:orderError } = useSelector(state => state.orderState)
  
  //here this const have the all payment details
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100), //here cal the totalprice as paisa in india money and round the total amt
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    }
  }

  //here create order details
  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  //if the orderInfo is true the this condition will run
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  //here using this shipping func for checks the user gave shipping info or not
  useEffect(() => {
    validateShipping(shippingInfo, navigate);
    if(orderError) {
      toast(orderError, {
        position: "bottom-center",
        type: 'error', //here set toast message box color error
        onOpen: () => { dispatch(clearOrderError) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the login page after got error message
    })
    return 
    }
  }, [shippingInfo, navigate, dispatch, orderError]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector('#pay_btn').disabled = true; //here set the pay btn disabled using queryselector 
    try {
        const { data } = await axios.post('/api/v1/payment/process', paymentData)
        const clientSecret = data.client_secret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement), //here store the CardNumberElement details
                billing_details: {
                    name: user.name,
                    email: user.email
                }
            }
        })

        if(result.error) {
            toast(result.error.message, {
                type: "error",
                position: "bottom-center"
            })
            document.querySelector('#pay_btn').disabled = false;
        }else {
            if(result.paymentIntent.status === 'succeeded') {
                toast('Payment Success', {
                    type: "success",
                    position: "bottom-center"
                })
                order.paymentInfo = { //here give paymentinfo into order
                  id: result.paymentIntent.id,
                  status: result.paymentIntent.status
                }
                dispatch(orderCompleted()) //here dispatch this func for remove the data's of cartitems, shippinginfo, orderinfo after complete the payment of the order
                dispatch(createOrder(order))
                navigate('/order/success')
            }else{
                toast('Please Try again', {
                    type: "warning",
                    position: "bottom-center"
                })
            }
        }

    } catch (error) {
      toast('Payment failed. Please try again.', {
        type: "error",
        position: "bottom-center"
      });
      document.querySelector('#pay_btn').disabled = false;
    }
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form onSubmit={submitHandler} className="shadow-lg">
          <h1 className="mb-4">Card Info</h1>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
              value=""
            />
          </div>

          <button id="pay_btn" type="submit" className="btn btn-block py-3">
            Pay - {` $${orderInfo && orderInfo.totalPrice} `} {/* here set the total amt from orderInfo and set condition if the orderInfo have any value then this val will get */}
          </button>
        </form>
      </div>
    </div>
  );
}
