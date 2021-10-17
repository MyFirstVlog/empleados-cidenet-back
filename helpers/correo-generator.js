const { v1: uuidv1 } = require('uuid');
const User = require('../models/user')

const generarCorreo = async(pais = 'CO') =>{
    let correo = ''

    if (pais === 'CO') {
        const id = uuidv1().split('-')
        correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.co`
        const usuario = await User.findOne({ correo })
        if (usuario) {
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.co`
            return correo
        }
        return correo
    } else {
        const id = uuidv1().split('-')
        correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.us`
        const usuario = await User.findOne({ correo })
        if (usuario) {
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.us`
            return correo
        }
        return correo
    }
}


module.exports = generarCorreo