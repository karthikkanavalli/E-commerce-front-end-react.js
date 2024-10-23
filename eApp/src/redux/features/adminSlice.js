import { createSlice } from "@reduxjs/toolkit";

let adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        users: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },

        setUsers: (state, action) => { 
            state.users = action.payload;
        },
    },
});

export default adminSlice.reducer;
export const { setProducts , setUsers} = adminSlice.actions;