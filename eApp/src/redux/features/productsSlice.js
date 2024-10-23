import { createSlice } from "@reduxjs/toolkit";


let productsSlice = createSlice({
    name: "products",
    initialState:{
        products: []
    },
    reducers: {
        setAllProducts: (state, action) => {
            state.products = action.payload;
        }
    }
})

export default productsSlice.reducer;
export let { setAllProducts } = productsSlice.actions