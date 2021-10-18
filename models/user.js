const {Schema, model} = require('mongoose')
const  userSchema = Schema ({
    primerNombre:{
        type : String,
        required : [true, 'El primer nombre es obligatorio']
    }, 
    primerApellido:{
        type : String,
        required : [true, 'El primer apellido es obligatorio']
    }, 
    segundoApellido:{
        type : String,
        required : [true, 'El segundo apellido obligatorio']
    }, 
    otroNombre:{
        type : String,
    }, 
    pais:{
        type : String,
        required : [true, 'Debe ser Colombia o USA']
    }, 
    tipoID:{
        type : String,
        required : [true, 'El tipo de documento legal es obligatorio']
    }, 
    numero:{
        type : String,
        required : [true, 'El numero de identificación es obligatorio']
    }, 
    correo:{
        type : String,
        unique : true
    },
    fechaDeIngreso:{
        type: String,
        required : [true, "Fecha de ingreso obligatoria"]
    },
    area:{
        type: String,
        required : [true, "Area de trabajo obligatoria"]
    },
    estado:{
        type : Boolean,
        default : true,
    },
    fechaDeRegistro:{
        type: String,
        required : [true, "Fecha de registro no esta siendo enviado por front-end"]
    },
    fechaDeEdicion:{
        type: String,
        
    },

})


module.exports = model('User',userSchema)