import { combineReducers, configureStore } from '@reduxjs/toolkit'; 
import thunk from "redux-thunk";
import productsReducer from "./slices/productsSlice"; //here import the reducer from this file
import productReducer from "./slices/productSlice";
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

//using this func to combine all reducers
const reducer = combineReducers({
    productsState: productsReducer, //here set the key name as productsState and store the productsReducer
    productState: productReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer
})

//using this configureStore() func to create store
const store = configureStore({
    reducer, //reducer is some func used to change state
    middleware: (getDefaultMiddleWare)=>[...getDefaultMiddleWare(),thunk] //using this middleware for actions. this action is work synchronised so here we use this thunk middleware for async work in action
});

export default store;