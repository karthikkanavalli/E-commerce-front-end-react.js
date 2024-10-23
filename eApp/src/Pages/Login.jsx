import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";


const Login = () => {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let sendData = async () => {
    try {
      let result = await axios.post("http://localhost:3000/login", formData);

      console.log(result.data);

      if (result.data.atoken && result.data.user) {
        localStorage.setItem("atoken", result.data.atoken);
        localStorage.setItem("user", JSON.stringify(result.data.user));

        if (result.data.success) {
          dispatch(login({ user: result.data.user, token: result.data.atoken }));
          alert("User logged in successfully");
          navigate("/"); 
        }
        
      } else {
        
        alert(result.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      
      console.error("Error during login:", err);
      alert("There was a problem logging in. Please try again later.");
    }
  };

  let loginHandler = () => {
    if (formData.email === "" || formData.password === "") {
      alert("Please enter your credentials");
    } else {
      console.log(formData);
      sendData();
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center">Login</h1>
      <div className="flex flex-col gap-4 p-5 m-auto my-20 border-2 rounded-md w-80 min-h-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-xl font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            className="p-2 border-2 rounded-md outline-none focus:outline-sky-400"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-xl font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            className="p-2 border-2 rounded-md outline-none focus:outline-sky-400"
          />
        </div>

        <button
          className="w-1/4 p-2 m-auto text-white rounded-md bg-slate-600 hover:bg-blue-500 "
          onClick={loginHandler}
        >
          Login
        </button>
        <div className="flex items-center w-2/3 m-auto">
          <h3>Not a user?</h3>
          <button
            className="p-2 m-auto text-white rounded-md bg-slate-600 hover:bg-blue-500"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
