import { createSlice } from "@reduxjs/toolkit";

//here create another state slice
const productSlice = createSlice({
    name: 'product', //name of this slice
    initialState: { //here we give the starting value of this slice
        loading: false, //using this we get loading
        product: {}, //here set product val as empty because we give expression productDetail file 
        isReviewSubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        isReviewDeleted: false,
        reviews: []
    },
    reducers: { //this is used to change the value of this state 
        //here using this reducer functions for change the state val
        //this productsRequest() func is executed when the products page Request sent
        productRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        productSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product //here it'll store the products data we get from the api request. in this we access this products data from the action params 
            }
        },
        //this productsFail() func  is executed when the api request get the error
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        createReviewRequest(state, action) { 
            return {
                ...state,
                loading: true
            }
        },
        
        createReviewSuccess(state, action) {
            return {
                loading: false,
                isReviewSubmitted: true
            }
        },
        
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        },

        clearReviewSubmitted(state, action) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },

        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },

        //here clear the product details when the review submission done or when we close the one product page it'll clear the product details so we'll open another product page it'll open newly
        clearProduct(state, action) {
            return {
                ...state,
                product: {}
            }
        },

        newProductRequest(state, action) { 
            return {
                ...state,
                loading: true
            }
        },
        
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        
        newProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },

        clearProductCreated(state, action) {
            return {
                ...state,
                isProductCreated: false
            }
        },

        deleteProductRequest(state, action) { 
            return {
                ...state,
                loading: true
            }
        },
        
        deleteProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },

        clearProductDeleted(state, action) {
            return {
                ...state,
                isProductDeleted: false
            }
        },

        updateProductRequest(state, action) { 
            return {
                ...state,
                loading: true
            }
        },
        
        updateProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },

        clearProductUpdated(state, action) {
            return {
                ...state,
                isProductUpdated: false
            }
        },

        reviewsRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        reviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews //here it'll store the products data we get from the api request. in this we access this products data from the action params 
            }
        },
        //this productsFail() func  is executed when the api request get the error
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        deleteReviewRequest(state, action) { 
            return {
                ...state,
                loading: true
            }
        },
        
        deleteReviewSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        
        deleteReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },

        clearReviewDeleted(state, action) {
            return {
                ...state,
                isReviewDeleted: false
            }
        },
    }
});

//ActionCreator func is used to create ActionObject. reducers got this ActionObject, in this ActionObject send the information to the reducers after this the reducers change the state val -
//in this the reducer functions are the action creators name also
//here de-construct the actions and reducer properties from the productsSlice
const { actions, reducer } = productSlice;

//here de-construct the action creators from the actions property and export this
export const { productRequest, productSuccess, productFail, createReviewFail, createReviewRequest, createReviewSuccess, clearReviewSubmitted, clearError, clearProduct, newProductFail, newProductRequest, newProductSuccess, clearProductCreated, deleteProductFail, deleteProductRequest, deleteProductSuccess, clearProductDeleted, updateProductFail, updateProductRequest, updateProductSuccess, clearProductUpdated, reviewsRequest, 
    reviewsFail,
    reviewsSuccess,
    deleteReviewFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    clearReviewDeleted
} = actions;

export default reducer;