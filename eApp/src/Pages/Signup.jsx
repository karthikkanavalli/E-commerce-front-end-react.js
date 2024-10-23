import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
  });
  let navigate = useNavigate();

  let onChange = (e) => {
    setFormData({ ...FormData, [e.target.name]: e.target.value });
  };

  let sendData = async (data) => {
    let result = await axios.post("http://localhost:3000/signup",data);
    console.log(result.data);
    if (result.data.success) {
      alert("user created successfully");
      localStorage.setItem("atoken", result.data.atoken);
      localStorage.setItem("user", result.data.newUser)
      navigate("/login");
    } else {
      alert(result.data.message);
      navigate("/signup");
    }
  };
  let signup = () => {
    if (
      FormData.email === "" ||
      FormData.password === "" ||
      FormData.confirmPassword === "" ||
      FormData.name === "" ||
      FormData.mobile === ""
    ) {
      alert("pleas enter your credentials");
    } else if(FormData.password !== FormData.confirmPassword){
        alert("password and confirm password should be same")

    }
    else {
      // eslint-disable-next-line no-unused-vars
      let { confirmPassword, ...Data } = FormData;
      console.log(Data);
      sendData(Data);
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center">SignUp</h1>
      <div className="flex flex-col gap-4 p-5 m-auto my-20 border-2 rounded-md w-96 min-h-6">
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="text-xl font-semibold">
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            onChange={onChange}
            className="w-full p-2 border-2 rounded-md outline-none focus:outline-sky-400 focus:border-none"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="text-xl font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={onChange}
            className="w-full p-2 border-2 rounded-md outline-none focus:outline-sky-400 focus:border-none"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="mobile" className="text-xl font-semibold">
            Mobile
          </label>
          <input
            type="mobile"
            name="mobile"
            id="mobile"
            onChange={onChange}
            className="w-full p-2 border-2 rounded-md outline-none focus:outline-sky-400 focus:border-none"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-xl font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={onChange}
            className="w-full p-2 border-2 rounded-md outline-none focus:outline-sky-400 focus:border-none"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="confirmPassword" className="text-xl font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={onChange}
            className="w-full p-2 border-2 rounded-md outline-none focus:outline-sky-400 focus:border-none"
          />
        </div>
        <div></div>
        <button
          className="w-1/4 p-2 m-auto text-white rounded-md bg-slate-600 hover:bg-blue-500"
          onClick={signup}
        >
          SignUp
        </button>
      </div>
    </>
  );
};

export default Signup;
