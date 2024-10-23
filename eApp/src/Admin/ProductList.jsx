import { useEffect, useState } from "react";
import { useHelpers } from "./helpers";
import { AiFillDelete } from "react-icons/ai";
import { MdPreview } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  let [ProductList, setProductList] = useState([]);
  const { fetchAllProducts, deleteProductfromDB } = useHelpers();

  let handleProductList = async () => {
    try {
      let result = await fetchAllProducts();
      setProductList(result.products);
    } catch (error) {
      console.log("Error while fetching products", error);
    }
  };

  // let handleEdit = (id) => {

  // };

  useEffect(() => {
    handleProductList();
  }, []);

  let handleDelete = async (id) => {
    try {
      let result = await deleteProductfromDB(id);
      console.log(result);
      if (result.status === "success") {
        alert("Product deleted successfully");
        handleProductList();
      } else {
        alert("Error while deleting product");
      }
    } catch (error) {
      console.log("Error while deleting product", error);
    }
  };

  console.log(ProductList);

  return (
    <>
      <div className="container p-4 mx-auto">
        <h2 className="mb-4 text-2xl font-bold text-center text-slate-700">
          Products
          <span className="text-base font-medium underline text-slate-600 float-end">
            Total Products :{ProductList?.length}
          </span>
        </h2>
        <table className="w-full bg-white border-collapse table-auto order-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-none bg-slate-700 rounded-tl-md text-slate-50">
                Product Name
              </th>
              <th className="px-4 py-2 border bg-slate-700 text-slate-50">
                Description
              </th>
              <th className="px-4 py-2 border bg-slate-700 text-slate-50">
                Category
              </th>
              <th className="px-4 py-2 border bg-slate-700 text-slate-50 ">
                Price
              </th>
              <th className="px-4 py-2 border-none bg-slate-700 text-slate-50 rounded-tr-md">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {ProductList?.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">
                  {product.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.description}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {product.category}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ${product.price}
                </td>
                <td className="px-2 py-2 border border-gray-300">
                  <div className="flex justify-around gap-4">
                    <NavLink
                      to={`/admin/editproduct/${product._id}`}
                      state={{ product: product }}
                      className="p-1 border rounded-md hover:cursor-pointer text-slate-600 hover:text-slate-800 hover:bg-slate-400"
                      // onClick={() => handleEdit(product._id)}
                    >
                      <FaRegEdit />
                    </NavLink>
                    <NavLink
                      to={`/admin/product/${product._id}`}
                      state={{ product: product }}
                      className="p-1 border rounded-md hover:cursor-pointer text-slate-600 hover:text-slate-800 hover:bg-slate-400"
                      // onClick={() => handleView(product._id)}
                    >
                      <MdPreview />
                    </NavLink>
                    <span
                      className="p-1 border rounded-md hover:cursor-pointer text-slate-600 hover:text-slate-800 hover:bg-slate-400"
                      onClick={() => handleDelete(product._id)}
                    >
                      <AiFillDelete />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;

// name: { type: "string" },
//     price: { type: "number" },
//     category: { type: "string" },
//     description: { type: "string" },
//     stock: { type: "number" }
