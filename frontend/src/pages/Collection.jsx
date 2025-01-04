import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProdItem from '../components/ProdItem'

function Collection() {
  const {products,search,showsearch}=useContext(ShopContext)
const [show,setshow]=useState(false)
const [filterprod,setfilterprod]=useState([])
const [category,setcategory]=useState([])
const [subcat,setsubcat]=useState([])
const [sortType,setsortType]=useState('relavent')

const tooglecategory=(e)=>{
  if(category.includes(e.target.value))
  {
    setcategory(prev=>prev.filter(item=>item!==e.target.value))
  }
  else{
    setcategory(prev=>[...prev,e.target.value])
  }
}


const tooglesub=(e)=>{
  if(subcat.includes(e.target.value))
  {
    setsubcat(prev=>prev.filter(item=>item!==e.target.value))
  }
  else{
    setsubcat(prev=>[...prev,e.target.value])
  }
}

const applyfilter=()=>{
  let prdcopy=products.slice()
if(showsearch &&search)
{
  prdcopy=prdcopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
}
  if(category.length>0)
  {
    prdcopy=prdcopy.filter(item=>category.includes(item.category))
  }

   if(subcat.length>0)
{
prdcopy=prdcopy.filter(item=>subcat.includes(item.subCategory)) // filtering sucategory data from the assets file 
}
setfilterprod(prdcopy)
}

//if we are not selecting any filter and page is loaded then all ietems will be displayed 
// useEffect(()=>{
// setfilterprod(products)
// },[])

//when we refresh the browser then  then price will be displayed according as we selected
useEffect(()=>{
shortproduct()
},[sortType])


useEffect(()=>{
applyfilter()
},[search,showsearch,category,subcat,products])


//making the funxtion to display the product in low to hig or high to low
const shortproduct=()=>{
  let  fltcopy=filterprod.slice();
  switch(sortType)
  {
    case 'low-high':
      setfilterprod(fltcopy.sort((a,b)=>(a.price-b.price)))
      break;

    case 'high-low':
      setfilterprod(fltcopy.sort((a,b)=>(b.price-a.price)))
      break;
    default:
      applyfilter()
      break;
  }
}

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter option */}
<div className='min-w-60'>
<p onClick={()=>setshow(!show)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters

  <img  src={assets.dropdown_icon} className={`h-3 sm:hidden ${show?'rotate-90':""}`} alt="" />
</p>

{/* filter by category */}
 <div className={`border  border-gray-300 pl-5 py-3 mt-6 ${show?'':"hidden"} sm:block`}>
  <p className='mb-3 text-sm font-medium'> Categories</p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700" >
  <p className='flex gap-2'>
    <input type="checkbox" className='w-3' value={'Men'} onChange={tooglecategory} id="" />Men
  </p>
  <p className='flex gap-2'>
    <input type="checkbox" className='w-3' value={'Women'} onChange={tooglecategory} id="" />Women
  </p>
  <p className='flex gap-2'>
    <input type="checkbox" className='w-3' value={'Kids'} onChange={tooglecategory} id="" />Kids
  </p>
</div>
</div>
{/* subchategory filter */}
<div className={`border  border-gray-300 pl-5 py-3 my-5 ${show?'':"hidden"} sm:block`}>
  <p className='mb-3 text-sm font-medium'>Types</p>
<div className="flex flex-col gap-2 text-sm font-light text-gray-700" >
  <p className='flex gap-2'>
    <input type="checkbox" className='w-3' value={'Topwear'} onChange={tooglesub} id="" />TopWear
  </p>
  <p className='flex gap-2'>
    <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={tooglesub} id="" />BottomWear
  </p>
  <p className='flex gap-2'>
    <input type="checkbox" className='w-3' value={'Winterwear'} onChange={tooglesub} id="" />Winterwear
  </p>
</div>
</div>
 </div>  

{/* right side */}

<div className='flex-1'>
  <div className='flex justify-between text-base sm:text-2xl mb-4'>
    <Title txt1={"All"} txt2={'Collections'}/>
{/* now we sort the product */}
<select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-1'>
<option value="relevant">Display By relevant</option>
<option value="low-high">Display Low-High</option>
<option value="high-low">Display by High-Low</option>

</select>
  </div>
  {/* display the produxt now */}
  <div className="grid grid-cols-2 md:grid-cols-4 lg-grid-cols-5 gap-4 gap-y-6 ">

{filterprod.map((item,index)=>(
  <ProdItem key={index} id={item._id} img={item.image} name={item.name} price={item.price}/>
))}
  </div>
</div>

    </div>
  )
}

export default Collection
