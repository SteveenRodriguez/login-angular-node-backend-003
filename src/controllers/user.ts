import { Request, Response } from "express";
import bycript from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

// Método que crea un Usuario
export const newUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username: username } });

  if (user) {
    return res.status(400).json({
      msg: `Ya existe usuario con nombre: ${username}`,
    });
  }

  const hashedPassword = await bycript.hash(password, 10);

  try {
    await User.create({
      username: username,
      password: hashedPassword,
    });

    res.json({
      msg: `Usuario ${username} Creado exitosamente`,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Ocurrio un error",
      error,
    });
  }
};

// Método de login para usuarios registrados
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Validamos si el usuario existe en DB
  const user: any = await User.findOne({ where: { username: username } });

  if (!user) {
    return res.status(400).json({
      msg: `No existe usuario ${username} en la BD`,
    });
  }

  // Validamos Password
  const passwordValid = await bycript.compare(password, user.password);
  if (!passwordValid) {
    return res.status(400).json({
      msg: `Password Incorrecto`,
    });
  }

  // Generamos token
  // Recibe 3 parámetros data, secretKey, options?
  const token = jwt.sign(
    { username: username },
    process.env.SECRET_KEY || "pepito123",
    { expiresIn: "3600000" }
  );

  res.json(token);
};
