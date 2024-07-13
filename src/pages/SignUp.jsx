import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
function SignUp() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, SetErrorMessage] = useState({
    email: "",
    password: "",
  });
  const { user , signUp } = UserAuth()
  const navigate = useNavigate()

  const handilChanges = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    handilValidation( name , value)
  };
 

  const handilValidation = (name , value) => {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordPattern = /^(?=(?:[^A-Za-z]*[A-Za-z]){3})[A-Za-z0-9]{8,}$/;
    let errMes = "";
    if (name == "email") {
      if (!emailPattern.test(value)) {
        errMes = " • Enter valid Email ";
      }
    } else {
      if (!passwordPattern.test(value))
        errMes = " • password must include 3 letters length min 5 ";
    }
    SetErrorMessage((prev)=>({
      ...prev,
      [name]:errMes
    }));
  };

  async function submitForm( event ){
    event.preventDefault()
    const { email , password } = data;
    if( !email || ! password ){
      SetErrorMessage((prev)=>({
        ...prev,
        email : email ? "" : "Email required",
        password : password ? "" : "Password required"
      }));
      return
    }
    try {
      await signUp( email , password );
      navigate('/')
    } catch (error) {
      alert( error )
      console.log(error);
    }    
  }
  return (
    <div className=" w-full h-screen ">
      <img
        className="hidden sm:block absolute w-full h-full object-cover  "
        src="/BackgroundImage.jpg"
        alt="backgroundImage"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />
      <div className=" fixed w-full  px-4 py-20 z-20 ">
        <div className=" max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg ">
          <div className=" max-w-[320px] mx-auto py-16 ">
            <h1 className=" capitalize text-3xl font-nsans-bold">sign up</h1>
            <form className=" w-full flex flex-col py-4 mt-4" onSubmit={submitForm} >
              <input
                className={` outline-none  rounded-sm p-3  border-solid bg-transparent mb-1 border ${
                  errorMessage.email ? "border-red-800" : "border-gray-100"
                } `}
               type="email"
               value={data.email}
                placeholder="Email  or mobile number "
                name="email"
                onChange={handilChanges}
              />
              <span className="text-red-600 mb-3 ">
                {errorMessage && errorMessage.email}
              </span>
              <input
                className={` outline-none  rounded-sm p-3  border-solid bg-transparent mb-1 border ${
                  errorMessage.password ? "border-red-800" : "border-gray-100"
                } `}
                type="password"
                value={data.password}
                placeholder="Password"
                name="password"
                onChange={handilChanges}
              />
              <span className="text-red-600 mb-3 ">
                {errorMessage && errorMessage.password}
              </span>
              <button className=" bg-red-600 py-2 " type="submit" >Sign Up</button>
            </form>
            <div className="w-full flex justify-center mt-4">
              <Link
                to="#"
                className=" text-sm hover:text-zinc-300 hover:underline text-center"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center mt-4">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </label>
            </div>
            <div className=" flex items-center  mt-4">
              <p className=" text-sm text-gray-400 font-nsans-light mr-1">
                Alredy In Netflix?
              </p>
              <Link
                to={"/signin"}
                className=" text-sm hover:underline font-nsans-mediun"
              >
                Sign In now.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
