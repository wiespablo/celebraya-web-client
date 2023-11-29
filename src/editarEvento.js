import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EventContext } from "./EventContext";
import dayjs from "dayjs";

const EditarEvento = (val) => {
    const {eventData, setEventData}  = useContext(EventContext);
    const [tematica, setTematica] = useState("");
    const [lugar, setLugar] = useState("");
    const [fecha, setFecha] = useState("");
    const [direccion, setDireccion] = useState("");
    const [hora, setHora] = useState("");
    const [editar, setEditar] = useState(false);
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
/*         if (fecha === null || fecha === '') {
            isproceed = false;
            errormessage += ' Fecha';
        } */
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

    const handleSearch = async (e) =>{
        console.log(invitado);
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API}/evento/crear`, {

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
        const obj = {tematica,lugar,fecha,hora,direccion,anfitrion,}
        
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

    useEffect( () => {
        const algo = async ()=>{
            console.log(eventData.fecha);
            if (!fecha) {
                let fechaFormat = await dayjs(eventData.fecha).format('YYYY-MM-DD');
                setFecha(fechaFormat);
                console.log("format",fechaFormat);
                console.log(fecha);    
            }   
        }
        algo();

    }, [fecha])
    
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h5>Editar Evento</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Tematica <span className="errmsg">*</span></label>
                                        <input defaultValue={eventData.tematica} onChange={e => setTematica(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Lugar <span className="errmsg">*</span></label>
                                        <input defaultValue={eventData.lugar} onChange={e => setLugar(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                           <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Fecha <span className="errmsg">*</span></label>
                                        <input defaultValue={fecha} onChange={e => setFecha(e.target.value)} type="date" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Direccion <span className="errmsg">*</span></label>
                                        <input defaultValue={eventData.direccion} onChange={e => setDireccion(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Hora <span className="errmsg"></span></label>
                                        <input defaultValue={eventData.hora} onChange={e => setHora(e.target.value)} type="time" className="form-control"></input>
                                    </div>
                                </div>
                            </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                    <table className="table table-striped">

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
                            <div className="card-footer"  >
                                <div className="btn-group" role="group">
                                <button type="submit" className="btn  btn-outline-success">Aceptar</button>

                                <Link to={'/editarEvento'} className="btn btn-outline-danger text-danger">Cancelar</Link>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </form>
            </div>
        </div>
    );
}

export default EditarEvento;