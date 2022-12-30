'use strict'
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Usuario= new Schema ({
    nombre: String,
    apellido: String,
    correo: String,
    numero: String,
    fecha:  {type:Date, default: Date.now}
});

module.exports = mongoose.model('Usuario',Usuario);
