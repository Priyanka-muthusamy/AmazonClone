import { createSlice } from "@reduxjs/toolkit";

//here create a state slice
const userSlice = createSlice({
    name: 'user', //name of this slice
    initialState: { //here we give the starting value of this slice
        loading: false, //using this we get loading
        user: {},
        users: [],
        isUserUpdated: false,
        isUserDeleted: false,
    },
    reducers: { //this is used to change the value of this state 
        //here using this reducer functions for change the state val
        //this productsRequest() func is executed when the products page Request sent
        usersRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        usersSuccess(state, action) {
            return {
                ...state,
                loading: false,
                users: action.payload.users, //here it'll store the products data we get from the api request. in this we access this products data from the action params 
            }
        },
        //this productsFail() func  is executed when the api request get the error
        usersFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        userRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        userSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user, //here it'll store the products data we get from the api request. in this we access this products data from the action params 
            }
        },
        //this productsFail() func  is executed when the api request get the error
        userFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        deleteUserRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        deleteUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },
        //this productsFail() func  is executed when the api request get the error
        deleteUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        updateUserRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        updateUserSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },
        //this productsFail() func  is executed when the api request get the error
        updateUserFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },

        clearError(state, action) {
            return {
                ...state,
                error: null
            }
        },

        clearUserDeleted(state, action) {
            return {
                ...state,
                isUserDeleted: false
            }
        },

        clearUserUpdated(state, action) {
            return {
                ...state,
                isUserUpdated: false
            }
        },
    }
});

//ActionCreator func is used to create ActionObject. reducers got this ActionObject, in this ActionObject send the information to the reducers after this the reducers change the state val -
//in this the reducer functions are the action creators name also
//here de-construct the actions and reducer properties from the productsSlice
const { actions, reducer } = userSlice;

//here de-construct the action creators from the actions property and export this
export const {  
    userFail,
    userRequest,
    userSuccess,
    usersFail,
    usersRequest,
    usersSuccess,
    deleteUserFail,
    deleteUserRequest,
    deleteUserSuccess,
    updateUserFail,
    updateUserRequest,
    updateUserSuccess,
    clearError,
    clearUserDeleted,
    clearUserUpdated
} = actions;

export default reducer;