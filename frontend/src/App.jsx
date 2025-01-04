
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'
import { useContext } from 'react'
import { ShopContext } from './context/ShopContext'

function App() {
 
  const {token}=useContext(ShopContext)
  
  return (
   <>
   <div className='px-4  sm:px-[5vw] md:px-[7vw lg:px-[9vw]'>
    <ToastContainer position='bottom-right'/>
    {token?<Navbar/>:null}
    
    <SearchBar/>
<Routes>
  {token?<>
<Route path='/' element={<Home/>} />
<Route path='/contact' element={<Contact/>}/>
<Route path='/orders' element={<Order/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/place-order' element={<PlaceOrder/>}/>
<Route path='collection' element={<Collection/>}/>
<Route path='/product/:id' element={<Product/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/verify' element={<Verify/>} />
</>
:<>
<Route path='/login' element={<Login/>}/>
<Route path='*' element={<Login/>}/>
</>}
</Routes>
{token?<Footer/>:null}

   </div>
   </>
  )
}

export default App
