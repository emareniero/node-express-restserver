import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRoleValido = async (rol = "") => {
  // Se le asigna el valor "" para que en caso que no venga rol choque con la siguiente validacion
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no existe en la BD`);
  }
};

const esMailValido = async (correo = "") => {
  const existeMail = await Usuario.findOne({ correo });
  if (existeMail) {
    throw new Error(`El correo ${correo} ya se encuentra registrado`);
  }
};

const existeUsuarioPorID = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe en la BD`);
  }
};

export { esRoleValido, esMailValido, existeUsuarioPorID };
