import { Link } from 'react-router-dom';

//in this we send the home page data's to the home component
export default function Product({ product, col }) { //here we get the product as a props from the home component file and send col for change the products size in the lg screen as 4 in the search page
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
      <img className="card-img-top mx-auto" alt={product.name} src={product.images[0].image} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{
                  width: `${(product.ratings / 5) * 100}%`,
                }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
