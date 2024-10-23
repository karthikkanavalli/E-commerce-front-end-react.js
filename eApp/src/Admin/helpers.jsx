import axios from "axios";
import { useDispatch, useSelector } from "react-redux"; // Correct import for redux
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";

let navigate;
let dispatch;
// Function to get all products
const getAllproducts = async (token) => {
  try {
    let result = await axios.get("http://localhost:3000/admin/getproducts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.data.message === "token expired") {
      alert("please login again your session is expired");
      dispatch(logout());
      navigate("/login");
    }
    return result.data;
  } catch (error) {
    console.error("Error while fetching products:", error);
  }
};

// Function to get all users
const getUsers = async (token) => {
  try {
    let result = await axios.get("http://localhost:3000/admin/getusers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result.data);

    if (result.data.message === "token expired") {
      alert("please login again your session is expired");
      dispatch(logout());
      navigate("/login");
    }

    return result.data;
  } catch (error) {
    console.error("Error while fetching users:", error);
    throw error;
  }
};

const editproduct = async (id, token,updatedProduct) => {
  let result = await axios.patch("http://localhost:3000/admin/editproduct", updatedProduct, {
    params: { id: id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    
  })
  if (result.data.message === "token expired") {
    alert("please login again your session is expired");
    dispatch(logout());
    navigate("/login");
  }
  return result.data

}



let deleteproduct = async (id, token) => {
  console.log(id);
  try {
    let result = await axios.delete(
      "http://localhost:3000/admin/deleteproduct/", {
        params : {
          id : id
        },
      
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result);
    
    if (result.data.message === "token expired") {
      alert("please login again your session is expired");
      dispatch(logout());
      navigate("/login");
    }

    return result.data;
  } catch (error) {
    console.log("Error while deleting product", error);
  }
};

// Custom hook to get products and users
const useHelpers = () => {
  dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get the token from Redux state
  navigate = useNavigate();

  const fetchAllProducts = async () => {
    return await getAllproducts(token);
  };

  const fetchUsers = async () => {
    return await getUsers(token);
  };

  const deleteProductfromDB = async (id) => {
    return await deleteproduct(id, token);
  };
  const EditProduct = async (id ,updatedProduct) => {
    return await editproduct(id, token ,updatedProduct);
  };

  return { fetchAllProducts, fetchUsers, deleteProductfromDB ,EditProduct };
};

export { getAllproducts, getUsers, useHelpers }; 