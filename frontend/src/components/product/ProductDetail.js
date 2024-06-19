import { Fragment, useEffect, useState } from "react";
import { createReview, getProduct } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../layouts/Loader";
import { Carousel } from "react-bootstrap";
import Metadata from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import { Modal } from "react-bootstrap";
import { clearError, clearProduct, clearReviewSubmitted } from "../../slices/productSlice";
import { toast } from "react-toastify";
import ProductReview from "./ProductReview";

export default function ProductDetail() {
  const { product={}, loading, isReviewSubmitted, error } = useSelector((state) => state.productState);
  const { user } = useSelector(state => state.authState)
  const dispatch = useDispatch();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);


  //here create this func for increase the quantity using '+' btn
  const increaseQty = () => {
    const count = document.querySelector(".count"); //here get the count value of the qty input field val from count class ('.count') in the html code
    if (product.stock === 0 || count.valueAsNumber >= product.stock) {
      //here we set this condition for won't increase the count when stock val is zero or count val is greater or equal to stock val
      return;
    }
    const qty = count.valueAsNumber + 1; //so here if condition failed then this line will execute. so count val increased
    setQuantity(qty); //here set the increased qty val
  };

  //here create this func for decrease the quantity using '-' btn
  const decreaseQty = () => {
    const count = document.querySelector(".count"); //here get the count value of the qty input field val from count class ('.count') in the html code
    if (count.valueAsNumber === 1) {
      //here we set this condition for won't increase the count when stock val is not zero and count val is greater or equal to stock val
      return;
    }
    const qty = count.valueAsNumber - 1; //so here if condition failed then this line will execute. so count val increased
    setQuantity(qty); //here set the increased qty val
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState();

  const reviewHandler = () => {
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('comment', comment);
    formData.append('productId', id);
    dispatch(createReview(formData));
  }

  useEffect(() => {
    if (isReviewSubmitted) {
      handleClose()
      toast('Review Submitted Successfully', {
        type: 'success',
        position: 'bottom-center',
        onOpen: () => { dispatch(clearReviewSubmitted()) } //here we set the isUpdated val as false after the toast message shown so we don't get toast message every time open the updated page after got updated message
      })
      
    }

    if(error) { //here update failed this toast message will appear
      toast(error, {
          position: "bottom-center",
          type: 'error',
          onOpen: () => { dispatch(clearError()) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the updated page after got error message
      })
      return 
    }

    //here this cond are true this will execute and bring this product page
    if (!product._id || isReviewSubmitted) {
      dispatch(getProduct(id));
    }

    return () => {
      dispatch(clearProduct())
    }

  }, [dispatch, id, isReviewSubmitted, error, product._id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={product.name} />
          <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              {/*using this Carousel for we get the option to move the images like slide */}
              <Carousel pause="hover">
                {" "}
                {/* here using this pause="hover" for stop(pause) the images movement when the cursor on the image */}
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image._id}>
                      <img
                        className="d-block w-100"
                        src={image.image}
                        alt={product.name}
                        height="500"
                        width="500"
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>
              <p id="product_id">Product # {product._id}</p>

              <hr />

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>
              <button
                type="button"
                id="cart_btn"
                disabled={product.stock === 0 ? true : false}
                onClick={() => {dispatch(addCartItem(product._id, quantity))
                  toast('Cart Item Added!', {
                    type: 'success',
                    position: 'bottom-center'
                  })
                }} //here set when this btn is clicked dispatched to addcartitem in the cartactions file
                className="btn btn-primary d-inline ml-4"
              >
                Add to Cart
              </button>

              <hr />

              <p>
                Status:{" "}
                <span
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                  id="stock_status"
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>
              <p>{product.description}</p>
              <hr />
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              { user ? 
              <button
                onClick={handleShow}
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button> :
              <div className="alert alert-danger mt-5">Login to Post Review</div>
              }


              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  {/* here this modal package using for create review submit */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ul className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <li 
                          className={`star ${star<=rating ? 'orange' : ''}`} //here set the orage color for when we click the star 
                          value={star} 
                          onClick={() => setRating(star)} 
                          onMouseOver={(e) => e.target.classList.add('yellow')} //here set yellow color when mouse on the star
                          onMouseOut={(e) => e.target.classList.remove('yellow')}
                          >
                            <i className="fa fa-star"></i>
                          </li>
                        ))}
                      </ul>

                      <textarea
                        onChange={(e) => setComment(e.target.value)}
                        name="review"
                        id="review"
                        className="form-control mt-3"
                      ></textarea>
                      <button
                            disabled={loading}
                            onClick={reviewHandler}
                            className="btn my-3 float-right review-btn px-4 text-white"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 ?
          <ProductReview reviews={product.reviews} /> : null
          }
        </Fragment>
      )}
    </Fragment>
  );
}
