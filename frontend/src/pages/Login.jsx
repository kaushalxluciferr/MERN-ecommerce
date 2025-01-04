import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Login() {
  const navigate=useNavigate()
  const [currstate,setcurrstate]=useState('SignUp')
const {settoken,token,backendUrl}=useContext(ShopContext)
   
   
const [name,setname]=useState('')
const [email,setemail]=useState('')
const [password,setpassword]=useState('')


const handler=async (e)=>{
e.preventDefault()
try{
if(currstate==='SignUp')
{
const response=await axios.post(backendUrl+`/api/user/register`,{name,email,password})
if(response.data.success)
{
  toast.success("signup successfull")
  settoken(response.data.token)
  localStorage.setItem('token',response.data.token)
  setcurrstate('login')
  setemail('')
  setpassword('')
}
else{
  toast.error(response.data.message)
}
}
else{
  const response=await axios.post(backendUrl+ `/api/user/login`,{email,password})
  if(response.data.success)
  {
    toast.success("login successfully")
    // navigate('/')
    settoken(response.data.token)
    localStorage.setItem('token',response.data.token)
    setemail('')
    setpassword('')
  }
  else{
toast.error(response.data.message)
  }
}
}catch(error)
{
  toast.error(error.message)
}
}
settoken(localStorage.getItem('token'))


useEffect(()=>{
if(token)
{
  navigate('/')
}
},[token])


  return (
   
   <>
   <form onSubmit={handler} className='flex flex-col items-center p-5 w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
    <div className='inline-flex items-center gap-2 mb-2 mt-10'>
      <p className='prata-regular text-3xl'>{currstate} Here</p>
      <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
   </div>
  {currstate=='SignUp'?<input type="text" onChange={(e)=>setname(e.target.value)} value={name} className='w-full px-3 py-2 border rounded-md border-gray-800' placeholder='Enter Name:' required/>:""} 
   <input type="email" className='w-full px-3 py-2 border rounded-md  border-gray-800' onChange={(e)=>setemail(e.target.value)} value={email} placeholder='Enter Email:' required/>
   <input type="password" className='w-full px-3 py-2 border rounded-md  border-gray-800' onChange={(e)=>setpassword(e.target.value)} value={password} placeholder='Enter Passowrd: ' required/>
<div className='w-full flex justify-between text-sm mt-[-10px]'>
  <p className='cursor-pointer'>Forgot Your Passoword?</p>
  {
    currstate==='SignUp'? <p onClick={()=>setcurrstate('Login')} className='cursor-pointer text-[20px] text-red-500'>Login Here</p>: <p onClick={()=>setcurrstate('SignUp')} className='cursor-pointer text-[20px] text-red-500'> Create Account</p>
  }
</div>
<button className='bg-red-500 text-black text-[20px] px-3 py-3 mt-5 rounded-lg'>{currstate} Now</button>
   </form>

   </>
  )
}

export default Login
