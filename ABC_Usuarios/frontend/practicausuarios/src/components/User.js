import React from "react";
import { Link } from "react-router-dom";
import '../assets/estilos/Users.css';
const User = ({id,usuarioData,delUsuario}) =>{
    
    const {_id,nombre, apellido, correo, numero, fecha} =usuarioData;
    const formatDate = (fecha) =>{
        return fecha.substring(8,10) + fecha.substring(4,8) + fecha.substring(0,4);
    }
    const del = () =>{
        delUsuario(id);
    }
    return(
        <tr className="subtitulo">
            <td>{nombre}</td>
            <td>{apellido}</td>
            <td>{correo}</td>
            <td>{numero}</td>
            <td className="fecha">{formatDate(fecha)}</td>
            <td>
                <button className="eliminar" type="button" onClick={del}>Eliminar</button>
            </td>
            <td>
                <Link to={`/uptade/${_id}`}><li className="editar">Editar</li></Link>
            </td>
        </tr>
    );
}
export default User;