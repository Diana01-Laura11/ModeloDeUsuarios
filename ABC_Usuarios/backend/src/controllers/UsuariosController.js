'use strict'
var Usuario = require('../models/Usuarios');


// Objeto para disponer de todos los metodos de ruta (GUARDAR, ENVIAR DATOS, ETC)
var controller = {
    save: (req, res) =>{ // Metodo que guarda los datos

		var params = req.body;
        console.log(params);
		//Objeto a guardar
        var usuario = new Usuario();

        // Asignar valores
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.correo = params.correo;
        usuario.numero = params.numero;

        // Guardamos el nuevo usuario 
        usuario.save((err, usuarioStored) => { // El metodo save de aqui, es propio de Mongoose

            if(err || !usuarioStored){
                return res.status(404).send({
                    status: 'error',
                    message: 'Ha ocurrido un error con la creacion del usuario'
                });
            }
            return res.status(200).send({
                status: 'success',
                usuarioStored
            });
        });
    },
    getUsuarios: (req,res)=>{ // Metodo para poder listar los articulos
        var query = Usuario.find({});
        
        query.sort('-date').exec((err,usuarios) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Ha ocurrido un error en visualizar los usuarios'
                });
            }
            if(!usuarios){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay ningun usuario regitrado'
                });
            }
            return res.status(200).send({
                status: 'success',
                usuarios
            });
        });

    },
    //Metodo para eliminar 
    delete: (req,res) =>{
        var usuarioId = req.params.id; // Tomamos el id a traves del url  
        
        Usuario.findByIdAndDelete(usuarioId,(err,usuarioRemove)=>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Ha ocurrido un error al eliminar un usuario'
                });
            }
            if(!usuarioRemove){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado el usuario'
                });
            }
            return res.status(200).send({
                status: 'success',
                usuario: usuarioRemove
            });
        });
    },
    getUsuario: (req,res) =>{
        var usuarioId = req.params.id;
        console.log(req)
        Usuario.findById({usuarioId}, function (err, Getusuario) {
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Ha ocurrido un error al eliminar un usuario'
                });
            }
            if(!Getusuario){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha encontrado el usuario'
                });
            }
            return res.status(200).send({
                status: 'success',
                usuario: Getusuario
            });
        });
    },

    updateUsuario: (req, res) => {
        
        Usuario.findOneAndUpdate({_id:req.body._id}, {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            numero:req.body.numero
        }, (err) => {
            if (err) {
                res.send("Usuario no actualizado")
            } else {
                res.send("Usuario si actualizado")
            }
        }
            
        )
        // Necesito mas lineas de codigo para poder editar al usuario
    }
}
module.exports = controller;