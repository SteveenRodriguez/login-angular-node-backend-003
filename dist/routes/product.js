"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const validated_token_1 = __importDefault(require("./validated-token"));
const router = (0, express_1.Router)();
/**
 * Parámetros
 * 1. Ruta
 * 2. Protección de la ruta
 * 3. Método del controller
 */
router.get("/", validated_token_1.default, product_1.getProducts);
exports.default = router;
