import React, { useState } from "react";
import '../assets/estilos/CreateUser.css';
import imagen2 from '../assets/imagenes/anadir-grupo.png';
import axios from 'axios';
import { Navigate, redirect } from "react-router-dom";
import Global from '../Global';
const CreateUser = () =>{
    const url= Global.url;
    const [usuario,setUsuario]= useState({
        nombre: null,
        apellido: null,
        correo: null,
        numero: null,
    });

    const [redirect,setRedirect] = useState(false);

    //Referencia de los datos del formulario
    let nombreRef = React.createRef();
    let apellidoRef = React.createRef();
    let emailRef = React.createRef();
    let numeroRef = React.createRef();

    const changeState = () =>{
        setUsuario({
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value,
            correo: emailRef.current.value,
            numero: numeroRef.current.value
        });
        console.log(usuario);
    }
    const sendData = (e) =>{
        //evitamos que al recibir los datos se recargue la pantalla 
        e.preventDefault();
        changeState();
        //peticion HTTP con POST para guardar el usuario
        axios.post(url + 'save', usuario).then(res =>{
            setRedirect(true);
            console.log(res.data);
        })
    }

if(redirect){
    return <Navigate to="usuarios" />
}

    return(
        <div>
        <div className="contenedor">
            <h2 className="Titulo">Agregar un nuevo usuario</h2>
            <form onSubmit={sendData}>
                <label className="titulo2">Nombre</label>
                <input type="text" className="entrada" id="nombre" name="nombre" ref={nombreRef} onChange={changeState} required/>
                <label className="titulo2">Apellido</label>
                <input type="text" className="entrada" id="apellido" name="apellido" ref={apellidoRef} onChange={changeState} required/>
                <label className="titulo2">Correo electronico</label>
                <input type="text" className="entrada" id="email" name="email" ref={emailRef} onChange={changeState} required/>
                <label className="titulo2">Numero de telefono</label>
                <input type="text" className="entrada" id="numero" name="numero" ref={numeroRef} onChange={changeState} required/>
                <input type="submit" className="btn" id="enviar" name="enviar" value="Agregar"/>
            </form>
        </div>
        <div className="imagen">
        <img className='imagen' src={imagen2} width="300"/>
        </div>
        </div>
    );

}
export default CreateUser;