import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validatedToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer")) {
    try {
      // Extraer Token -> obtenemos caracteres de la posición 7 en adelante
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "pepito123");
      next();
    } catch (error) {
      res.status(400).json({
        msg: "Token Inválido",
      });
    }
  } else {
    res.status(400).json({
      msg: "Acceso Denegado",
    });
  }
};

export default validatedToken;
