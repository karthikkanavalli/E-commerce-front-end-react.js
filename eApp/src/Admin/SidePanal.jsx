import { NavLink } from "react-router-dom";

const SidePanal = () => {
  return (
    <div className="w-full h-full p-4 text-white rounded-lg bg-slate-800">
      <ul className="flex flex-col gap-4 text-lg font-medium">
        {/* Users Link */}
        <li className="transition-transform transform  active:scale-95">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? "underline text-slate-100"
                : "text-slate-300 hover:text-slate-100"
            }
          >
            Users
          </NavLink>
        </li>

        {/* Products Link */}
        <li className="transition-transform transform  active:scale-95">
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive
                ? "underline text-slate-100"
                : "text-slate-300 hover:text-slate-100"
            }
          >
            Products
          </NavLink>
        </li>

        {/* Add Products Link */}
        <li className="transition-transform transform  active:scale-95">
          <NavLink
            to="/admin/addproduct"
            className={({ isActive }) =>
              isActive
                ? "underline text-slate-100"
                : "text-slate-300 hover:text-slate-100"
            }
          >
            Add Products
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SidePanal;
