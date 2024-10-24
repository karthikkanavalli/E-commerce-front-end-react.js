import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCart } from "../redux/features/CartSlice";
import Card from "./Card";

const SingleProduct = () => {
  let [quantity, setQuantity] = useState(1);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let location = useLocation();
  
  let ProductList = useSelector((state) => state.products.products);
  let product = location.state.product;
  console.log(ProductList);

  let similarProduct = ProductList.filter((item) => {
    return item.category === product.category && item._id !== product._id;
  });
  console.log(similarProduct ? similarProduct : "no similar product");

  console.log(product);
  return (
    <div className="flex flex-col justify-center gap-4 px-6">
      <div className="w-2/3 p-4 m-4 transition-shadow duration-300 bg-white border rounded-lg shadow-md hover:shadow-lg">
        <div>
          <div>
            <img
              src="https://picsum.photos/200/300"
              alt={product.name}
              className="object-cover w-full h-64 mb-4 border-2 rounded-lg bg-slate-300"
            />
          </div>{" "}
          <h2 className="mb-2 text-xl font-bold">{product.name}</h2>
        </div>
        <div className="flex justify-between gap-4">
          <p className="mb-2 text-lg font-semibold text-gray-900">
            <strong>Price:</strong>${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Category:</strong>
            {product.category}
          </p>
        </div>
        <p className="mb-2 text-gray-600">{product.description}</p>
        <p className="text-gray-700">
          <strong>stock:</strong>
          {product.stock}
        </p>

        <div className="flex items-center justify-around">
          <button
            onClick={() => setQuantity(quantity == 1 ? 1 : quantity - 1)}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
            // disabled={quantity <= 1} // Disable if quantity is 1
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded"
          >
            +
          </button>
          <button
            onClick={() => {
              dispatch(addToCart({ ...product, quantity: quantity }));
            }}
            className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-slate-600"
          >
            Add to Cart
          </button>
        </div>
      </div>



      
      <div className="w-3/4 border rounded-lg shadow-lg h-4/5">
        <h1 className="text-2xl font-bold">Similar Product</h1>
        <div className="flex w-full gap-4 overflow-x-auto hfull broder-2 ">
          {similarProduct ? (
            similarProduct.map((item) => <Card key={item._id} product={item} />)
          ) : (
            <p>No similar product</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
