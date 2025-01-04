import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import ShopConetxtProvider from './context/ShopContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopConetxtProvider> 
    {/* with this we get instance of shopcontextprovider in any jsx file  */}
    <App />
  </ShopConetxtProvider>
  </BrowserRouter>,
)
