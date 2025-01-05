import './App.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL1;
const employee=import.meta.env.VITE_BACKEND_URL2

function App() {
  console.log(backendUrl);

  return (
    <>
    
    <div className='head'>
      <h1>Welcome to Kaushal Ecommerce Site</h1>
    </div>
    <div className='container'>
      
      <h1>Please Choose Your Role</h1>
    <div className='box'>
      <a href={`${backendUrl}`}>Admin</a>
      <a href={`${employee}`}>Customer</a>
      </div>
    </div>
    <div className='imga'>
<img src="./giphy.webp" alt="" />

    </div>
    </>
  );
}

export default App;
