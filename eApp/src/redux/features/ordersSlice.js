import { createSlice } from "@reduxjs/toolkit";

let OrdersSlice = createSlice({
  name: "orders",
  initialState: {
    userID: "",
    items: [],
    address: "",
  },
  reducers: {
    setOrders: (state, actions) => {
      console.log(actions.payload)
      state.userID = actions.payload.userID;
      state.items = actions.payload.items;
      state.address = actions.payload.address;
    },
  },
});

export default OrdersSlice.reducer;
export let { setOrders } = OrdersSlice.actions;
