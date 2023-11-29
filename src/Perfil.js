import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Perfil = () => {
    const [custlist, custupdate] = useState([]);
    const [haveedit, editchange] = useState(false);
    const [haveview, viewchange] = useState(false);
    const [haveadd, addchange] = useState(false);
    const [haveremove, removechange] = useState(false);

    const navigate=useNavigate();

    let token = localStorage.getItem('token');

    useEffect(() => {

       
    }, []);
    

    const handleedit = () => {

    }
    return (
        <div className="container">

            <div className="card">
                <div className="card-header">
                    <h3>Datos Personales</h3>
                </div>
                <div className="card-body">
                    <br></br>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {custlist &&
                                custlist.map(item => (
                                    <tr key={item.nombre}>
                                        <td>{item.email}</td>
                                        <td>{item.telefono}</td>
                                        <td>
                                            <button onClick={handleedit} className="btn btn-primary">Editar</button> |
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

export default Perfil;