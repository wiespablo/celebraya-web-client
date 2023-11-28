import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { EventContext } from "./EventContext";

const VerEvento = () => {
  const {eventData, setEventData} = useContext(EventContext);
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  let token = localStorage.getItem('token');
  console.log(eventData);
  useEffect(() => {
    // Aquí deberías hacer una llamada a la API para obtener los detalles del evento con el ID proporcionado
    // Puedes usar fetch o cualquier biblioteca para manejar solicitudes HTTP

    // Ejemplo de estructura de la llamada a la API (reemplaza esto con tu lógica real):
     fetch(`${process.env.REACT_APP_API}/evento/ver/${eventData._id}`,{
      headers: {
        'Authorization': 'bearer ' + token
    }
     })
       .then((response) => response.json())
       .then((data) => setEvento(data));

    // En este ejemplo, solo estoy usando datos simulados para demostrar la estructura.
    // Reemplaza esta lógica con la llamada real a tu API.
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
      <h1>Detalles del Evento</h1>
      {evento ? (
        <div>
          <p>Temática: {evento.tematica}</p>
          <p>Lugar: {evento.lugar}</p>
          <p>Fecha: {evento.fecha}</p>
          <p>Dirección: {evento.direccion}</p>
          <p>Hora: {evento.hora}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default VerEvento;
