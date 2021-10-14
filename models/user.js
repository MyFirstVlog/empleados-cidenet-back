const {Schema, model} = require('mongoose')
const  userSchema = Schema ({
    nombre:{
        type : String,
        required : [true, 'El nombre es obligatorio']
    }, 
    correo:{
        type : String,
        required : [true, 'El corres es obligatorio'],
        unique : true
    },
    password:{
        type : String,
        required : [true, 'La contraseña es obligatorio']
    },
    img: {
        type : String
    },
    role:{
        type : String,
        required : true,
        emun : ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type : Boolean,
        default : true,
    },
    google:{
        type : Boolean,
        default : false
    }

})


module.exports = model('User',userSchema)