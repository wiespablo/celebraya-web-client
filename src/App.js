import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Dashboard';
import Login from './Login';
import Register from './Register';
import CrearEvento from './CrearEvento';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import Invitar from './Invitar';
import Dashboard from './Dashboard';
import VerEvento from './verEvento';
import  {EventProvider} from './EventContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <EventProvider>      
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/Invitar' element={<Invitar/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/CrearEvento' element={<CrearEvento/>}></Route>
        <Route path='/verEvento' element={<VerEvento/>}></Route>

 
        
      </Routes>
    
      </BrowserRouter>
      </EventProvider>  
      
    </div>
  );
}

export default App;
