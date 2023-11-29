import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

    const Login = () => {
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    const navigate=useNavigate();

    useEffect( () => {
    sessionStorage.clear();
    },[]);

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');
            let inputobj={
                "email": email,
                "password": password};
                fetch(`${process.env.REACT_APP_API}/login`,{
                    method:'POST',
                    headers:{'content-type':'application/json'},
                    body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Fallo de credenciales');
                }else{
                     toast.success('Success');
                    //Guardamos datos en el local storage del explorador
                    localStorage.setItem('email',resp.email);
                    localStorage.setItem('userId',resp._id);                     
                    localStorage.setItem('token',resp.token);
                    localStorage.setItem('nombre',resp.nombre);
                    localStorage.setItem('apellido',resp.apellido);
                    
                    navigate('/dashboard')
                }
                // if (Object.keys(resp).length === 0) {
                //     toast.error('Please Enter valid email');
                // } else {
                //     if (resp.password === password) {
                //         toast.success('Success');
                //         sessionStorage.setItem('email',email);
                //         usenavigate('/')
                //     }else{
                //         toast.error('Please Enter valid credentials');
                //     }
                // }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (email === '' || email === null) {
            result = false;
            toast.warning('Por favor ingresar Email');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Por favor ingresar Contraseña');
        }
        return result;
    }
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                <form onSubmit={ProceedLoginusingAPI} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Inicio de Sesión</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Email<span className="errmsg">*</span></label>
                                <input value={email} onChange={e => SetEmail(e.target.value)} className="form-control"></input>
                            </div>
                            <div className="form-group">
                                <label>Contraseña<span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => SetPassword(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-outline-primary">Inicio</button> |
                            <Link  to={'/register'}>
                            <button className="btn btn-outline-success">
                                Nuevo Usuario
                                </button>
                                </Link>
                            
                              
                               
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;