
import Card from "./Card";
// import { setAllProducts } from "../redux/features/productsSlice";
import {  useSelector } from "react-redux";


const Products = () => {
  console.log("Products page");
  let productsList = useSelector((state) => state.products.products);


  
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 bg-inherit">
      {productsList.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
