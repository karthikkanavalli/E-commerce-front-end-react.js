import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHelpers } from "./helpers";

const EditProduct = () => {
  let location = useLocation();
  let initialProductData = location?.state?.product || {
    name: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    imageUrl: "",
  };
  let [productData, setProductData] = useState(initialProductData);
  let navigate = useNavigate();
  let { EditProduct } = useHelpers();

  console.log(productData._id);
  let handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  let handleSubmit = async () => {
    console.log(productData);
    try {
      let result = await EditProduct(productData._id, productData);
      console.log(result);
      if (result.status === "success") {
        alert(result.message);
        // navigate(`/admin/product/${productData._id}`);
        navigate(`/admin/products`);
      } else {
        alert("Error while editing product");
      }
    } catch (error) {
      console.log("Error while editing product", error);
    }
  };

  // let handleEdit = async () => {
  //   let result = await EditProduct(productData._id);
  //   console.log(result);
  //   if (result.status === "success") {
  //     alert(result.message);
  //     navigate("/admin");
  //   } else {
  //     alert("Error while editing product");
  //   }
  // }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full   rounded-lg shadow-lg p-4 bg-slate-100">
        <h1 className="text-center font-bold text-slate-700 text-2xl mb-6">
          Edit Product
        </h1>

        <div className="flex flex-col gap-4">
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-1">Name:</label>
            <input
              className="p-4 border rounded-lg "
              type="text"
              name="name"
              value={productData.name || ""}
              onChange={handleChange}
              placeholder="Product Name"
            />
          </div>

          {/* Product Price */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-1">Price:</label>
            <input
              className="px-4 py-2 border rounded-lg "
              type="number"
              name="price"
              value={productData.price || ""}
              onChange={handleChange}
              placeholder="Product Price"
            />
          </div>

          {/* Product Description */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-1">Description:</label>
            <textarea
              className="px-4 py-2 border rounded-lg "
              name="description"
              value={productData.description || ""}
              onChange={handleChange}
              placeholder="Product Description"
              rows="4"
            />
          </div>

          {/* Product Category */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-1">Category:</label>
            <input
              className="px-4 py-2 border rounded-lg "
              type="text"
              name="category"
              value={productData.category || ""}
              onChange={handleChange}
              placeholder="Product Category"
            />
          </div>

          {/* Product stock */}
          <div className="flex flex-col">
            <label className="text-lg font-semibold mb-1">stock:</label>
            <input
              className="px-4 py-2 border rounded-lg "
              type="number"
              name="stock"
              value={productData.stock || ""}
              onChange={handleChange}
              placeholder="Available Stock"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
