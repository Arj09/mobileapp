import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Component/Login';
import { Home } from './Component/Home';
import { Cart } from './Component/Cart';
import { UserContextProvider } from './Component/ContextAPI/ContextProvider';
import { Detail } from './Component/Detail';
import { Dost } from './Component/Dost';

function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route index element={<Login/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/detail' element={<Detail/>} />
      <Route path='/dost' element={<Dost/>} />
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
    
  );
}

export default App;
