import { createSlice } from "@reduxjs/toolkit";

//here create another state slice
const orderSlice = createSlice({
  name: "order", //name of this slice
  initialState: {
    //here we give the starting value of this slice
    orderDetail: {},
    userOrders: [],
    adminOrders: [],
    loading: false,
    isOrderDeleted: false,
    isOrderUpdated: false
  },
  reducers: {
    //this is used to change the value of this state
    //here using this reducer functions for change the state val
    //this productsRequest() func is executed when the products page Request sent
    createOrderRequest(state, action) {
      //in this we pass the state for get the current state val and using action params we get the api request data
      return {
        ...state,
        loading: true, //so here we get the loading page
      };
    },
    //this productsSuccess() func is executed when the api request get the products data
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },

    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    
    userOrdersRequest(state, action) {
      return {
        ...state,
        loading: true, 
      };
    },
    
    userOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders
      };
    },

    userOrdersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },

    orderDetailRequest(state, action) {
      return {
        ...state,
        loading: true, 
      };
    },
    //this reducer for get single order api
    orderDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order
      };
    },

    orderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },

    adminOrdersRequest(state, action) {
      return {
        ...state,
        loading: true, 
      };
    },
    
    adminOrdersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders
      };
    },

    adminOrdersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },

    deleteOrderRequest(state, action) {
      return {
        ...state,
        loading: true, 
      };
    },
    
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },

    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },

    updateOrderRequest(state, action) {
      return {
        ...state,
        loading: true, 
      };
    },
    
    updateOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },

    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    },

    clearOrderDeleted(state, action) {
      return {
        ...state,
        isOrderDeleted: false,
      }
    },

    clearOrderUpdated(state, action) {
      return {
        ...state,
        isOrderUpdated: false,
      }
    },
  },
});

//ActionCreator func is used to create ActionObject. reducers got this ActionObject, in this ActionObject send the information to the reducers after this the reducers change the state val -
//in this the reducer functions are the action creators name also
//here de-construct the actions and reducer properties from the productsSlice
const { actions, reducer } = orderSlice;

//here de-construct the action creators from the actions property and export this
export const {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  clearError,
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  adminOrdersFail,
  adminOrdersRequest,
  adminOrdersSuccess,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  clearOrderDeleted,
  clearOrderUpdated
} = actions;

export default reducer;
