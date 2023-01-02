import { Router } from "express";
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controles/usuarios.js";

export const router = Router();

router.get("/", usuariosGet );

router.put("/:id", usuariosPut);

router.post("/", usuariosPost);

router.delete("/", usuariosDelete);

router.patch("/", (req, res) => {
  res.json({
    msg: "patch API",
  });
});


