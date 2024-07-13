import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { UserAuth } from '../context/AuthContext'


 function SignIn() {
  const [ data , setData ] = useState(
    {
      email : '',
      password :''
    }
  )
  const [errorMessage , setErrorMessage ] = useState(
    {
      email : '',
      password : ''
    }
  )
  const { user , logIn } = UserAuth()
  const navigate = useNavigate()


    function handilChanges ( event ){
      const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    handilValidation( name , value)
    }

    function handilValidation(name , value ){
      let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordPattern = /^(?=.*[A-Za-z].*[A-Za-z])[A-Za-z0-9]{5,}$/;
    let errMes = "";
    if (name == "email") {
      if (!emailPattern.test(value)) {
        errMes = " • Enter valid Email ";
      }
    } else {
      if (!passwordPattern.test(value))
        errMes = " • password must include 3 letters length min 5 ";
    }
    setErrorMessage((prev)=>({
      ...prev,
      [name]:errMes
    }));
    }



  async function handleFormSubmishion(){
    event.preventDefault()
    const { email , password } = data
      if( !email || !password ){
        setErrorMessage((prev)=>({
          ...prev,
          email : email ? "" : "Email required",
          password : password ? "" : "Password required"
        }));
        return
      }
    try {
      await logIn( email , password )
      navigate('/')
    } catch (error) {
      alert(error)
      console.log(error);
    }
  }

  return (
    <div className=' w-full h-screen '>
      <img className='hidden sm:block absolute w-full h-full object-cover  ' src="/BackgroundImage.jpg" alt="backgroundImage"   />
       <div className='bg-black/60 fixed top-0 left-0 w-full h-screen' />
       <div className=' fixed w-full  px-4 py-20 z-20 ' >
          <div className=' max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg ' >
            <div className=' max-w-[320px] mx-auto py-16 ' >
              <h1 className=' capitalize text-3xl font-nsans-bold' >sign in</h1>
              <form className=' w-full flex flex-col py-4 mt-4' onSubmit={ handleFormSubmishion} > 
                  <input 
                  className={ ` outline-none rounded-sm p-3 border border-solid ${errorMessage.email ? "border-red-600 " :" border-gray-500 "}   bg-transparent mb-1 `}
                  type="email" 
                  value={data.email}
                  onChange={handilChanges}
                  placeholder='Email  or mobile number ' 
                   name="email"  />
                   <span className="text-red-600 mb-4 ">
                     {errorMessage && errorMessage.email}
                   </span>
                  <input 
                  className={` outline-none rounded-sm p-3 border border-solid  ${errorMessage.password ? "border-red-600 " :" border-gray-500 "} bg-transparent mb-1 ` } 
                  type="password" 
                  value={data.password}
                  onChange={handilChanges}
                  placeholder='Password'   
                  name="password"   />
                  <span className="text-red-600 mb-4 ">
                     {errorMessage && errorMessage.password}
                  </span>
                  <button className=' bg-red-600 py-2 '  type='submit'>Sign In</button>
                 </form>
                    <p className=' w-full text-center text-sm font-nsans-light   mt-1 mb-4 align-middle ' >OR</p>
                    <button className=' w-full bg-white/15 rounded-md  align-middle  py-2 '  >Use a sigh-in code</button>
                    <div className='w-full flex justify-center mt-4'>
                      <Link  to="#" className=' text-sm hover:text-zinc-300 hover:underline text-center'>Forgot Password?</Link>
                    </div>
                    <div className='flex items-center mt-4'>
                      <input type="checkbox" id="rememberMe" className='mr-2' />
                      <label htmlFor="rememberMe" className='text-sm'>Remember Me</label>
                    </div>
                    <div className=' flex items-center  mt-4' >
                    <p className=' text-sm text-gray-400 font-nsans-light mr-1'>New to Netflix?</p>
                    < Link to={'/signup'} className=' text-sm hover:underline font-nsans-mediun' >Sign up now.</Link>
                    </div>
                    <p className=' text-sm text-gray-400 mt-4' >This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</p>

            </div>
          </div>
       </div>

    </div>
  )
}

export default SignIn