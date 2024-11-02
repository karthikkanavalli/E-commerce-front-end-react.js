import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/authSlice";
import OrderDetailModal from "./OrderDetailModal";

const MyOrders = () => {
  let [ordersList, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

  let { token, user } = useSelector((state) => state.auth);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let getMyOrders = async () => {
    let result = await axios.get("http://localhost:3000/orders/myorders", {
      params: {
        userID: user._id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (result.data.message === "token expired") {
      alert("Please login again; your session has expired.");
      dispatch(logout());
      navigate("/login");
    }

    setOrders(result.data.orders);
  };
  useEffect(() => {
    getMyOrders();
  }, []);

  console.log(ordersList);




  
  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };
  return (
  <>
      <h1 className="mb-4 text-3xl font-semibold text-center text-slate-600">
        My Orders
      </h1>
      <div className="flex flex-col w-full min-h-screen gap-4 p-4 bg-slate-100">
        {ordersList?.map((order) => (
          <div
            className="flex flex-col gap-4 p-4 bg-white border rounded-lg shadow-md cursor-pointer border-slate-200"
            key={order._id}
            onClick={() => handleOrderClick(order)} 
          >
            <h3 className="text-lg font-medium text-slate-700">
              Order ID: {order._id}
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-lg border-slate-200 bg-slate-50">
                <thead className="bg-slate-200 text-slate-800">
                  <tr>
                    <th className="w-[200px] px-4 py-2 font-semibold text-left">
                      Address
                    </th>
                    <th className="w-[100px] px-4 py-2 font-semibold text-left">
                      Status
                    </th>
                    <th className="w-[150px] px-4 py-2 font-semibold text-left">
                      Order Date
                    </th>
                    <th className="w-[100px] px-4 py-2 font-semibold text-left">
                      Total Items
                    </th>
                    <th className="w-[100px] px-4 py-2 font-semibold text-left">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-slate-100">
                    <td className="px-4 py-2 border-t border-slate-200 w-[200px] break-words overflow-hidden">
                      {order.address}
                    </td>
                    <td className="px-4 py-2 border-t border-slate-200 w-[100px]">
                      {order.status}
                    </td>
                    <td className="px-4 py-2 border-t border-slate-200 w-[150px]">
                      {order.date || "Today"}
                    </td>
                    <td className="px-4 py-2 border-t border-slate-200 w-[100px]">
                      {order.totalItemsCount}
                    </td>
                    <td className="px-4 py-2 border-t border-slate-200 w-[100px]">
                      ${order.cartTotal ? order.cartTotal.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for order details */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};


export default MyOrders;
