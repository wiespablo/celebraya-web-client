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
    console.log(eventData);


    const handlesubmit = async (e) => {
        e.preventDefault();
        const obj = {tematica,lugar,fecha,hora,direccion}
        if (IsValidate()) { 
            const response = await fetch(`${process.env.REACT_APP_API}/evento/editar/${eventData._id}`, {
                method: "PUT",
                headers:{  
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token

                },
                body: JSON.stringify(obj)
            });
            if (response.status == 201) {
                toast.success('Edición Exitosa')
                navigate('/dashboard');
                
            } else {
                toast.error('Hubo un error')                
            }
        }
    }

    useEffect(() => {
        if (tematica == "") {
            setTematica(eventData.tematica);           
        }
        if (lugar == "") {
            setLugar(eventData.lugar);           
        }    
        if (direccion == "") {
            setDireccion(eventData.direccion);           
        }            
        if (hora == "") {
            setHora(eventData.hora);           
        }        
    }, [tematica, lugar, hora, direccion])
    

    useEffect( () => {
        const algo = async ()=>{
            if (!fecha) {
                let fechaFormat = await dayjs(eventData.fecha).format('YYYY-MM-DD');
                setFecha(fechaFormat);
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
                            <div className="card-footer"  >
                                <div className="btn-group" role="group">
                                <button onClick = {(e)=>{handlesubmit(e)}} type="submit" className="btn  btn-outline-success">Aceptar</button>

                                <Link to={'/dashboard'} className="btn btn-outline-danger text-danger">Cancelar</Link>
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