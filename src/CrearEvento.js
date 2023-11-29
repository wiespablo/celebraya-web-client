import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CrearEvento = () => {
    const [tematica, setTematica] = useState("");
    const [lugar, setLugar] = useState("");
    const [fecha, setFecha] = useState("");
    const [direccion, setDireccion] = useState("");
    const [hora, setHora] = useState("");
    const [invitados, setInvitados] = useState([]);
    const [invitado, setInvitado] = useState({});
    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Por favor ingrese el valor en ';
        if (tematica === null || tematica === '') {
            isproceed = false;
            errormessage += ' Tematica';
        }
        if (lugar === null || lugar === '') {
            isproceed = false;
            errormessage += ' Lugar';
        }
        if (fecha === null || fecha === '') {
            isproceed = false;
            errormessage += ' Fecha';
        }
        if (direccion === null || direccion === '') {
            isproceed = false;
            errormessage += ' Direccion';
        }
        if (hora === null || hora === '') {
            isproceed = false;
            errormessage += ' Hora';
        }
   
        return isproceed;
    }

    let token = localStorage.getItem('token');

    const handleSearch = async (e) =>{console.log(invitado);
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API}/usuario/buscar`, {
            method: "POST",
            headers:{  
                'content-type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify({text: invitado})
        });
        const resJson = await response.json();
        setInvitado(resJson);
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        const lista_invitados = invitados.map(({fullName, ...rest}) => rest);
        const anfitrion = localStorage.getItem('userId');
        const obj = {tematica,lugar,fecha,hora,direccion,anfitrion, lista_invitados }
        
        if (IsValidate()) {
            
            fetch(`${process.env.REACT_APP_API}/evento/crear`, {
                method: "POST",
                headers:{  
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                body: JSON.stringify(obj)
            }).then((res) => {
                toast.success('Registro Exitoso')
                navigate('/dashboard');
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
                            <h1>Crear Evento</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Tematica <span className="errmsg">*</span></label>
                                        <input value={tematica} onChange={e => setTematica(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Lugar <span className="errmsg">*</span></label>
                                        <input value={lugar} onChange={e => setLugar(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                           <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Fecha <span className="errmsg">*</span></label>
                                        <input value={fecha} onChange={e => setFecha(e.target.value)} type="date" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Direccion <span className="errmsg">*</span></label>
                                        <input value={direccion} onChange={e => setDireccion(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hora <span className="errmsg"></span></label>
                                        <input value={hora} onChange={e => setHora(e.target.value)} type="time" className="form-control"></input>
                                    </div>
                                </div>


                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Buscar Invitado <span className="errmsg">*</span></label>
                                        <input  onChange={e => setInvitado(e.target.value)} className="form-control"></input>                
                                              <div>
                                                    <input defaultValue={invitado && invitado.nombre ? invitado.nombre + ' ' + invitado.apellido: ''} key ={invitado} 
                                                    onClick={(e)=>{
                                                        invitado && setInvitados([...invitados,{invitado: invitado._id, estado:'pendiente', fullName: invitado.nombre + ' '+ invitado.apellido }]);
                                                        setInvitado()
                                                        }}></input>
                                              </div>  
                                        <button type="submit" onClick={(e)=>{handleSearch(e)}} className="btn btn-primary">Buscar</button>
                                    </div>
                                </div>
                            </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                    <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">Lista de Invitados</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                    invitados.map((invitado, i, key) => (
                                        <tr scope="row">
                                            <td key={i} className="form-control">{invitado.fullName}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Crear</button> |
                                <Link to={'/dashboard'} className="btn btn-danger">Cerrar</Link>
                            </div>
                        </div>
                    </div>                    
                </form>
            </div>
        </div>
    );
}

export default CrearEvento;