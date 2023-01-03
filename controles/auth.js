import { response } from "express";
import bcryptjs from 'bcryptjs'
import Usuario from "../models/usuario.js";
import { generarJWT } from "../helpers/generar-jwt.js";

export { login };

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el correo existe
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/Password no son correctos - correo",
      });
    }

    // Verificar si el usuario esta activo
    if (!usuario.estado) {
        return res.status(400).json({
          msg: "Usuario/Password no son correctos - estado: false",
        });
      }

    // Verificar el password
    const validPassword = bcryptjs.compareSync(password, usuario.password)
      if (!validPassword) {
        return res.status(400).json({
            msg: "Usuario/Password no son correctos - password",
          });
      }

    // Generar JWT -- Recordadr instalar npm i jsonwebtoken
    const token = await generarJWT( usuario.id );


    res.json({
      usuario,
      token
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
