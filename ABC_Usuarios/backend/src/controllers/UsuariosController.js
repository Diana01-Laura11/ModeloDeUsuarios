'use string'
var Usuario = require('../models/Usuarios');

var controller = {
    save: (req, res) =>{

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
        usuario.save((err, usuarioStored) => {

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
    getUsuarios: (req,res)=>{
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
        var usuarioId = req.params.id;
        
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
        Usuario.findById({_id:usuarioId},(err,Getusuario)=>{
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
    }
}
module.exports = controller;