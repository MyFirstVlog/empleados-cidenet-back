const { response, request } = require('express') // esto es para poder tener los metodos del res, sin esto no aparecen 
const bcryptjs = require('bcryptjs')
const User = require('../models/user') // U mayuscula para crear instancias del modelo es estandar
const { v1: uuidv1 } = require('uuid');



const usuariosGET = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query

    const [total, usuarios] = await Promise.all([
        User.countDocuments({ estado: true }),
        User.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json(
        {
            total,
            usuarios
        }
    )
}

const usuariosPOST = async (req, res = response) => {
    let correo = ''
    const { primerNombre, primerApellido,
        segundoApellido, otroNombre
        , pais, tipoID, numero
        , fechaDeIngreso, area, fechaDeRegistro
    } = req.body



    if (pais === 'CO') {
        const id = uuidv1().split('-')
        correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.co`
        const usuario = await User.findOne({ correo })
        if (usuario) {
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.co`
        }
    } else {
        const id = uuidv1().split('-')
        correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.us`
        const usuario = await User.findOne({ correo })
        if (usuario) {
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.us`
        }
    }

    const user = new User({
        primerNombre, primerApellido,
        segundoApellido, otroNombre
        , correo, pais, tipoID, numero
        , fechaDeIngreso, area, fechaDeRegistro,
        fechaDeEdicion : new Date().toISOString().slice(0, 10),
    })



    user.save()

    res.json(
        {
            msg: 'post API - controller',
            user
        }
    )
}

const usuariosPUT = async (req, res = response) => {
    let correo = ''
    const { id } = req.params
    const {fechaDeRegistro,primerNombre,primerApellido,pais, ...resto} = req.body

    const usuarioVerificacion = await User.findOne({numero : id})

    if(primerNombre !== usuarioVerificacion.primerNombre || primerApellido !== usuarioVerificacion.primerApellido ){
        if (pais === 'CO') {
            const id = uuidv1().split('-')
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.co`
            const usuario = await User.findOne({ correo })
            if (usuario) {
                correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.co`
            }
        } else {
            const id = uuidv1().split('-')
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.us`
            const usuario = await User.findOne({ correo })
            if (usuario) {
                correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.us`
            }
        }
    }

    const usuarioUpdated = {
        primerNombre,
        primerApellido,
        fechaDeEdicion : new Date().toISOString().slice(0, 10),
        pais,
        correo,
        ...resto
    }

    const usuarioActualizar = await User.findOneAndUpdate({numero:id}, usuarioUpdated)


    res.json(
        {
            msg: 'put API - controller',
            usuarioActualizar
        }
    )
}

const usuariosDELETE = async (req, res = response) => {

    const { id } = req.params

    const usuario = await User.findOneAndUpdate({ numero: id }, { estado: false })

    res.json({
        msg: "Usuario Eliminado",
        usuario
    })


    res.json(
        {
            msg: 'delete API - controller'
        }
    )
}

module.exports = {
    usuariosGET,
    usuariosDELETE,
    usuariosPOST,
    usuariosPUT
}