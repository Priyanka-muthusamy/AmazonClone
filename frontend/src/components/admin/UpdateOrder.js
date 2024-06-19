import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateOrder,
  orderDetail as orderDetailAction,
} from "../../actions/orderActions";
import { clearError, clearOrderUpdated } from "../../slices/orderSlice";

export default function UpdateOrder() {
  const { loading, isOrderUpdated, error, orderDetail } = useSelector(
    (state) => state.orderState
  );
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},
  } = orderDetail;
  const isPaid = paymentInfo.status === "succeeded" ? true : false;
  const [orderStatus, setOrderStatus] = useState("Processing"); //here we set the admin can only change the order status so here we create only order status state var
  const { id: orderId } = useParams();

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const orderData = {};
    orderData.orderStatus = orderStatus;
    dispatch(updateOrder(orderId, orderData));
  };

  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order Updated Successfully", {
        type: "success",
        position: "bottom-center",
        onOpen: () => {
          dispatch(clearOrderUpdated());
        }, //here we set the isUpdated val as false after the toast message shown so we don't get toast message every time open the updated page after got updated message
      });
      //setImages([]) //here set images empty because it'll updated duplicated like it'll update once again the same image we already updated if we update other field it'll add the previous updated image again so here we set image empty so it'll be cleared when this image updated successfully
      return;
    }

    if (error) {
      //here update failed this toast message will appear
      toast(error, {
        position: "bottom-center",
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        }, //here we set the error val as null after the toast message shown so we don't get toast message every time open the updated page after got error message
      });
      return;
    }
    dispatch(orderDetailAction(orderId)); //here this will dispatch this action so we get the specific product details in the update product id field. so in this it'll pass the product id and get the product data
  }, [isOrderUpdated, error, dispatch, orderId]);

  //here this is for show the content of the product which we choosed to edit in the update product page
  useEffect(() => {
    if (orderDetail._id) {
      setOrderStatus(orderDetail.orderStatus);
    }
  }, [orderDetail]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderDetail._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user.name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && orderStatus.includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
            <div className="col-12 col-lg-3 mt-5">
              <h4 className="my-4">Order Status</h4>
              <div className="form-group">
                <select 
                className="form-control"
                onChange={e => setOrderStatus(e.target.value)}
                value={orderStatus}
                name="status"
                >
                  <option value={"Processing"}>Processing</option>
                  <option value={"Shipped"}>Shipped</option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </div>
              <button 
                className="btn btn-primary btn-block"
                disabled = {loading}
                onClick={submitHandler}
                >
                  Update Status
                </button>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
}
