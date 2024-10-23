import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import adminReducer   from "./features/adminSlice";
import productsReducer from "./features/productsSlice";
import cartReducer from "./features/CartSlice";

let Store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        products: productsReducer,
        cart: cartReducer,
    }
  });
  export default Store