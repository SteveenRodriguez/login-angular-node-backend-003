import { Router } from "express";
import { getProducts } from "../controllers/product";
import validatedToken from "./validated-token";

const router = Router();

/**
 * Parámetros
 * 1. Ruta
 * 2. Protección de la ruta
 * 3. Método del controller
 */
router.get("/", validatedToken, getProducts);

export default router;
