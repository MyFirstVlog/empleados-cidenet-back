const { response } = require("express");
const {ObjectId} = require('mongoose').Types

const User = require('../models/user')

let usuarios 
const filtrosPermitidos = [
    'primerNombre',
    'otroNombre',
    'primerApellido',
    'segundoApellido',
    'tipoID',
    'numero',
    'pais',
    'correo',
    'estado'
]

const buscarFiltro = async (coleccion = '' ,termino = '' ,res = response) => {
    
    const regexp = new RegExp(termino, 'i')
    console.log((regexp.toString().split('/')[1]==='true'))

    switch (coleccion) {
        case 'primerNombre':
            usuarios = await User.find({
                $or : [
                    {primerNombre : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'otroNombre': 
             usuarios = await User.find({
                $or : [
                    {otroNombre : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'primerApellido': 
             usuarios = await User.find({
                $or : [
                    {primerApellido : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'segundoApellido': 
             usuarios = await User.find({
                $or : [
                    {segundoApellido : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'tipoID': 
             usuarios = await User.find({
                $or : [
                    {tipoID : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'numero': 
             usuarios = await User.find({
                $or : [
                    {numero : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'pais': 
             usuarios = await User.find({
                $or : [
                    {pais : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'correo': 
             usuarios = await User.find({
                $or : [
                    {correo : regexp},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        case 'estado': 
             usuarios = await User.find({
                $or : [
                    {estado : (regexp.toString().split('/')[1]==='true')},
                ]
            })
        
            res.json({
                results: usuarios
            })
            break;
        default:
            return res.status(500).json({
                msg : 'olvide hacer esta busqueda'
            })
    }
    
}


const buscar = (req, res = response) => {

    const {coleccion, termino}= req.params
    if(!filtrosPermitidos.includes(coleccion)){
        return res.status(400).json({
            msg : `Los filtros permitidos son: ${filtrosPermitidos}`
        })
    }

    try {
        buscarFiltro(coleccion,termino,res)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    buscar
}

