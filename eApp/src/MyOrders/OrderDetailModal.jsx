

const OrderDetailModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <div className="z-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Order Details</h2>
        <h3 className="mb-2">Order ID: {order._id}</h3>
        <p className="mb-2">Address: {order.address}</p>
        <p className="mb-2">Status: {order.status}</p>
        <p className="mb-2">Order Date: {order.date || "Today"}</p>
        <p className="mb-2">Total Items: {order.totalItemsCount}</p>
        <p className="mb-4">Total: ${order.cartTotal?.toFixed(2) || "0.00"}</p>

        <h4 className="mb-2 font-semibold">Items:</h4>
        <ul>
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <button
          className="px-4 py-2 mt-4 text-white rounded-md bg-slate-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailModal;
