import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");


    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Por favor ingresar el valor en ';
        if (nombre === null || nombre === '') {
            isproceed = false;
            errormessage += ' Nombre';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }
        if (apellido === null || apellido === '') {
            isproceed = false;
            errormessage += ' Apellido';
        }
        if (direccion === null || direccion === '') {
            isproceed = false;
            errormessage += ' Direccion';
        }
        if (telefono === null || telefono === '') {
            isproceed = false;
            errormessage += ' Telefono';
        }        

        if(!isproceed){
            toast.warning(errormessage)
        }else{
            if(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){

            }else{
                isproceed = false;
                toast.warning('Por favor ingresar un mail');
            }
        }
        return isproceed;
    }


    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { nombre, apellido, email, telefono, password, direccion };
            if (IsValidate()) {
            //console.log(regobj);
            fetch(`${process.env.REACT_APP_API}/register`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registered successfully.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>Registro de Usuario</h1>
                        </div>
                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Nombre <span className="errmsg">*</span></label>
                                        <input value={nombre} onChange={e => setNombre(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                           <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Apellido <span className="errmsg">*</span></label>
                                        <input value={apellido} onChange={e => setApellido(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Telefono <span className="errmsg"></span></label>
                                        <input value={telefono} onChange={e => setTelefono(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Direccion</label>
                                        <input value={direccion} onChange={e => setDireccion(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-outline-primary">Registrar</button> |
                            <Link to={'/login'} >
                                <button className="btn btn-outline-danger">
                                Cerrar
                                </button>
                                </Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;