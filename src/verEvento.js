import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from "react-toastify";
import { EventContext } from "./EventContext";



const VerEvento = () => {
  const navigate = useNavigate();
  const {eventData, setEventData} = useContext(EventContext);
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  let token = localStorage.getItem('token');
  console.log(eventData);
const handleEventos = async ()=> {
  const response = await fetch(`${process.env.REACT_APP_API}/evento/ver/${eventData._id}`,{
    headers: {
      'Authorization': 'bearer ' + token}
   });
   const currentEvent = await response.json();
   if (response.status == 200) {
        setEventData(currentEvent);
   } else {
    toast.success('Evento no existe')
    navigate('/dashboard');
    }

  }

  useEffect(() => { 
    const datosSimulados = {
      tematica: 'Nombre del Evento',
      lugar: 'Ubicación del Evento',
      fecha: 'Fecha del Evento',
      direccion: 'Dirección del Evento',
      hora: 'Hora del Evento',
    };
    setEvento(datosSimulados);
  }, [id]);

  return (
    <div>
      <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Detalle del Evento</h5>
              <div>
                <p>Detalles del Evento</p>
                {eventData ? (
                  <div>
                    <p>Temática: {eventData?.tematica != "" ? eventData?.tematica : ""}</p>
                    <p>Lugar: {eventData?.lugar != "" ? eventData?.lugar : ""}</p>
                    <p>Fecha: {eventData?.fecha != "" ? eventData?.fecha : ""}</p>
                    <p>Dirección: {eventData?.direccion != "" ? eventData?.direccion : ""}</p>
                    <p>Hora: {eventData?.hora != "" ? eventData?.hora : ""}</p>
                  </div>
                ) : (
                  <p>Cargando...</p>
                )}
              </div> 
            </div>
          </div>
        </div>
          <div class="col-sm-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Lista de Invitados</h5>
                <button type="button" className="btn btn-outline-success text-dark btn-sm" >
                Agregar
                </button>
              <div className="containter"> 
            <div>
              <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>                        
                    </tr>
                </thead>
                <tbody>
                {
                eventData.lista_invitados.map((item, key) => (
                    <tr scope="row" key={key}>
                        <td>{item.invitado.nombre + " " + item.invitado.apellido}</td>
                        <td>{item.estado}</td>


                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                            {/* Usar Link directamente en lugar de alrededor de un botón */}                                                                             
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

              </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-sm-6 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Asignaciones</h5>

            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Mensajes</h5>

            </div>
          </div>
        </div>
      </div>
    </div>
    
/*     <div>
      <p>Detalles del Evento</p>
      {eventData ? (
        <div>
          <p>Temática: {eventData?.tematica != "" ? eventData?.tematica : ""}</p>
          <p>Lugar: {eventData?.lugar != "" ? eventData?.lugar : ""}</p>
          <p>Fecha: {eventData?.fecha != "" ? eventData?.fecha : ""}</p>
          <p>Dirección: {eventData?.direccion != "" ? eventData?.direccion : ""}</p>
          <p>Hora: {eventData?.hora != "" ? eventData?.hora : ""}</p>
        </div>

      ) : (
        <p>Cargando...</p>
      )}
    </div> */
  );
};

export default VerEvento;
