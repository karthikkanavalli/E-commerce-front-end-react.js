import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import CartHelpers from "./CartHelpers";
import { logout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "../redux/features/CartSlice.js";

const Cart = () => {
  let [list, setList] = useState([]);
  let { saveToDB } = CartHelpers();
  let { cartItems, cartTotal, totalItems } = useSelector((state) => state.cart);
  let cart = useSelector((state) => state.cart);
  let {
    user: { _id: userId },
    token,
  } = useSelector((state) => state.auth);
  // console.log(userId, token)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    setList(cartItems);
  }, [cartItems]);

  console.log(list);

  const fetchCart = async () => {
    try {
      const result = await axios.get("http://localhost:3000/cart/getcart", {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.data.message === "token expired") {
        alert("Please login again; your session has expired.");
        dispatch(logout());
        navigate("/login");
      }
      return result.data;
    } catch (error) {
      console.error("Error while fetching cart:", error);
    }
  };

  let getdata = async () => {
    try {
      let cart = await fetchCart();
      dispatch(setCart(cart));
      console.log("getting cart", cart.cart);
    } catch (error) {
      console.error("Error while fetching cart:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateCart = async () => {
    try {
      await saveToDB(cartItems || [], cartTotal, totalItems, userId, token);
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  };

  useEffect(() => {
    console.log("use effcet called")
    // if (list.length>0) {
    updateCart();
    

    // }
  }, [cartItems, cartTotal, totalItems]);

  return (
    <div className="flex flex-col w-full gap-4 min-h-dvh ">
      <div>
        <h1 className="text-3xl font-semibold text-center text-slate-700">
          Items from your cart{" "}
        </h1>
      </div>
      <div className="flex m-4">
        <div className="flex flex-col w-2/3 rounded-md min-h-dvh">
          {list?.map((product) => (
            <CartCard key={product._id} product={product} />
          ))}
        </div>
        <div className="w-1/3 rounded-md min-h-dvh">
          <h1 className="text-base font-semibold text-center underline text-slate-700">
            <span className="flex items-center justify-center my-2">
              Cart detials
              <FaShoppingCart />
            </span>
          </h1>
          <div className="flex flex-col gap-4">
            <div className="border-b rounded-sm border-slate-400">
              <h1 className="flex items-center justify-between">
                <span className="w-1/2 px-4 text-xl font-semibold text-slate-700">
                  Total items in cart
                </span>
                <span className="px-4 text-xl font-semibold text-slate-700">
                  = {totalItems}
                </span>
              </h1>
            </div>
            <div>
              <h1 className="flex items-center justify-between">
                <span className="w-2/4 px-4 text-xl font-semibold text-slate-700">
                  Cart total
                </span>
                <span className="px-4 text-xl font-semibold text-slate-700">
                  = {Math.round(cartTotal * 100) / 100}
                </span>
              </h1>
            </div>
            {/* <button className="text-xl font-semibold text-slate-700"
            onClick={updateCart}>save</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
