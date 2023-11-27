import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard =  () => {
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



/*
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
                            <td>Editar</td>
                            <td>Eliminar</td>
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
                                    <td><button disabled ={ item.anfitrion == userId ? false : true} >ok</button></td>
                                    <td><button>ok</button></td>
                                    

                                </tr>
                            ))
                        }
                    </tbody>

                </table> }
        </div>


*/
    <div className="containter">
    
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
                        <td><button disabled ={ item.anfitrion == userId ? false : true} >editar</button></td>
                        <td><button>eliminar</button></td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    </div>

    );
}

export default Dashboard;