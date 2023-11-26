import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Dashboard';
import Login from './Login';
import Register from './Register';
import CrearEvento from './CrearEvento';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import Invitar from './Invitar';



function App() {
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      <Appheader></Appheader>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/Invitar' element={<Invitar/>}></Route>
        <Route path='/dashboard' element={<Home/>}></Route>
        <Route path='/CrearEvento' element={<CrearEvento/>}></Route>
        
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
