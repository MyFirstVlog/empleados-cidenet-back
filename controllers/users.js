const {response, request} = require('express') // esto es para poder tener los metodos del res, sin esto no aparecen 
const bcryptjs = require('bcryptjs')
const User = require('../models/user') // U mayuscula para crear instancias del modelo es estandar
const { v1: uuidv1 } = require('uuid');



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
    let correo = ''
    const {primerNombre,primerApellido,
        segundoApellido,otroNombre
          ,pais,tipoID,numero
          ,fechaDeIngreso,area,fechaDeRegistro
          } = req.body 

    

    if(pais==='CO'){
        const id = uuidv1().split('-')    
        correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.co`
        const usuario = await User.findOne({correo})
        if(usuario){
            correo=`${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.co`
        }
    }else{
        const id = uuidv1().split('-')    
        correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}@cidenet.com.us`
        const usuario = await User.findOne({correo})
        if(usuario){
            correo = `${primerNombre.replace(/ /g, "")}.${primerApellido.replace(/ /g, "")}.${id[0]}@cidenet.com.us`
        }
    }

    const user = new User({primerNombre,primerApellido,
        segundoApellido,otroNombre
          ,correo,pais,tipoID,numero
          ,fechaDeIngreso,area,fechaDeRegistro
          })

    

    user.save()
    
    res.json(
        {
            msg: 'post API - controller',
            user
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