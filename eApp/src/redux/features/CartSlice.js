import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    cartTotal: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")).reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      : 0,
    totalItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")).reduce(
          (total, item) => total + item.quantity,
          0
        )
      : 0, 
  },
  reducers: {
    addToCart(state, action) {
      console.log("add to cart");
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.cartTotal += action.payload.price * action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
        state.cartTotal += action.payload.price * action.payload.quantity;
      }

      
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const itemToRemove = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      

      if (itemToRemove) {
        state.cartTotal -= itemToRemove.price * itemToRemove.quantity;
      }

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      console.log(state.cartItems);
      

      // if (state.cartItems.length === 0) {
      //   state.cartTotal = 0;
      //   state.cartItems = [];
      //   console.log("empty cart");
      // }

     
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    incrementQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += 1;
        state.cartTotal += item.price;
      }

      
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decrementQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.cartTotal -= item.price;
      }

      
      state.totalItems = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    setCart: (state, action) => {
      const { cartItems, totalItems, cartTotal } = action.payload || {};
      try {
        if (cartItems) {
        state.cartItems = cartItems;
        state.totalItems = totalItems || 0;
        state.cartTotal = cartTotal || 0;
      }
      } catch (error) {
        console.log("Failed to set cart:", error);
      }
       
    },
  },
});


export default cartSlice.reducer;
export let { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart } =
  cartSlice.actions;
