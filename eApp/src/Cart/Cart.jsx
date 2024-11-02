import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import CartHelpers from "./CartHelpers";
import { logout } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "../redux/features/CartSlice.js";
import { setOrders } from "../redux/features/ordersSlice.js";

const Cart = () => {
  let [list, setList] = useState([]);
  let [address, setAddress] = useState("");
  let { saveToDB } = CartHelpers();
  let { cartItems, cartTotal, totalItems } = useSelector((state) => state.cart);
 
 
  let {
    user: { _id: userId },
    token,
  } = useSelector((state) => state.auth);
 
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    setList(cartItems);
  }, [cartItems]);

  

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
    console.log("cart ie updated")
    updateCart();
    
  }, [cartItems, cartTotal, totalItems]);
  
  let handleChange = (e) => { 
    setAddress(e.target.value);
  }
  
  
  let handleOrder = async () => {
    try {   
    let result = await axios.post(
      "http://localhost:3000/orders/addorder",
      {
        address: address,
        items: cartItems,
        userID: userId,
        cartTotal: cartTotal,
        totalItemsCount: totalItems     },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      if (result.data.message === "token expired") {
        alert("Please login again; your session has expired.");
        dispatch(logout());
        navigate("/login");
      }
       } catch (error) {
      console.log("Error while placing order", error);
      
    }
    
    
    
    if (address.trim()) {
      
      dispatch(
        setOrders({ address: address, items: cartItems, userID: userId })
      );
      navigate("/orders")
      dispatch(setCart({ cartItems: [], cartTotal: 0, totalItems: 0 }));
    } else { 
      alert("Please enter your address")
    }
  }

  return (
    <div className="flex flex-col w-full gap-4 brightness-100">
      <div className="bg-no-repeat bg-cover h-52 w-dvw bg-cartLable" ></div>
      <div>
        <h1 className="text-3xl font-semibold text-center text-slate-700">
          Items from your cart
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
          <div className="flex flex-col gap-8 p-16">
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
            <div className="flex flex-col w-full gap-4">
              <label
                htmlFor="address"
                className="text-xl font-semibold text-slate-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                onChange={(e) => handleChange(e)}
                aria-required="true"
                className="w-full border-2 rounded-md"
              />
              <button
                // type="submit"
                onClick={() => handleOrder()}
                className="w-1/2 h-12 mx-auto my-4 text-xl font-semibold text-white bg-blue-500 rounded-md hover:bg-slate-600"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
