const {response, request} = require('express') // esto es para poder tener los metodos del res, sin esto no aparecen 
const bcryptjs = require('bcryptjs')
const User = require('../models/user') // U mayuscula para crear instancias del modelo es estandar




const usuariosGET = (req = request, res = response) => { 
    const {nombre,apellido,edad} = req.query
    res.json(
        {
            msg: 'get API - controller',
            nombre,
            apellido,
            edad
        }
    )
}

const usuariosPOST = async(req, res = response) => { 

    const {nombre,correo,password,role} = req.body 
    const usuario = new User({nombre,correo,password,role})

    //verificar si el correo existe
    const existeEmail = await User.findOne({correo})
    if(existeEmail){
        return res.status(404).json({
            msg:"email already registered"
        })
    }
    //hash de la contraseña 
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password,salt)
    //Guargar en db
    await usuario.save()

    res.json(
        {
            msg: 'post API - controller',
            usuario
        }
    )
}

const usuariosPUT = (req, res = response) => { 

    const idURL = req.params.id
    res.json(
        {
            msg: 'put API - controller',
            idURL
        }
    )
}

const usuariosDELETE = (req, res = response) => { 
    res.json(
        {
            msg: 'delete API - controller'
        }
    )
}
const usuariosPATCH = (req, res = response) => { 
    res.json(
        {
            msg: 'patch API - controller'
        }
    )
}

module.exports= {
    usuariosGET,
    usuariosPATCH,
    usuariosDELETE,
    usuariosPOST,
    usuariosPUT
}