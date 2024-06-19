import { createSlice } from "@reduxjs/toolkit";

//here create another state slice
const cartSlice = createSlice({
    name: 'cart', //name of this slice
    initialState: { //here we give the starting value of this slice
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [], //here we set if cartitems is available in the localstorage(browser) then it'll convert to json and store in items otherwise it'll store empty array
        loading: false, //using this we get loading
        shippingInfo: localStorage.getItem('shippingInfo')? JSON.parse(localStorage.getItem('shippingInfo')): {}
    },
    reducers: { //this is used to change the value of this state 
        //here using this reducer functions for change the state val
        //this productsRequest() func is executed when the products page Request sent
        addCartItemRequest(state, action) { //in this we pass the state for get the current state val and using action params we get the api request data
            return {
                ...state,
                loading: true //so here we get the loading page
            }
        },
        //this productsSuccess() func is executed when the api request get the products data 
        addCartItemSuccess(state, action) {
            //here set this condition for stop adding same product once again
            const item = action.payload //here store the new added product in this item const

            const isItemExist = state.items.find( i => i.product === item.product); //here compare the new added product with the existing cart item products if this new product is same in this cart products then this new product stored in this const
            
            if(isItemExist) { //here this product already exist in the cart item it won't be add
                state = {
                    ...state,
                    loading: false,
                }
            }else { //here if the new product is not same in cart items then this condition will run
                state = { //here added new product item with existing state items
                    items: [...state.items, item],
                    loading: false
                }
                localStorage.setItem('cartItems', JSON.stringify(state.items)) //here set localstorage cartitems val as the current state items 
            }
            return state
        },

        //here this increaseCartItemQty() func is increase the qty val in the cart page '+' btn
        increaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product === action.payload) { //here check the both product are same if the both product are same then the qty of the product will be increased
                    item.quantity = item.quantity + 1;
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },
        //here this decreaseCartItemQty() func is decrease the qty val in the cart page '-' btn
        decreaseCartItemQty(state, action) {
            state.items = state.items.map(item => {
                if(item.product === action.payload) { //here check the both product are same if the both product are same then the qty of the product will be decreased
                    item.quantity = item.quantity - 1;
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items))
        },

        //here this removeItemFromCart() func is remove the cart item product
        removeItemFromCart(state, action) {
            const filterItems = state.items.filter(item => { //here we filter the products other than we choosed to remove 
               return item.product !== action.payload
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItems))
            return {
                ...state,
                items: filterItems
            }
        },
        
        saveShippingInfo(state, action) {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return{
                ...state,
                shippingInfo: action.payload
            }
        },

        orderCompleted(state, action) {
            localStorage.removeItem('shippingInfo');
            localStorage.removeItem('cartItems');
            sessionStorage.removeItem('orderInfo');
            return{
                items: [],
                loading: false, //using this we get loading
                shippingInfo: {}
            }
        }
    }
});

//ActionCreator func is used to create ActionObject. reducers got this ActionObject, in this ActionObject send the information to the reducers after this the reducers change the state val -
//in this the reducer functions are the action creators name also
//here de-construct the actions and reducer properties from the productsSlice
const { actions, reducer } = cartSlice;

//here de-construct the action creators from the actions property and export this
export const { addCartItemRequest, addCartItemSuccess, increaseCartItemQty, decreaseCartItemQty, removeItemFromCart, saveShippingInfo, orderCompleted } = actions;

export default reducer;