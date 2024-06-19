import { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layouts/Loader";
import Product from "./product/Product";
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState); //here pass the state of the full app and access the specific state key and extract the wanted properties
  const [currentPage, setCurrentPage] = useState(1);

  //here this func for change the currentpage number as per the onChange lis val and stored it
  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo)
  }

  //this func is called when the component is loaded
  useEffect(() => {
    if(error) { //here set the error message using toast
      return toast.error(error, {
        position: "bottom-center"
      })
    }
    dispatch(getProducts(null, null, null, null, currentPage)) //here send this dispatch as a params to this func and send the current page number to this func for use this in url
  }, [error, dispatch, currentPage]) //here set the error for when the error come from the state the useeffect find this error and execute the toast message everytime the error occur

  return (
    <Fragment>
      {loading ? <Loader /> : 
        <Fragment>
          <MetaData title={"Buy Best Products"} />{" "}
          {/* here using props to set the title for home page */}
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              { products && products.map(product => (
                  <Product col={3} key={product._id} product={product} /> //here pass the product as a props
              ))}
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? //here set condition for it'll run only when the productsCount val above 0 otherwise it won't be run it'll null and productsCount val is above 3 pagination will show if equal or less than 3 the pagination won't be show 
          <div className="d-flex justify-content-center mt-5">
                <Pagination 
                  activePage={currentPage} //here set the 'currentPage' state val as a activePage val so this shows the first page as per the val
                  onChange={setCurrentPageNo} //here get the current page no as per the user click
                  totalItemsCount={productsCount} //here give the total count of the products
                  itemsCountPerPage={resPerPage} //here set the count of the products in one page 
                  nextPageText={'Next'} //here set the next icon name as 'Next'
                  firstPageText={'First'} //here set the first icon name as 'First'
                  lastPageText={'Last'} //here set the last icon name as 'Last'
                  itemClass={'page-item'} //here using this bootstrap class to activate the all icons
                  linkClass={'page-link'} //here using this bootstrap class to change the link to box design format
                />
          </div> : null }
        </Fragment>
      }
    </Fragment>
  );
}
