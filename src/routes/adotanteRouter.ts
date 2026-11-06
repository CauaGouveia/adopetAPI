import express, { RequestHandler } from "express";
import adotanteController from "../controller/adotantecontroller";
import adotanteRepository from "../repositories/adotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/validadores/verificaId";

const router = express.Router();
const AdotanteRepository = new adotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const AdotanteController = new adotanteController(AdotanteRepository);

const validateBodyAdotante:RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next);
const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateBodyAdotante, (req, res) => AdotanteController.criaAdotante(req, res));
router.get("/", (req, res) => AdotanteController.listaAdotantes(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) => AdotanteController.atualizaAdotante(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => AdotanteController.deletaAdotante(req, res));
router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) => AdotanteController.atualizaEnderecoAdotante(req, res));


export default router;