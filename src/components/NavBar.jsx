import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { User } from 'lucide-react';

function NavBar() {

 const { user , logOut } = UserAuth();
 const navigate = useNavigate()
  const {pathname} = useLocation();
console.log(pathname);

 async function handilLogOut(){
  try {
    await logOut();
    navigate('/')
  } catch (error) {
    console.log(error);
  }
 }
 
  return (
    <div className=' absolute w-full p-4 flex items-center justify-between z-50 pl-[10%] pr-[10%] pt-0 ' >
      < Link to={ '/' } > 
      <img src="/Logo.png" alt="logo" className="w-35 h-20 object-contain" />
      </Link>

      {
        user?.email ? (
          <div className='flex items-center space-x-4'>
          <Link to='/profile' className='flex items-center space-x-2 border border-solid border-r-gray-600 px-2 py-1 rounded-sm '>
            <User />
            <span className=' text-gray-600' >Profile</span>
          </Link>
          <button className='h-8 capitalize bg-red-600 px-3 rounded cursor-pointer' onClick={handilLogOut} >LogOut</button>
        </div>

        ) : (
          pathname == "/signup" || pathname == '/signin' ?  <> </> :
          <div  >
        {/* < Link to={ 'login'} > <button className=' capitalize pr-4' >login</button></Link> */}
        
        <select id="language" name="language" className=' text-sm font-nsans-mediun text-white border border-gray-500 rounded bg-transparent px-3 py-1 mr-2'>
        <option value="english" className='hover:bg-sky-700 hover:text-white text-black '  >English</option>
        <option value="hindi" className='hover:bg-sky-700 hover:text-white text-black'  >Hindi</option>
    </select>
        < Link to={ 'signin'} > <button className=' h-8 capitalize bg-red-600 px-3 rounded cursor-pointer ' >sign in</button></Link>
      </div>
        )
      }


      
    </div>
  )
}

export default NavBar