Casos de Uso:
- Registrar Usuario
- Login
- Crear Evento
- Modificar Evento
- Eliminar Evento
- Eliminar Invitado
- Buscar Usuario
- Ver Eventos
- Ver un Evento













































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
                


#######para desabilitar boton y que no acceda si no es anfitrion
                        <td><button disabled ={ item.anfitrion == userId ? false : true} >editar</button></td>


#######Rutas

router.post('/register', userController.register)
router.post('/login', userController.login)
router.put('/usuario/actualizar-password', userMiddleware, userController.updatePass);
router.post('/usuario/buscar', userMiddleware, userController.search);
router.get('/usuario/eventos', userMiddleware, eventoController.misEventos );
router.get('/usuario/invitaciones', userMiddleware, userController.invitaciones );
router.post('/usuario/confirmar:eventId', userMiddleware, userController.confirmarInvitacion );
router.post('/evento/crear', userMiddleware, eventoController.register);
router.get('/evento/ver/:id', userMiddleware, eventoController.verEvento );
router.get('/evento/asignaciones/:id', userMiddleware, eventoController.verAsignaciones );
router.post('/evento/eliminar/:id', userMiddleware, eventoController.eliminar );



#### lo que sobraba del fetch

       .then((response) => {
        if(!response.ok){
          throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        } 
        return response.json();
      })
       .then((data) => setEvento(data))
       .catch((error)=> {
         console.error('Error al procesar la respuesta del servidor: ', error);
         return response.text();
       })
       .then((text)=> console.error('Respuesta del servidor: ', text));

       ##
       Persistencia en el almacenamiento local:

Almacena la información clave en el almacenamiento local (localStorage) para que pueda persistir incluso después de recargar la página. Esto significa que cuando la aplicación se carga, puedes verificar si hay datos en el almacenamiento local y, en caso afirmativo, inicializar el contexto con esos datos.
jsx
Copy code
// Al cargar la aplicación
useEffect(() => {
  const storedEventData = localStorage.getItem('eventData');
  if (storedEventData) {
    setEventData(JSON.parse(storedEventData));
  }
}, []);

// En cualquier lugar donde actualices eventData
setEventData(newEventData);
localStorage.setItem('eventData', JSON.stringify(newEventData));
Recuperación de datos del servidor:

Cuando recargas la página, puedes hacer una solicitud al servidor para recuperar los datos necesarios y luego actualizar el contexto con esos datos.
jsx
Copy code
// Al cargar la aplicación
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/ruta-de-datos`, {
        headers: {
          Authorization: 'bearer ' + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEventData(data);
      } else {
        // Manejar el error según sea necesario
      }
    } catch (error) {
      console.error('Error al recuperar datos del servidor:', error);
    }
  };

  fetchData();
}, []);
El enfoque que elijas depende de la naturaleza de tu aplicación y de cómo desees manejar la persistencia de datos a través de recargas de página.