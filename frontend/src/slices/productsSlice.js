import { createSlice } from "@reduxjs/toolkit";

//here create a state slice
const productsSlice = createSlice({
    name: 'products', //name of this slice
    initialState: { //here we give the starting value of this slice
        loading: false //using this we get loading
    },
    reducers: { //this is used to change the value of this state 
        //here using this reducer functions for change the state val
        //this productsRequest() func is executed when the products page Request sent
        productsRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        productsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products, //here it'll store the products data we get from the api request. in this we access this products data from the action params 
                productsCount: action.payload.count, //here get count val of the products
                resPerPage: action.payload.resPerPage //here get the count of the products in one page
            }
        },
        //this productsFail() func  is executed when the api request get the error
        productsFail(state, action) {
            return {
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        //this reducers for admin products
        adminProductsRequest(state, action) { 
            return {
                loading: true 
            }
        },
        
        adminProductsSuccess(state, action) {
            return {
                loading: false,
                products: action.payload.products
            }
        },
        
        adminProductsFail(state, action) {
            return {
                loading: false,
                error: action.payload 
            }
        },

        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        }
    }
});

//ActionCreator func is used to create ActionObject. reducers got this ActionObject, in this ActionObject send the information to the reducers after this the reducers change the state val -
//in this the reducer functions are the action creators name also
//here de-construct the actions and reducer properties from the productsSlice
const { actions, reducer } = productsSlice;

//here de-construct the action creators from the actions property and export this
export const { productsRequest, productsSuccess, productsFail, adminProductsFail, adminProductsRequest, adminProductsSuccess, clearError } = actions;

export default reducer;