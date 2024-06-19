import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productActions";
import { clearError, clearProductUpdated } from "../../slices/productSlice";
import { toast } from "react-toastify";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const { loading, isProductUpdated, error, product } = useSelector(
    (state) => state.productState
  );

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

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState == 2) {//here set if reader is get the url this will run
                setImagesPreview(oldArray => [...oldArray, reader.result]) //here set old values with new value
                setImages(oldArray => [...oldArray, file])
            }
        }

        reader.readAsDataURL(file) //here this func is read the file as url
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('seller', seller);
    formData.append('category', category);
    images.forEach(image => {
        formData.append('images', image)
    })
    formData.append('imagesCleared', imagesCleared);
    dispatch(updateProduct(productId, formData))
  }

  //here this func is for clear the images
  const clearImageHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  }

  useEffect(() => {
    if(isProductUpdated) {
        toast('Product Updated Successfully', {
            type: 'success',
            position: 'bottom-center',
            onOpen: () => { dispatch(clearProductUpdated()) } //here we set the isUpdated val as false after the toast message shown so we don't get toast message every time open the updated page after got updated message
        })
        //setImages([]) //here set images empty because it'll updated duplicated like it'll update once again the same image we already updated if we update other field it'll add the previous updated image again so here we set image empty so it'll be cleared when this image updated successfully
        return;
    }   

    if(error) { //here update failed this toast message will appear
        toast(error, {
            position: "bottom-center",
            type: 'error',
            onOpen: () => { dispatch(clearError()) } //here we set the error val as null after the toast message shown so we don't get toast message every time open the updated page after got error message
        })
        return 
    }
    dispatch(getProduct(productId)) //here this will dispatch this action so we get the specific product details in the update product id field. so in this it'll pass the product id and get the product data
}, [isProductUpdated, error, dispatch, productId])

//here this is for show the content of the product which we choosed to edit in the update product page
useEffect(() => {
    if(product._id) {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
        setSeller(product.seller);
        setCategory(product.category);

        let images = []; //here set image const empty
        product.images.forEach(image => { //here using this func for loop the array val in the product images field
            images.push(image.image) //here push the product images in the const images field
        })
        setImagesPreview(images) //here set the new const images val into preview
    }
},[product])

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="wrapper my-5">
            <form onSubmit={submitHandler} className="shadow-lg" encType="multipart/form-data">
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={e => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={e => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={e => setDescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="category_field">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                  <option value=''>Select</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Stock</label>
                <input
                  type="number"
                  id="stock_field"
                  className="form-control"
                  onChange={e => setStock(e.target.value)}
                  value={stock}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Seller Name</label>
                <input
                  type="text"
                  id="seller_field"
                  className="form-control"
                  onChange={e => setSeller(e.target.value)}
                  value={seller}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />

                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                { imagesPreview.length > 0 && <span className="mr-2" onClick={clearImageHandler} style={{cursor: "pointer"}}><i className="fa fa-trash"></i></span> }
                {imagesPreview.map((image) => (
                    <img 
                        className="mt-3 mr-2"
                        key={image}
                        src={image}
                        alt="Image Preview"
                        width='55'
                        height='52'
                    />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                disabled={loading}
                className="btn btn-block py-3"
              >
                UPDATE
              </button>
            </form>
          </div>
        </Fragment>
      </div>
    </div>

    )
}