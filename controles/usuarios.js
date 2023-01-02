import { response, request } from "express";

export { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};

const usuariosGet = (req = request, res = response) => {

  //const query = req.query; // Son todos los parametros que se agregan

  const { q, nombre = 'No name', apikey, page = '1', limit } = req.query;

  res.json({
    msg: "get API - Controlador",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usuariosPut = (req, res) => {

  const id = req.params.id; // Pongo id porque es lo que puse en la ruta de put.

  res.json({
    msg: "put API - Controlador",
    id
  });
};

const usuariosPost = (req, res) => {
  
  //const body = req.body;
  const { nombre , edad } = req.body;

  res.json({
    msg: "post API - Controlador",
    nombre,
    edad
    //body
  });
};

const usuariosDelete = (req, res) => {
  res.json({
    msg: "delete API - Controlador",
  });
};


