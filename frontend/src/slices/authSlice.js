import { createSlice } from "@reduxjs/toolkit";

//here create another state slice
const authSlice = createSlice({
    name: 'auth', //name of this slice
    initialState: { //here we give the starting value of this slice
        loading: true, //using this we get loading
        isAuthenticated: false //this field this give the user logined or not
    },
    reducers: { //this is used to change the value of this state 
        //here using this reducer functions for change the state val
        //this loginRequest() func is executed when the login page Request sent
        loginRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state, //here we get all previous state val and we change only loading val
                loading: true //so here we get the loading page
            }
        },
        //this loginSuccess() func is executed when the api request get the user data 
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user //here store the user data in the user property
            }
        },
        //this loginFail() func  is executed when the api request get the error
        loginFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload //here store the err we get from the api request. in this we access this error from the action params 
            }
        },
        //this clearError() func is executed when it's called in the onOpen() func in toast error message for clear the error message
        clearError(state, action) {
            return {
                ...state,
                error: null 
            }
        },
        registerRequest(state, action) { 
            return {
                ...state, 
                loading: true 
            }
        },
        
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        
        registerFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        },
        //here this loadUserRequest() func is executed when every page load and in this request cookie will send so the token is saved for some days till that day user page will logged in if user didn't logout. if user logout then the token value of the cookie will be deleted
        loadUserRequest(state, action) { 
            return {
                ...state, 
                isAuthenticated: false,
                loading: true 
            }
        },
        
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action) {
            return {
                ...state,
                loading: false 
            }
        },
        //here this logoutSuccess() func is executed when logout click and in this func token of the cookie will be deleted
        logoutSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                error: action.payload 
            }
        },
        updateProfileRequest(state, action) { 
            return {
                ...state, 
                loading: true,
                isUpdated: false
            }
        },
        
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user, //here get the updated user data
                isUpdated: true //here check the profile updated or not
            }
        },
        
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        },
        updatePasswordRequest(state, action) { 
            return {
                ...state, 
                loading: true,
                isUpdated: false
            }
        },
        
        updatePasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isUpdated: true //here check the profile updated or not
            }
        },
        //this clearUpdateProfile() func is executed when it's called in the onOpen() func in toast updated message for clear the updated message because we used this 'isUpdated' in a if condition for get updated toast message
        clearUpdateProfile(state, action) {
            return {
                ...state,
                isUpdated: false //here we set false
            }
        },
        
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        },
        
        forgotPasswordRequest(state, action) { 
            return {
                ...state, 
                loading: true,
                message: null //here set message null because if we got success message after that again we'll run this page we'll get this message again if we got forgotpassword failed, it shows the previous values in every time that's why here we set message null for every new request 
            }
        },
        
        forgotPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        
        forgotPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        },
        resetPasswordRequest(state, action) { 
            return {
                ...state, 
                loading: true,
            }
        },
        
        resetPasswordSuccess(state, action) {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        
        resetPasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload 
            }
        }
    }
});

//ActionCreator func is used to create ActionObject. reducers got this ActionObject, in this ActionObject send the information to the reducers after this the reducers change the state val -
//in this the reducer functions are the action creators name also
//here de-construct the actions and reducer properties from the productsSlice
const { actions, reducer } = authSlice;

//here de-construct the action creators from the actions property and export this
export const { loginRequest, loginSuccess, loginFail, clearError, registerRequest, registerSuccess, registerFail, loadUserRequest, loadUserSuccess, loadUserFail, logoutFail, logoutSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess, clearUpdateProfile, updatePasswordFail, updatePasswordRequest, updatePasswordSuccess, forgotPasswordFail, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFail, resetPasswordRequest, resetPasswordSuccess } = actions;

export default reducer;