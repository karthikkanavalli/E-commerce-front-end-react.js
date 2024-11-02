import axios from "axios";
import { logout } from "../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Custom hook to handle cart operations
const CartHelpers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let { cartItems, cartTotal, totalItems } = useSelector((state) => state.cart);
  // let {user:{_id:userId} ,  token} = useSelector((state) => state.auth);


  const saveToDB = async (
    cartItems,
    cartTotal,
    totalItems,
    userId,
    token
  ) => {

    console.log("Saving to cart");
    try {
      const result = await axios.post(
        "http://localhost:3000/cart/addtocart",
        { userId, cartItems, totalItems, cartTotal },
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

      return result.data; 
    }catch (error) {
      console.error("Error while saving to cart:", error);
    }
  };

//  useEffect(() => {
//     saveToDB(cartItems||[], cartTotal, totalItems, userId, token);
//   }, [cartItems, totalItems, userId, token]);
  
  return { saveToDB };
};

export default CartHelpers;
