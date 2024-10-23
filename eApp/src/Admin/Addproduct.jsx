import axios from "axios";
import { useState } from "react";

const Addproduct = () => {
  let [ProductList, setProductList] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  let handleChange = (e) => {
    setProductList({ ...ProductList, [e.target.name]: e.target.value });
  };

  let handleSubmit = async () => {
    let result = await axios.post(
      "http://localhost:3000/admin/addproduct",
      ProductList
    );
    console.log(result.data);
    if (result.data.status === "success") {
      alert("Product added successfully");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen px-4">
        <div className="flex flex-col w-3/4 gap-2 px-4 m-auto rounded-md bg-slate-100">
          <h1 className="mt-4 text-3xl font-bold text-center text-slate-700">
            Add new product
          </h1>
          <div className="flex flex-col gap-4 p-2 ">
            <label
              className="font-semibold text-slate-700"
              htmlFor="productName"
            >
              {" "}
              Product Name
            </label>
            <input
              onChange={handleChange}
              className="w-full p-4 border-none rounded-md outline-none focus:outline-blue-300 outline-offset-2"
              placeholder="Product Name"
              type="text"
              name="name"
              id="productName"
            />
          </div>
          <div className="flex flex-col gap-4 p-2 ">
            <label
              className="font-semibold text-slate-700"
              htmlFor="description"
            >
              Description
            </label>
            <input
              onChange={handleChange}
              placeholder="description"
              className="w-full p-4 border-none rounded-md outline-none focus:outline-blue-300 outline-offset-2"
              type="text"
              name="description"
              id="description"
            />
          </div>
          <div className="flex flex-col gap-4 p-2 ">
            <label className="font-semibold text-slate-700" htmlFor="category">
              Category
            </label>
            <input
              onChange={handleChange}
              className="w-full p-4 border-none rounded-md outline-none focus:outline-blue-300 outline-offset-2"
              placeholder="category"
              type="text"
              name="category"
              id="category"
            />
          </div>
          <div className="flex flex-col gap-4 p-2 ">
            <label className="font-semibold text-slate-700" htmlFor="price">
              Price
            </label>
            <input
              onChange={handleChange}
              placeholder="price"
              className="w-full p-4 border-none rounded-md outline-none focus:outline-blue-300 outline-offset-2"
              type="text"
              name="price"
              id="price"
            />
          </div>
          <div className="flex flex-col gap-4 p-2 ">
            <label className="font-semibold text-slate-700" htmlFor="stock">
              stock
            </label>
            <input
              onChange={handleChange}
              placeholder="stock"
              className="w-full p-4 border-none rounded-md outline-none focus:outline-blue-300 outline-offset-2"
              type="text"
              name="stock"
              id="stock"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-1/2 py-4 m-auto font-semibold text-white rounded-md bg-slate-600 hover:bg-blue-500"
          >
            Create new product
          </button>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
