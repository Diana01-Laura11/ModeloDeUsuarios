import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Global from "../Global";
import '../assets/estilos/UserEdit.css'
import { Navigate, redirect } from "react-router-dom";

const UserEdit = () =>{
    const params = useParams();
    const url= Global.url;
    const id=params.id;

    console.log(url)

    const [usuario,setUsuario]= useState({
        nombre: null,
        apellido: null,
        correo: null,
        numero: null,
    });

    const [redirect,setRedirect] = useState(false);

    const[usuarios, setUsuarios] = useState([])

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

    console.log(usuario)
/*  
    const[nombre, setNombre]=useState('');
    const[apellido,setApellido]=useState('');
    const[correo,setCorreo]=useState('');
    const[telefono,setTelefono]=useState('');
*/
    useEffect(() =>{
        getUsuarios();
    },[usuarios.length]);

    const getUsuarios = () => {
        axios.get(url + 'usuarios').then(res => {
            const dataUsuarios = res.data.usuarios
            setUsuarios(dataUsuarios);

            dataUsuarios.map( (dataUsuario) => {
                if (dataUsuario._id == id) {
                    nombreRef.current.value = dataUsuario.nombre;
                    apellidoRef.current.value = dataUsuario.apellido;
                    emailRef.current.value = dataUsuario.correo;
                    numeroRef.current.value = dataUsuario.numero;
                    changeState();
                }
            } )
        })
    }

    const sendData = (e) =>{
        //editamos que al recibir los datos se recargue la pantalla 
        e.preventDefault();
        changeState();

        const actualizar = {...usuario, _id: id}
        //changeState();
        //peticion HTTP con POST para guardar el usuario
        //axios.post(url + 'save', usuario).then(res =>{
          //  setRedirect(true);
            ///console.log(res.data);
        //})
        console.log(actualizar)

        axios.put(url + 'update', actualizar).then(res => {
            setRedirect(true)
            console.log(res.data)
        })
    }
    
    return(
        <div className="contenedor">
            <h2 className="Titulo">Editar Datos</h2>
            <form onSubmit={sendData}>
                <label className="titulo2">Nombre</label>
                <input type="text" className="entrada" id="nombre" name="nombre" ref={nombreRef} onChange={changeState} required/>
                <label className="titulo2">Apellido</label>
                <input type="text" className="entrada" id="apellido" name="apellido" ref={apellidoRef} onChange={changeState} required/>
                <label className="titulo2">Correo electronico</label>
                <input type="text" className="entrada" id="email" name="email" ref={emailRef} onChange={changeState}  required/>
                <label className="titulo2">Numero de telefono</label>
                <input type="text" className="entrada" id="numero" name="numero" ref={numeroRef} onChange={changeState}  required/>
                <input type="submit" className="btn" id="guardar" name="guardar" value="Guardar Cambios"/>
            </form>
        </div>
    );
}

export default UserEdit;