import { Fragment, useEffect } from "react";
import MetaData from "../layouts/MetaData";
import { validateShipping } from './Shipping';
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

export default function ConfirmOrder() {

    const { shippingInfo, items: cartItems } = useSelector(state => state.cartState);
    const { user } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0) //here cal the total price of the cart items
    const shippingPrice = itemsPrice > 200 ? 0 : 25; //here set the price of the shipping as per items price
    let taxPrice = Number(0.05 * itemsPrice); //here just cal and store it like number and add this val to totalprice const then again set 2 digit number 
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2); //here set the total amt of the order
    taxPrice = Number(taxPrice).toFixed(2); //here set the tax cal and set 2 digit val of after point(234.10) using number func

    //here set the func for payment btn
    const processPayment = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        //sessionStorage is a js func. this sessionStorage is a temporary storage it'll remove once browser closed
        sessionStorage.setItem('orderInfo', JSON.stringify(data)) //here store this data in the sessionstorage func because we use this data in payment page
        navigate('/payment');
    }

    //here using this func from shipping page for get the toast message when user click this confirm order btn without fill the shipping info
    useEffect(() => {
        validateShipping(shippingInfo, navigate)
    },[shippingInfo, navigate])

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <CheckoutSteps shipping confirmOrder /> {/* here give this shipping and confirmorder true props for set the active color because we are in the confirm page and shipping details also done already */}
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>
          {cartItems.map((item) => (
            <Fragment>
                <div className="cart-item my-1">
                  <div className="row">
                    <div className="col-4 col-lg-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        height="45"
                        width="65"
                      />
                    </div>
      
                    <div className="col-5 col-lg-6">
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </div>
      
                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                      <p>
                        {item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b>
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping: <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>

            <hr />
            <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
