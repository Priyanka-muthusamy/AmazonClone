import { Fragment, useEffect, useState } from "react";
import MetaData from ".././layouts/MetaData";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from ".././layouts/Loader";
import Product from ".././product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css';

export default function ProductSearch() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  ); //here pass the state of the full app and access the specific state key and extract the wanted properties
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1,1000]); //here store the price amt as per the slider move
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [rating, setRating] = useState(0);
  
  const { keyword } = useParams(); //here get the keyword from the url
  const categories = [
  'Electronics',
  'Mobile Phones',
  'Laptops',
  'Accessories',
  'Headphones',
  'Food',
  'Books',
  'Clothes/Shoes',
  'Beauty/Health',
  'Sports',
  'Outdoor',
  'Home'
  ];

  //here this func for change the currentpage number as per the onChange lis val and stored it
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  //this func is called when the component is loaded
  useEffect(() => {
    if (error) {
      //here set the error message using toast
      return toast.error(error, {
        position: "bottom-center",
      });
    }
    dispatch(getProducts(keyword, priceChanged, category, rating, currentPage)); //here send this dispatch as a params to this func and send the current page number to this func for use this in url
  }, [error, dispatch, currentPage, keyword, priceChanged, category, rating]); //here set the error for when the error come from the state the useeffect find this error and execute the toast message everytime the error occur like this it'll execute the other keys

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy Best Products"} />{" "}
          {/* here using props to set the title for home page */}
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md-3 mb-5 mt-5"> 
                {/* Price Filter */}
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}> {/* here this mouseup used for onchange listener and it can be particularly useful for scenarios where you want to avoid making continuous API calls or updates while the user is still dragging the slider, and instead only update the state or perform an action once the user has finished adjusting the slider. */}
                  <Slider //using this for create range slider
                    range={true} //using this we set the range of the slider
                    marks={
                      //in this we give the text name of this range
                      {
                        1: "$1",
                        1000: "$1000",
                      }
                    }
                    min={1}
                    max={1000}
                    defaultValue={price} //here give the starting val of the range and we can move this slider val
                    onChange={(price) => { //using this to get the current range val and set it in the price state
                      setPrice(price)
                    }}
                    //handleRender - This is a function prop passed to a component that allows for custom rendering. It's often seen in libraries that provide components where users might want to customize how certain parts of the component are rendered.
                    handleRender={(renderProps) => { //This is an object that is passed into the handleRender function. It contains properties and possibly methods that are used to render the component. The renderProps object usually includes props like props, value, or other context-specific properties.
                      return (
                        <Tooltip //This is a component (likely from a UI library) that provides a tooltip (a message that appears when a user hovers over an element). The overlay prop is used to specify the content of the tooltip.
                          //Displays the current value of the slider handle (aria-valuenow), prefixed with a dollar sign.
                          overlay={`$${renderProps.props["aria-valuenow"]}`} //This accesses a specific property aria-valuenow from the props object within renderProps. aria-valuenow is typically used in ARIA (Accessible Rich Internet Applications) to define the current value of a widget, such as a slider.
                          placement="top"
                        >
                          <span> {/* here we use span for make single React element child. */}
                          <div {...renderProps.props}></div> {/* Passes all the original handle properties to the <div> element */}
                          </span>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/* Category Filter */}
                <div className="mt-5">
                  <h3 className="mb-3">Categories</h3>
                  <ul className="pl-0">
                    {categories.map((category) => 
                    <li
                      style={{
                        cursor:"pointer",
                        listStyleType: "none"
                      }}
                      key={category}
                      onClick={() => {
                        setCategory(category)
                      }}
                    >
                      {category}
                    </li>
                    )}
                  </ul>
                </div>
                <hr className="my-5" />
                {/* Ratings Filter */}
                <div className="mt-5">
                  <h4 className="mb-3">Ratings</h4>
                  <ul className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => //here we map this array star val
                    <li
                      style={{
                        cursor:"pointer",
                        listStyleType: "none"
                      }}
                      key={star}
                      onClick={() => {
                        setRating(star) //here if we click 2 stars it'll set rating val as 2 then it'll show only 2 star rating products
                      }}
                    >
                      {/* in this we create the stars div and as per the width calculation the star colours filled */}
                      <div className="rating-outer">
                        <div 
                        className="rating-inner"
                        style={{
                          width: `${star * 20}%`
                        }}
                        >

                        </div>
                      </div>
                    </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} /> //here pass the product as a props
                    ))}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? ( //here set condition for it'll run only when the productsCount val above 0 otherwise it won't be run it'll null and productsCount val is above 3 pagination will show if equal or less than 3 the pagination won't be show
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage} //here set the 'currentPage' state val as a activePage val so this shows the first page as per the val
                onChange={setCurrentPageNo} //here get the current page no as per the user click
                totalItemsCount={productsCount} //here give the total count of the products
                itemsCountPerPage={resPerPage} //here set the count of the products in one page
                nextPageText={"Next"} //here set the next icon name as 'Next'
                firstPageText={"First"} //here set the first icon name as 'First'
                lastPageText={"Last"} //here set the last icon name as 'Last'
                itemClass={"page-item"} //here using this bootstrap class to activate the all icons
                linkClass={"page-link"} //here using this bootstrap class to change the link to box design format
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
