import React from "react";
import Register from './pages/Register';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <>
    {/* <Navbar />
      <div className="text-primary">this is my app</div> */}
       <BrowserRouter>
     <Toaster />
     <Navbar />
     <Routes>
      {/* <Route path='/' element= {<Home/>} /> */}
        <Route path='/' element={<Home/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login'  element={<Login/>}/>

       
     </Routes>
   
     </BrowserRouter>
    </>
  );
};

export default App;
