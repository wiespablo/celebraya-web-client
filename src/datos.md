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