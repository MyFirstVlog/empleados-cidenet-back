const User = require("../models/user")



const existeUsuarioPorID = async (numeroID = '') => {
    const usuario = await User.findOne({numeroID})
    if(usuario){
        throw new Error(`El usuario con id: ${numeroID} ya se encuentra registrado`)
    }
}

module.exports = {
    existeUsuarioPorID
}