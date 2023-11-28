import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    console.log('eventData context', eventData);

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
