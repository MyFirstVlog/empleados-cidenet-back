const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutes = '/api/users'

        //Conectar a base de datos
        this.dbConnection()
        //Middlewares funcion que siempre se ejecuta cuando levantemos el servidor
        this.middlewares()
        //Rutas de mi app
        this.routes()
    }

    middlewares(){ //Middlewares funcion que siempre se ejecuta cuando levantemos el servidor
        
        //Lectura y parseo del body
        this.app.use(express.json())

        //cors
        this.app.use(cors())
        
        //Directorio publico
        this.app.use(express.static('public'))

    }

    routes(){
        this.app.use(this.usersRoutes, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening at http://localhost:${this.port}`)
          })
    }

    async dbConnection() {
        await dbConnection()
    }
}

module.exports = Server