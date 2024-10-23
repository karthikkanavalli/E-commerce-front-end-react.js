import { Outlet } from "react-router-dom";
import SidePanal from "./SidePanal";

const Admin = () => {
  return (
    <div className="flex flex-col w-full min-h-screen px-4  bg-slate-100">
      {/* Admin Header */}

      <h1 className="text-3xl font-bold text-center text-slate-800 my-6">
        Admin Dashboard
      </h1>
      {/* Main Layout */}
      <div className="flex h-full gap-4 mt-4 ">
        {/* Sidebar */}
        <div className="w-1/4 min-h-screen p-3 text-white rounded-lg bg-slate-700 shadow-lg ">
          <SidePanal />
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 min-h-screen rounded-lg bg-white p-6 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
