import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard =  () => {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([]);

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
        if (eventList.length == 0) {
            console.log();
            handleEventos();    
        }
    }, [eventList])
    
    return (
        <div>
            
            <h1 className="text-center">Mis Eventos</h1>
            <div className="card-footer">
                <Link to={'/CrearEvento'} className="btn btn-primary">Crear Evento</Link>
            </div>
                { <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Tematica</td>                        
                            <td>Lugar</td>
                            <td>Fecha</td>
                            <td>Dirección</td>
                            <td>Hora</td>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(eventList)}
                        {
                            eventList.map((item, key) => (
                                <tr key={key}>
                                    <td>{item.tematica}</td>
                                    <td>{item.lugar}</td>
                                    <td>{item.fecha}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.hora}</td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table> }
        </div>
    );
}

export default Dashboard;