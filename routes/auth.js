import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controles/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

export const routerAuth = Router();

routerAuth.post("/login",[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);