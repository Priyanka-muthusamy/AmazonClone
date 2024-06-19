import axios from 'axios';
import { adminProductsFail, adminProductsRequest, adminProductsSuccess, productsFail, productsRequest, productsSuccess } from '../slices/productsSlice'; //here import the action creator
import { createReviewFail, createReviewRequest, createReviewSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, deleteReviewFail, deleteReviewRequest, deleteReviewSuccess, newProductFail, newProductRequest, newProductSuccess, productFail, productRequest, productSuccess, reviewsFail, reviewsRequest, reviewsSuccess, updateProductFail, updateProductRequest, updateProductSuccess } from '../slices/productSlice'; //here import the action creator


//here we set how to the actions get the products data from the api request 
export const getProducts = (keyword, price, category, rating, currentPage) => async (dispatch) => { //here this "dispatch" is a hook func so we can't able to create this func directly here so we create this hook func in home component 
    // here using this dispatch hook func for send these action creator information to the reducers then reducers change the state val
    try {
        dispatch(productsRequest()) //here we won't give any data(payload) so we can't able to access the data
        let link = `/api/v1/products?page=${currentPage}`;

        //here set if the keyword have any val then this will execute otherwise the keyword null it won't be execute
        if(keyword) {
            link += `&keyword=${keyword}` //here concadinate previous link with this keyword url if the keyword have any val
        }
        //in this we get the shorted products by short the range val using gte and lte condition
        if(price) {
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}` //here concadinate previous link with this price url if the keyword have any val and price is greater than(gte) 1(price[0]) & price is less than(lte) 1000(price[1])
        }

        if(category) {
            link += `&category=${category}`
        }

        if(rating) {
            link += `&ratings=${rating}`
        }

        const { data } = await axios.get(link); //here get the products data from this url ange set the page num as per the pagination
        dispatch(productsSuccess(data)) //we access this data in the productsSlice file reducers func like 'action.payload.products'. so the data params is a payload
    } catch (error) {
        //handle error
        dispatch(productsFail(error.response.data.message)) //here we access the error message in the axios
    }
    
}


//here we set how to the actions get the product data from the api request 
//here we get this id val as a params
export const getProduct = id => async (dispatch) => { //here this "dispatch" is a hook func so we can't able to create this func directly here so we create this hook func in home component 
    // here using this dispatch hook func for send these action creator information to the reducers then reducers change the state val
    try {
        dispatch(productRequest()) //here we won't give any data(payload) so we can't able to access the data
        const { data } = await axios.get(`/api/v1/product/${id}`); //here get the products data from this url
        dispatch(productSuccess(data)) //we access this data in the productsSlice file reducers func like 'action.payload.products'. so the data params is a payload
    } catch (error) {
        //handle error
        dispatch(productFail(error.response.data.message)) //here we access the error message in the axios
    }
    
}

export const createReview = reviewData => async (dispatch) => { 
    try {
        dispatch(createReviewRequest()) 
        const config = {
            headers: {
                'Content-type' : 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/review`, reviewData, config); 
        dispatch(createReviewSuccess(data)) 
    } catch (error) {
        dispatch(createReviewFail(error.response.data.message)) 
    }
    
}

export const getAdminProducts =  async (dispatch) => { 
    try {
        dispatch(adminProductsRequest()) 
        const { data } = await axios.get(`/api/v1/admin/products`); 
        dispatch(adminProductsSuccess(data)) 
    } catch (error) {
        //handle error
        dispatch(adminProductsFail(error.response.data.message)) 
    }

}

export const createNewProduct = productData => async (dispatch) => { 
    try {
        dispatch(newProductRequest()) 
        const { data } = await axios.post(`/api/v1/admin/product/new`, productData); 
        dispatch(newProductSuccess(data)) 
    } catch (error) {
        //handle error
        dispatch(newProductFail(error.response.data.message)) 
    }

}

export const deleteProduct = id => async (dispatch) => { 
    try {
        dispatch(deleteProductRequest()) 
        await axios.delete(`/api/v1/admin/product/${id}`); 
        dispatch(deleteProductSuccess()) 
    } catch (error) {
        //handle error
        dispatch(deleteProductFail(error.response.data.message)) 
    }

}

export const updateProduct = (id, productData) => async (dispatch) => { 
    try {
        dispatch(updateProductRequest()) 
        const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData); 
        dispatch(updateProductSuccess(data)) 
    } catch (error) {
        //handle error
        dispatch(updateProductFail(error.response.data.message)) 
    }

}

export const getReviews = id => async (dispatch) => { //here this "dispatch" is a hook func so we can't able to create this func directly here so we create this hook func in home component 
    // here using this dispatch hook func for send these action creator information to the reducers then reducers change the state val
    try {
        dispatch(reviewsRequest()) //here we won't give any data(payload) so we can't able to access the data
        const { data } = await axios.get(`/api/v1/admin/reviews`, {params: {id}}); //here get the products data from this url ange set the page num as per the pagination
        dispatch(reviewsSuccess(data)) //we access this data in the productsSlice file reducers func like 'action.payload.products'. so the data params is a payload
    } catch (error) {
        //handle error
        dispatch(reviewsFail(error.response.data.message)) //here we access the error message in the axios
    }
    
}

export const deleteReview = (productId, id) => async (dispatch) => { //here this "dispatch" is a hook func so we can't able to create this func directly here so we create this hook func in home component 
    // here using this dispatch hook func for send these action creator information to the reducers then reducers change the state val
    try {
        dispatch(deleteReviewRequest()) //here we won't give any data(payload) so we can't able to access the data
        const { data } = await axios.delete(`/api/v1/admin/review`, {params: {productId, id}}); //here get the products data from this url ange set the page num as per the pagination
        dispatch(deleteReviewSuccess(data)) //we access this data in the productsSlice file reducers func like 'action.payload.products'. so the data params is a payload
    } catch (error) {
        //handle error
        dispatch(deleteReviewFail(error.response.data.message)) //here we access the error message in the axios
    }
    
}
