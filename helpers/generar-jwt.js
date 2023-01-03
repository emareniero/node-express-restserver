import jwt from "jsonwebtoken";

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    // Solo almacenamos en el payload el unique identifactor uid  para evitar que nos roben info
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h"
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(" No se pudeo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

export { generarJWT };
