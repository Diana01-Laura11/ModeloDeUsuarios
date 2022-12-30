import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/imagenes/ballena-azul.png';
import '../assets/estilos/Header.css';
const Header = () =>{
    return(
        <nav className='menu'>
            <img className='logo' src={logo} width="80"/>
            <h4 className='nav-item'>
                <NavLink to="/" className='navbar-link'>Agregar</NavLink>
            </h4>
            <h4 className='nav-item'>
                <NavLink to="usuarios" className='navbar-link'>Ver Usuarios</NavLink>
            </h4>
        </nav>
    );
}

export default Header;