'use strict'

var express = require('express');
var usuario = require('../controllers/UsuariosController');

//Llamara al objeto router de express
var router = express.Router();

//Para guardar los usuarios
router.post('/save',usuario.save);
//Para obtener los usuarios
router.get('/usuarios',usuario.getUsuarios);
//Para eliminar los usuarios
router.delete('/delete/:id',usuario.delete);

module.exports = router;