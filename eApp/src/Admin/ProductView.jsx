import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useHelpers } from "./helpers";

const ProductView = () => {
  let { deleteProductfromDB } = useHelpers();
  let navigate = useNavigate();
  let location = useLocation();
  let product = location.state.product;

  let handleDelete = async (id) => {
    try {
      let result = await deleteProductfromDB(id);
      console.log(result);
      if (result.status === "success") {
        alert("Product deleted successfully");
        //   handleProductList();
        navigate("/admin/products");
      } else {
        alert("Error while deleting product");
      }
    } catch (error) {
      console.log("Error while deleting product", error);
    }
  };
  return (
    <div className="w-full p-6 my-4 rounded-lg shadow-lg -auto bg-slate-200">
      {/* Product Name and ID */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-800">{product.name}</h1>
        <p className="text-sm text-slate-500">
          ID:
          {product._id}
        </p>
      </div>

      {/* Price and Category */}
      <div className="mb-4">
        <div className="flex justify-between">
          <p className="text-lg font-medium text-slate-700">
            Price: <span className="font-semibold">${product.price}</span>
          </p>
          <p className="text-lg font-medium text-slate-700">
            Category: <span className="font-semibold">{product.category}</span>
          </p>
        </div>
      </div>

      {/* Product Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="text-lg font-semibold text-slate-800"
        >
          Description:
        </label>
        <p className="mt-1 text-slate-700">{product.description}</p>
      </div>

      {/* Product stock */}
      <div className="mb-4">
        <label htmlFor="stock" className="text-lg font-semibold text-slate-800">
          stock in Stock:
        </label>
        <p className="mt-1 text-slate-700">{product.stock}</p>
      </div>

      {/* Button Actions */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate(-1)}
          className="p-3  text-white rounded-md bg-slate-600 hover:bg-blue-500"
        >
          <span className="flex items-center gap-2">
            <IoIosArrowBack />
            Back
          </span>
        </button>
        <button className="p-3  text-white rounded-md bg-blue-600 hover:bg-blue-500">
          <span className="flex items-center gap-2">
            <FaRegEdit /> Edit
          </span>
        </button>

        <button
          onClick={() => handleDelete(product._id)}
          className="px-4 py-2 font-medium text-white bg-red-600 rounded hover:bg-red-500"
        >
          <span className="flex items-center gap-2">
            <AiFillDelete /> Delete
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductView;
