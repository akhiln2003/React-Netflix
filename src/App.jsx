import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return( <>
  < AuthContextProvider >
  < NavBar />
      <Routes>
        <Route path='/' element = {  < Home/> } />
        <Route path='/signin' element = {  < SignIn />  } />
        <Route path='/signup' element = {  <SignUp /> } />
        <Route path='/profile' element = {  <ProtectedRoute >< Profile/></ProtectedRoute> } />
      </Routes>
      </AuthContextProvider>
  </>)
}

export default App