import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export const Menu = () => {
    const auth = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="btn btn-outline-danger" onClick={auth.logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span> Salir</span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/home/Sales">
                                Gestion de ventas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/home/Products">
                                Gestion de productos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/home/User">
                                Gestion de Usuarios y Roles
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
