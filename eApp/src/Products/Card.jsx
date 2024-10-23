import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/CartSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ product }) => {
  let [quantity, setQuantity] = useState(1);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  


  
  return (
    <>
      <div className="h-full p-4 m-4 transition-shadow duration-300 bg-white border rounded-lg shadow-md w-90 hover:shadow-lg">
        <div className="cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`,
            { state: { product: product } })}>
          <div >
            <img
              src="https://picsum.photos/200/300"
              alt={product.name}
              className="object-contain w-full h-64 mb-4 border-2 rounded-lg bg-slate-300"
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
        <p className="mb-2 text-gray-600">{((product.description).slice(0,60))+"..."}</p>
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
    </>
  );
};

export default Card;
