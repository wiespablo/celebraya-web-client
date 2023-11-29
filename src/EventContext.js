import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';


export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState();//useState es la declaración de una variabla, con su método set para 
  //modificar su valor.
  console.log('Desde el contexto ==>', eventData);
  useEffect(() => {//el useEffect sirve para controlar el estado de las variables.
    let currentEvent = localStorage.getItem('currentEvent');
      if (typeof eventData != 'undefined') {
        localStorage.setItem('currentEvent', JSON.stringify(eventData));
      } 
        else { 
        console.log('currentEvent ==>', currentEvent );
        console.log('if ', JSON.stringify(eventData) != currentEvent );
        console.log('tipo currentData', typeof currentEvent);
        console.log('tipo eventData', typeof eventData);

        if (JSON.stringify(eventData) != currentEvent) {
          localStorage.setItem('currentEvent', JSON.stringify(eventData));
        } 
    }
  }, [eventData])
  
  return (
    <EventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);

};
