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
                
