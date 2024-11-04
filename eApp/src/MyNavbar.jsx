import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./redux/features/authSlice";
import { useEffect } from "react";
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";// import axios from "axios";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";




const MyNavbar = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (typeof user === "string") {
      user = JSON.parse(user);
      console.log("inside useffect")
    }
  },[])
  let { isLoggedIn } = useSelector((state) => state.auth);

  console.log("User:", user);
  console.log("Is Logged In:", isLoggedIn); 

  const handleLogout = () => {
    localStorage.removeItem("atoken");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };




  return (
    <nav className="fixed top-0 flex items-center justify-between w-full h-16 px-8 bg-slate-50 border-slate-600 z-50">
      <button
        className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
        onClick={() => navigate("/")}
      >
        Home
      </button>
      <div className="flex gap-4">
        <button
          className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
          onClick={() => {
            navigate("/products");
          }}
        >
          Product
        </button>
        <button
          className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
          onClick={() => navigate("/orders")}
        >
          My Orders
        </button>
      </div>

      <div className="flex ">
        {isLoggedIn ? (
          <>
            <div className="flex justify-evenly gap-x-2 me-1">
              {user && user.role === "admin" && (
                <button
                  className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              )}
              <div className="flex flex-col items-center justify-center w-24 text-right text-white ">
                <Menu >
                  <MenuButton className="rounded-md  text-2xl font-bold text-slate-900 focus:outline-none data-[hover]:bg-slate-50 data-[open]:bg-slate-50 data-[focus]:outline-1 data-[focus]:outline-white ">
                    <FaRegUserCircle />
                  </MenuButton>
                    <p className="text-xs font-medium tracking-tighter text-slate-900 ">Hello {(user.name).split(" ")[0] }..!</p>

                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-40  rounded-b-md border flex flex-col gap-1 border-slate-400  border-slate-700 bg-slate-50  text-sm/6 text-slate-800 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    <MenuItem>
                      <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center w-full gap-2 p-2 text-lg border rounded-md group hover:border hover:border-slate-200"
                      >
                        Profile
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => navigate("/cart")}
                        className="flex items-center w-full p-2 rounded-md ptext-lg group hover:border hover:border-slate-200 "
                      >
                        <FaShoppingCart />
                      </button>
                    </MenuItem>
                    {/* <MenuItem>
                      <button className="group hover:bg-slate-700 flex w-full items-center gap-2 rounded-lg  data-[focus]:bg-white/10">

                          somthing
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button className="group hover:bg-slate-700 flex w-full items-center gap-2 rounded-lg  data-[focus]:bg-white/10">
                        Delete
                          
                      </button>
                    </MenuItem> */}
                  </MenuItems>
                </Menu>
              </div>{" "}
            </div>
            <button
              className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4">
            <button
              className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="text-lg font-medium duration-100 transform rounded-sm text-slate-900 hover:text-slate-800 hover:border-b-2 hover:border-slate-800"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MyNavbar;
