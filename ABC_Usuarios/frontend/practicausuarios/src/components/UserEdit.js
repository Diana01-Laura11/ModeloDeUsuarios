import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Global from "../Global";

const UserEdit = () =>{
    const params = useParams();
    
/*
    const[nombre, setNombre]=useState('');
    const[apellido,setApellido]=useState('');
    const[correo,setCorreo]=useState('');
    const[telefono,setTelefono]=useState('');
*/
    useEffect(() =>{
        const url = Global.url;
        const ID=params.id;
        axios.get(url + 'usuario/'+ID).then(res =>{
            console.log(res.data[0]);
            
        })
    },[]);
    
    return(
        <div>
            <h2>Editar Usuarios</h2>
            <h3>El ID del usuarios es: {params.id}</h3>
        </div>
    );
}

export default UserEdit;