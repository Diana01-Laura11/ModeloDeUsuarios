import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Global from '../Global';
import User from './User';
import '../assets/estilos/Users.css';
import imagen from '../assets/imagenes/juventud.png';
 
const Users = () =>{

    const[usuarios, setUsuarios] = useState([]);
    const url = Global.url;
    //se obtiene todos los articulos 
    
    useEffect(() => {
       getUsuarios();
        console.log(usuarios);
    }, [usuarios.length]);

    const getUsuarios = () => {
        axios.get(url + 'usuarios').then(res => {
            setUsuarios(res.data.usuarios);
            console.log(res.data.usuarios);
        });
    }
    //Se elimina un usuario  con su id
    const deleteUsuario = (id) => {
        const idUser = usuarios[id]._id;
        axios.delete(url+'delete/'+idUser).then(res =>{
            getUsuarios();
        });
    }
    
    return(
        <div className="contenedor">
            <h2 className="titulo">Lista de usuarios</h2>
            <table class="tabla">
                <tr className='titulo-tabla'>
                    <td >Nombre</td>
                    <td >Apellido</td>
                    <td >Correo Electronico</td>
                    <td >Numero de Telefono</td>
                    <td >Fecha</td>
                    <td></td>
                    <td></td>
                </tr>
                {
                    usuarios.length > 0 ? (
                        usuarios.map((usuario,i) =>{
                            return(
                                <User
                                    key={i}
                                    id={i}
                                    usuarioData = {usuario}
                                    delUsuario = {deleteUsuario}
                                />
                            );
                        })
                    ):(
                        <h1 className='Vacio'>No hay usuarios que mostrar</h1>
                    )}
            </table>
            <div className='imagen'>
                <img className='imagen' align="right" src={imagen} width="300"/>
            </div>
        </div>
    );
}

export default Users;