import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [userFullName, setUserFullName] = useState('');
    const [showmenu, setShowMenu] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setShowMenu(false);
        } else {
            setShowMenu(true);
            let userId = localStorage.getItem('userId');
            if (userId === '' || userId === null) {
                usenavigate('/login');
            } else {
                let fullName = localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido');
                setUserFullName(fullName);
            }
        }

    }, [location])
    return (
        <div>
            {showmenu &&
                <div className="header">

                    <Link to={'/dashboard'}>Inicio </Link>
                    <Link to={'/perfil'}>Perfil</Link>
                    <span style={{ marginLeft: '20%' }}>Organizá tu evento <b>{userFullName}</b></span>
                    <Link style={{ float: 'right' }} to={'/login'}>Salir</Link>
                </div>
            }
        </div>
    );
}

export default Appheader;