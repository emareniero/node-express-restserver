import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const dbConnection = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useCreateIndex: true
    }); // Dejamos el await para esperar que la conexion se haga y si no se hace arroje el error!

    console.log('Base de datos online!');

  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar la base de datos!");
  }
};

export { dbConnection };
