import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { toast } from "react-toastify";
import { EventContext } from "./EventContext";





const VerEvento = () => {



  const navigate = useNavigate();
  const {eventData, setEventData} = useContext(EventContext);
  const [evento, setEvento] = useState("");
  let token = localStorage.getItem('token');


const handleAgregar = async (e, inv)=>{
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/evento/agregarinvitado/${eventData._id}`,{
        method:'PUT',
        headers:{
          'Authorization': 'bearer' + token,
          'Content-Type': 'application/json', 
          'Accept': 'application/json'
        },
        body: JSON.stringify(inv)
      });
      if (response.status == 201) {
        toast.success('eliminacion exitosa');
      } else {
        toast.error('hubo un error');
      }     
    } catch (error) {
      console.log(error);
      
    }


}
const handleEliminarInv = async (e, inv)=>{
  try {
    /**
     * Un Fetch permite obtener información de una ruta de una API mediante su ruta y 
     * las credenciales solicitadas por la misma.
     */
    const response = await fetch(`${process.env.REACT_APP_API}/evento/eliminarinvitado/${eventData._id}`,{
      method:'PUT',
      headers:{
        'Authorization': 'bearer ' + token,
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
      },
      body: JSON.stringify(inv)
    });
    if (response.status == 201) {
      toast.success('eliminacion exitosa');
    } else {
      toast.error('hubo un error');
    }     
  } catch (error) {
    console.log(error);
    
  }


}
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
    if (evento == "") {
      setEvento(eventData);
      console.log('Evento ==>',evento);
    }


  }, [evento]);

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
                  eventData &&
                  eventData?.lista_invitados?.map((item, key) => (
                    <tr scope="row" key={key}>
                        <td>{item?.invitado?.nombre + " " + item?.invitado?.apellido}</td>
                        <td>{item?.estado}</td>


                        <td>
                            <div className="btn-group" role="group" aria-label="Basic example">
                            {/* Usar Link directamente en lugar de alrededor de un botón */}                                                                             
                                <button type="button" className="btn btn-outline-danger text-dark" onClick = {(e)=>{ handleEliminarInv(e, {invitado:item.invitado._id, estado:item.invitado.estado, _id:item._id}) }}>
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
