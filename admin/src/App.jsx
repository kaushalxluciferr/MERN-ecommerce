
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { useEffect, useState } from 'react'
import Login from './components/Login'
export const backendUrl=import.meta.env.VITE_BACKEND_URL
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'

function App() {
 

  const [token,settoken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):"")
useEffect(()=>{
 localStorage.setItem('token',token)
},[token])

  return (
   <div className='bg-gray-50 min-h-screen'>
    {token===""?
    

    <>
    <Login settoken={settoken}/>
    </>
    :<>
    <Navbar settoken={settoken}/>
   <hr />
   <div className='flex w-full'>
   <Sidebar/>
   <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
<Routes>
  <Route path='/' element={<Home/>}/>
<Route path='/add' element={<Add token={token}/>} /> 
<Route path='/list' element={<List token={token}/>}/>
<Route path='/orders' element={<Order token={token}/>}/>


</Routes>
<ToastContainer position='bottom-right'/>
   </div>
   </div>
    </>
    }
   
   </div>
  )
}

export default App
