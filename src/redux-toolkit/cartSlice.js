import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const addToCart = createAsyncThunk(
  "ADD/cart",
  async (payload, thunkAPI) => {
    const {
      id: { id },
      quantity,
    } = payload;

    const TOKEN = thunkAPI.getState().user.user?.accessToken;

    const config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    try {
      const { data } = await axios.get(API_URL + `/${id}`, config);

      return {
        product: data._id,
        title: data.title,
        img: data.img,
        price: data.price,
        inStock: data.inStock,
        quantity,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartItemStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};

const initialState = {
  cartItems: cartItemStorage,
  shippingAddress: shippingAddressStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cart) => cart.product !== action.payload
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    deleteStorage: (state) => {
      state.cartItems = [];
    },
    addShippingInfo: (state, action) => {
      state.shippingAddress = action.payload;

      localStorage.setItem("shipping", JSON.stringify(action.payload));
    },
    deleteShipping: (state) => {
      state.shippingAddress = {};
    },
    // getShippingInfo: (state) => {
    //   const shipping = JSON.parse(localStorage.getItem("shipping"));

    //   state.shippingAddress = shipping;
    // },
  },
  extraReducers: {
    [addToCart.fulfilled]: (state, action) => {
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      const existItem = state.cartItems?.find(
        (x) => x.product === action.payload.product
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? action.payload : x
        );

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else {
        console.log(action.payload);
        state.cartItems.push(action.payload);

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const {
  removeFromCart,
  deleteStorage,
  addShippingInfo,
  deleteShipping,
  getShippingInfo,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
