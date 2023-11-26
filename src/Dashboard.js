import { Button } from "bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard =  () => {
    const navigate = useNavigate();
    const [eventList, setEventList] = useState([]);

    let token = localStorage.getItem('token');
    
    fetch(`${process.env.REACT_APP_API}/usuario/eventos`, {
            headers: {
                'Authorization': 'bearer ' + token
            }
        }).then((res) =>{
            eventList();
            return res.json();
        }).then((res=>{
            console.log(res);
            setEventList(res);
        }));
        console.log("estado ==> ",eventList);

    return (
        <div>
            
            <h1 className="text-center">Mis Eventos</h1>
            <div className="card-footer">
                <Link to={'/CrearEvento'} className="btn btn-primary">Crear Evento</Link>
            </div>
                     { <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Lugar</td>
                        <td>Fecha</td>
                        <td>Dirección</td>
                        <td>Hora</td>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        eventList.map(item => (
                            <tr key={item.tematica}>
                                <td>{item.lugar}</td>
                                <td>{item.fecha}</td>
                                <td>{item.direccion}</td>
                                <td>{item.hora}</td>
                            </tr>
                        ))
                    }
                </tbody>
                <thead>
                    <tr>
                        <td>Tematica</td>
                        <td>Lugar</td>
                        <td>Fecha</td>
                        <td>Direccion</td>
                        <td>Hora</td>                        
                    </tr>
                </thead>
                <tbody>
                {
                    
                    eventList.map((val,key)=>{
                        return <tr className="">
                            <td>{val.tematica}</td>
                            <td>{val.lugar}</td>
                            <td>{val.fecha}</td>
                            <td>{val.direccion}</td>
                            <td>{val.hora}</td>
                            </tr>
                    })
                }
                </tbody>
                

            </table> }
        </div>
    );
}

export default Dashboard;