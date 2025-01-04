import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
function Login({settoken}) {

    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
   
//    submit function
    const submithandle=async (e)=>{
        e.preventDefault()
try{
const response=await axios.post(backendUrl+`/api/user/admin`,{email,password})
if(response.data.success)
{
   settoken(response.data.token)
   toast.success("login sucessfull")
   
}
else{
    toast.error(error.message)
}


}catch(error)
{
toast.error(error.message)
}
    }
  return (
    <div className='min-h-screen bg-[#134e4a] flex items-center justify-center w-full'>
      <div className='ng-white shadow-md bg-white rounded-lg px-10 max-w-md'>
        <h1 className='text-3xl font-bold mb-10'>Admin Login Panel</h1>
        <form  onSubmit={submithandle}>
            <div className='mb-4 min-w-70'>
                <p className='text-sm font-medium text-gray-600 mb-2 '>Email:</p>
                <input className='rounded-md w-full outline-none px-3 py-2 border-gray-500' type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter email:' required />
            </div>
            <div className='mb-4 min-w-70'>
                <p className='text-sm font-medium text-gray-600 mb-2 '>Password:</p>
                <input className='rounded-md w-full outline-none px-3 py-2 border-gray-300' type="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter Passowrd:' required />
            </div>
            <button type='submit' className='mt-3 w-full py-3 px-3 rounded-lg text-white bg-red-400 outline-none mb-5'>Login Now</button>
        </form>
      </div>
    </div>
  )
}

export default Login
