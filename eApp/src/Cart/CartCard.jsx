import { useDispatch } from "react-redux";
import { removeFromCart ,incrementQuantity, decrementQuantity} from "../redux/features/CartSlice";
import { useEffect } from "react";


const CartCard = ({ product }) => {
    let dispatch = useDispatch();
   
    
   
  

  return (
    <>
      <div className="w-4/5 p-4 duration-300 bg-white border-b rounded-lg hover:shadow-md">
        <div>
          <img
            src="https://picsum.photos/200/300"
            alt={product.name}
            className="object-contain w-full h-64 mb-4 border-2 rounded-lg bg-slate-300"
          />
        </div>
        <h2 className="mb-2 text-xl font-bold">{product.name}</h2>
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

        {/* stock controls */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-700">
            <strong>quantity:</strong>
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={()=>dispatch(decrementQuantity({_id: product._id }))}
              className="px-3 py-1 text-gray-700 bg-gray-300 rounded"
            >
              -
            </button>
            <span className="text-lg font-semibold">{product.quantity}</span>
            <button
              onClick={ ()=>dispatch(incrementQuantity({_id:product._id}))}
              className="px-3 py-1 text-gray-700 bg-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>

        
        <p className="mt-4 text-gray-900">
          <strong>Subtotal:</strong> $
          {(product.price * product.quantity).toFixed(2)}
        </p>

        {/* Remove from cart button */}
        <button
          onClick={() => dispatch(removeFromCart({_id:product._id}))}
          className="px-4 py-2 mt-4 text-white transition duration-200 bg-red-500 rounded hover:bg-red-600"
        >
          Remove from Cart
        </button>
      </div>
    </>
  );
};

export default CartCard;
