const User = require("../models/user")



const existeUsuarioPorID = async (numeroID = '') => {
    const usuario = await User.findOne({numero: numeroID})
    if(usuario){
        throw new Error(`El usuario con id: ${numeroID} ya se encuentra registrado `)
    }
}

const existeUsuarioVerificacion = async (numeroID = '') => {
    const usuario = await User.findOne({numero: numeroID})
    if(!usuario){
        throw new Error(`El usuario con id: ${numeroID} no se encuentra registrado `)
    }
}

module.exports = {
    existeUsuarioPorID,
    existeUsuarioVerificacion
}