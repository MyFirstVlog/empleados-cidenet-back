

const {Router} = require('express')
const {check} = require('express-validator')
const { usuariosGET, usuariosPUT, usuariosPOST, usuariosDELETE, usuariosPATCH } = require('../controllers/users')
const { existeUsuarioPorID } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const Role = require('../models/role')

const router = Router()

//aqui solo  deberia la ruta, por buenas practicas el controlador deberia estar en otro archivo
router.get('/', usuariosGET ) // no se pone () en usuariosGET porque no lo estoy ejecutando la estoy la estoy referenciando
router.put('/:id',usuariosPUT)
//los checks son middlewares de verificacion,(recordar que tiene el next que hace pasar de middleware)
//el validorCampos, si no paso no llega si quiera a ejecutar el callback del post
router.post('/',[
    
    check('primerNombre', 'el nombre es obligatorio').not().isEmpty(),
    check('primerNombre', 'el nombre debe tener maximo 20 caracteres').isLength({max:20}),

    check('primerApellido', 'el primer apellido es obligatorio').not().isEmpty(),
    check('primerApellido', 'el primer apellido debe tener maximo 20 caracteres').isLength({max:20}),

    check('segundoApellido', 'el segundo apellido es obligatorio').not().isEmpty(),
    check('segundoApellido', 'el segundo pellido debe tener maximo 20 caracteres').isLength({max:20}),

    check('otroNombre', 'el otro nombre debe tener maximo 50 caracteres').isLength({max:50}),

    check('pais', 'el pais es obligatorio').not().isEmpty(),


    check('tipoID', 'el tipoID es obligatorio').not().isEmpty(),
    
    check('numero', 'el tipoID es obligatorio').not().isEmpty(),
    check('numero', 'La ID debe tener minimo 6 caracteres').isLength({min:6}),
    check('numero').custom((numero)=>existeUsuarioPorID(numero)),
    

    check('fechaDeIngreso', 'el tipoID es obligatorio').not().isEmpty(),
    check('area', 'el tipoID es obligatorio').not().isEmpty(),
    check('fechaDeRegistro', 'el tipoID es obligatorio').not().isEmpty(),

    validarCampos

] 
, usuariosPOST)
router.delete('/:id',[
    check('id', 'No es un id Valido').isMongoId(),
    check('id').custom((id)=> existeUsuarioVerificacion(id))

], usuariosDELETE)


module.exports = router


/***
 * 
 * check('role').custom(async(rol='') => {
        const existeRol = await Role.findOne({rol})
        if(!existeRol){
            throw new Error(`El rol: ${rol} no esta definido en la base de datos`)
        }
    }),


    
    //check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']), -> se debe validar sobre una lista dinamica en una db
 */