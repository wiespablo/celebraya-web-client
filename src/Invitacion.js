import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "bootstrap";

const Invitacion = () => {

    const [userId, setuserId] = useState("");
    const [usuario, setUsuario] = useState("");
    const [evento, setEvento] = useState("");



    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Por favor ingrese el valor en ';
        if (userId === null || userId === '') {
            isproceed = false;
            errormessage += ' userId';
        }
        if (usuario === null || usuario === '') {
            isproceed = false;
            errormessage += ' Usuario';
        }
        if (evento === null || evento === '') {
            isproceed = false;
            errormessage += ' Evento';
        }
   
        return isproceed;
    }

    let token = localStorage.getItem('token');
    

    const handlesubmit = (e) => {
            e.preventDefault();
            let regobj = { userId, usuario, evento};
            if (IsValidate()) {
            console.log(regobj);
            fetch(`${process.env.REACT_APP_API}/usuario/invitaciones`, {
                method: "POST",
                headers:{  
                    'content-type': 'application/json',
                    'Authorization': 'bearer ' + token
                },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registro Exitoso')
                navigate('/Invitacion');
            }).catch((err) => {
                toast.error('Failed :' + err.message);
            });
        }
    }
    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Lista de Invitados</h3>
                </div>
                <div className="card-body">
                    <button onClick={handleadd} className="btn btn-success">Agregar Invitado (+)</button>
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Id</th>
                                <th>Usuario</th>
                                <th>Evento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map(item => (
                                    <tr key={item.userId}>
                                        <td>{item.usuario}</td>
                                        <td>{item.evento}</td>
                                        <td>
                                            <button onClick={handleedit} className="btn btn-primary">Editar</button> |
                                            <button onClick={handleremove} className="btn btn-danger">Eliminar</button>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Invitacion;