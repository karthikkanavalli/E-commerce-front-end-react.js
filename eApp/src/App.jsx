import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/home/Home";
import Admin from "./Admin/Admin";
import ProductList from "./Admin/ProductList";
import Addproduct from "./Admin/Addproduct";
import Users from "./Admin/Users";
import Profile from "./Pages/Profile";
import ProductView from "./Admin/ProductView";
import EditProduct from "./Admin/EditProduct";
import Products from "./Products/Products";
import Cart from "./Cart/Cart";
import SingleProduct from "./Products/SingleProduct";
import { useEffect } from "react";
import { setAllProducts } from "./redux/features/productsSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import MyOrders from "./MyOrders/MyOrders";

const App = () => {
  
   let dispatch = useDispatch();
  //  let productsList = useSelector((state) => state.products.products);
   const getAllproducts = async () => {
     
       try {
         let result = await axios.get("http://localhost:3000/products");
         console.log(result.data);
         dispatch(setAllProducts(result.data.products));
       } catch (error) {
         console.log("Error while fetching products", error);
       }
     
   };
   useEffect(() => {
     getAllproducts();
   }, []);
  return (
    <>
      <BrowserRouter>
        {/* <div className="w-full"> */}
          <MyNavbar />
        {/* </div> */}
        <div className="mt-16 ">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/orders" element={<MyOrders/>} />
            <Route path="/cart" element={<Cart />} />

            {/* admin routes */}
            <Route path="/admin" element={<Admin />}>
              <Route path="product/:id" element={<ProductView />} />
              <Route path="editproduct/:id" element={<EditProduct />} />
              <Route path="products" element={<ProductList />} />
              <Route path="users" element={<Users />} />
              <Route path="addproduct" element={<Addproduct />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
