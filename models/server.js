import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { routerUsu } from "../routes/usuarios.js";
import { dbConnection } from "../database/config.js";
import { routerAuth } from "../routes/auth.js";

dotenv.config({ path: "./.env" });

class Server {
  constructor() {
    this.app = express(); // Creamos en el servidor la app de express como una propiedad del servidor
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios';
    this.authPath = '/api/auth';
    
    // Conenctar la base de datos cuando se crea el servidor
    this.conectarDB();

    // Middlewares son funciones que agregan funciones que se ejecutan cuando se levanta el servidor
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  async conectarDB() {
    // Aca podriamos mirar la en process.env si estamos en desarrollo o produccion y elegir la base de datos pertinente
    await dbConnection();
  }

  middlewares() {
    // Uso del CORS
    this.app.use(cors()); // Es un middlewear porque usa el use!

    // Lectura y parseo del body
    this.app.use( express.json() )

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    // Mis rutas
    this.app.use(this.authPath, routerAuth)
    this.app.use(this.usuariosPath, routerUsu);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

export { Server };
