import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EventContext } from "./EventContext";
import { useContext } from "react";



const Dashboard =  () => {
    const {setEventData} = useContext(EventContext);
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([]);
    const [userId, setUserId] = useState('');
    let token = localStorage.getItem('token');

    const handleEventos = ( )=>{
        fetch(`${process.env.REACT_APP_API}/usuario/eventos`, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            })
                .then((res) =>{
                return res.json();
            })
                .then((res=>{
                console.log(res);
                setEventList(res);
            }));

    }
    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
        if (eventList.length == 0) {
            console.log();
            handleEventos();    
        }
    }, [eventList])
    
    return (

    <div className="containter">
        <h1 className="text-center">Mis Eventos</h1>
        <div className="card-footer text-center">
            <Link to={'/CrearEvento'} className="btn btn-primary">Crear Evento</Link>
        </div>    
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Temática</th>
                    <th scope="col">Lugar</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Hora</th>
                    </tr>
                </thead>
                <tbody>
                {
                eventList.map((item, key) => (
                    <tr scope="row" key={key}>
                        <td>{item.tematica}</td>
                        <td>{item.lugar}</td>
                        <td>{item.fecha}</td>
                        <td>{item.direccion}</td>
                        <td>{item.hora}</td>
                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                            {/* Usar Link directamente en lugar de alrededor de un botón */}
                            {console.log(item.id)}
                                <Link onClick={()=> { setEventData(item)} } to={`/verEvento`} className="btn btn-outline-success text-dark">
                                Ver
                                </Link>
                                
                           
                                <Link to={`/editarEvento/${item.userId}`} className="btn btn-outline-warning text-dark">
                                Editar
                                </Link>
                                
                                <button type="button" className="btn btn-outline-danger text-dark">
                                Eliminar
                                </button>
                            </div>
                        </td>   
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    </div>

    );
}

export default Dashboard;