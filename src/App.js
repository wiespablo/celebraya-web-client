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
import Perfil from './Perfil';
import Dashboard from './Dashboard';
import VerEvento from './verEvento';
import EditarEvento from './editarEvento';
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
        <Route path='/Perfil' element={<Perfil/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/CrearEvento' element={<CrearEvento/>}></Route>
        <Route path='/verEvento' element={<VerEvento/>}></Route>
        <Route path='/editarEvento' element={<EditarEvento/>}></Route>
      
      </Routes>
    
      </BrowserRouter>
      </EventProvider>  
      
    </div>
  );
}

export default App;
