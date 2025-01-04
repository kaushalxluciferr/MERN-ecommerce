import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const ShopContext=createContext()


const ShopConetxtProvider=(props)=>{

    const [token,settoken]=useState('')
const delivery_fee=10;
const backendUrl=import.meta.env.VITE_BACKEND_URL
const [search,setsearch]=useState('')
const [showsearch,setshowsearch]=useState(false)

const [cartItems,setCartitems]=useState({})

const [products,setproducts]=useState([])
 const navigate =useNavigate()

 

const addtochart= async(itemId,size)=>{

    if(!size)
    {
        toast.error("please select size")
        return; 
    }
    let cartData=structuredClone(cartItems)
    if(cartData[itemId])
    {
        if(cartData[itemId][size])
        {
            cartData[itemId][size]+=1;
        }
        else{
            cartData[itemId][size]=1;
        }
    }
    else{
cartData[itemId]={};
cartData[itemId][size]=1
    }
    setCartitems(cartData)
    if(token)
    {
        try{
            await axios.post(backendUrl+`/api/cart/add`,{itemId,size},{
                headers:{token}
            })
toast.success("Item added successfully")
        }catch(error)
        {
            toast.error(error.message)
        }
    }
}

const getcartcount=()=>{
    let total=0;
    for(const items in cartItems)
    {
        for(const item in cartItems[items])
        {
            try{
                    if(cartItems[items][item]>0)
                    {
                        total+=cartItems[items][item]
                    }
            }catch(error)
            {
                toast.error(error.message)
            }
        }
    }
    return total;
}

// useEffect(()=>{
// console.log(cartItems);

// },[cartItems])



// when we r in the cart page and we want to update any qauntity then qauntity will be upfated
const updateQuantity=async (itemId,size,quantity)=>{
let cartData=structuredClone(cartItems)
cartData[itemId][size]=quantity

setCartitems(cartData)

if(token)
{
    try{
await axios.post(backendUrl+`/api/cart/update`,{itemId,size,quantity},{
    headers:{token}
})
toast.success("updated sucessfully")
    }
    catch(error)
    {
        toast.error(error.message)
    }
}
}


const getCartUser=async (token)=>{
try{
const response=await axios.post(backendUrl+`/api/cart/get`,{},{headers:{token}})
if(response.data.success)
{
    setCartitems(response.data.cartData)
}
}catch(error)
{
    toast.error(error.message)
}
}



const getcartamount=  ()=>{
    let total=0
    for(const items in cartItems)
        {
            let iteminfo=products.find((product)=>product._id===items)
            for(let item in cartItems[items])
                {
                    try{
                        if(cartItems[items][item]>0)
                            {
                                total+=iteminfo.price* cartItems[items][item]
                            }
                        }catch(error)
                        {
                            toast.error(error.message)
           }
        }
    }
    return total;
}


//function to get the list of product from the backend
const productData = async ()=>
{
    try{
const response=await axios.get(backendUrl + `/api/product/list`)
if(response.data.success)
{
    setproducts(response.data.products)
}
else{
    toast.error(response.data.message)
}
    }catch(error)
    {
toast.error(error.message)
    }
}

useEffect(()=>{
productData()
},[])

// checking token
useEffect(()=>{
if((!token&&localStorage.getItem('token')))
{
    settoken(localStorage.getItem('token'))
    getCartUser(localStorage.getItem('token'))
}
},[])

const value={navigate,
products,delivery_fee,search,setsearch,showsearch,setshowsearch,cartItems,addtochart,getcartcount,
updateQuantity,getcartamount,backendUrl,
settoken,token,setCartitems
}
return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
)
}
export default ShopConetxtProvider