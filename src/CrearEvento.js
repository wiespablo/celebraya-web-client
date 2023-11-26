import { useState, useRef } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "bootstrap";

const CrearEvento = () => {

    const inputInvitado = useRef(0);
    const [tematica, setTematica] = useState("");
    const [lugar, setLugar] = useState("");
    const [fecha, setFecha] = useState("");
    const [direccion, setDireccion] = useState("");
    const [hora, setHora] = useState("");
    const [evento, setEvento] = useState({});
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
        const response = await fetch(`${process.env.REACT_APP_API}/usuario/buscar`, {
            method: "POST",
            headers:{  
                'content-type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify({text: invitado})
        });
        const resJson = await response.json()
        console.log("invitado ==>",resJson);
        setInvitado(resJson);
    }

    const handlesubmit = (e) => {
            e.preventDefault();
            setEvento({
                tematica:tematica,
                lugar:lugar,
                fecha:fecha,
                direccion:direccion,
                hora:hora,
                anfitrion:localStorage.getItem('userId'),
                lista_invitados: invitados
            })

            if (IsValidate()) {
                console.log(evento);
            fetch(`${process.env.REACT_APP_API}/evento/crear`, {
                method: "POST",
                headers:{  
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                body: JSON.stringify(evento)
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
                                        <input onChange={e => setInvitado(e.target.value)} className="form-control"></input>
                                        <div>
                                            {
                                              <div value={invitado} key ={invitado} onClick={(e)=>{setInvitados({invitado: e._id, estado:'pendiente' })}}>

                                              </div>  
                                            }
                                        </div>
                                        <button type="submit" onClick={()=>{handleSearch(invitado)}} className="btn btn-primary">Buscar</button>
                                    </div>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Invitados <span className="errmsg">*</span></label>
                                        <input value={tematica} onChange={e => setTematica(e.target.value)} className="form-control"></input>
                                </div>
 
 
                            </div>


                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Crear</button> |
                            <Link to={'/dashboard'} className="btn btn-danger">Cerrar</Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default CrearEvento;