import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { dbConnection } from "../database/config.js";
import fileUpload from "express-fileupload";

// Rutas
import { routerAuth } from "../routes/auth.js";
import { routerBus } from "../routes/buscar.js";
import { routerCat } from "../routes/categorias.js";
import { routerProd } from "../routes/productos.js";
import { routerUsu } from "../routes/usuarios.js";
import { routerUploads } from "../routes/uploads.js";


dotenv.config({ path: "./.env" });

class Server {
  constructor() {
    this.app = express(); // Creamos en el servidor la app de express como una propiedad del servidor
    this.port = process.env.PORT || 3000;

    this.path = {
      auth:         "/api/auth",
      buscar:       "/api/buscar",
      categorias:   "/api/categorias",
      productos:    "/api/productos",
      usuarios:     "/api/usuarios",
      uploads:      "/api/uploads",
    };

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
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));

    // Aca ponemos el middleware para manejar la carga de archivos
    // Note that this option available for versions 1.0.0 and newer. 
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      // Con la propiedad siguiente lo que hacemos es que si no existe una carpeta donde queremos guardar un archivo, la crea
      createParentPath: true
}));

  }

  routes() {
    // Mis rutas
    this.app.use(this.path.auth, routerAuth);
    this.app.use(this.path.buscar, routerBus)
    this.app.use(this.path.categorias, routerCat);
    this.app.use(this.path.productos, routerProd);
    this.app.use(this.path.usuarios, routerUsu);
    this.app.use(this.path.uploads, routerUploads);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:".green, this.port);
    });
  }
}

export { Server };
