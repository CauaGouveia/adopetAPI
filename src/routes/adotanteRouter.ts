import express from "express";
import adotanteController from "../controller/adotantecontroller";
import adotanteRepository from "../repositories/adotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const AdotanteRepository = new adotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const AdotanteController = new adotanteController(AdotanteRepository);

router.post("/", (req, res) => AdotanteController.criaAdotante(req, res));
router.get("/", (req, res) => AdotanteController.listaAdotantes(req, res));
router.put("/:id", (req, res) => AdotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req, res) => AdotanteController.deletaAdotante(req, res)); 
router.patch("/:id", (req, res) => AdotanteController.atualizaEnderecoAdotante(req, res));


export default router;