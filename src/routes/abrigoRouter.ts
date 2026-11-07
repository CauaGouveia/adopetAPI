import express, { RequestHandler } from "express";
import abrigoController from "../controller/abrigocontroller";
import abrigoRepository from "../repositories/abrigoRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/validadores/verificaId";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import petRepository from "../repositories/petRepository";

const router = express.Router();
const AbrigoRepository = new abrigoRepository(
  AppDataSource.getRepository("AbrigoEntity"), AppDataSource.getRepository("PetEntity")
);
const PetRepository = new petRepository(
  AppDataSource.getRepository("PetEntity"), AppDataSource.getRepository("AbrigoEntity")
);
const AbrigoController = new abrigoController(AbrigoRepository, PetRepository);

const validateBodyAbrigo:RequestHandler = (req, res, next) => middlewareValidadorBodyAbrigo(req, res, next);
const validateBodyEndereco:RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateBodyAbrigo, (req, res) => AbrigoController.criaAbrigo(req, res));
router.get("/", (req, res) => AbrigoController.listaAbrigos(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) => AbrigoController.atualizaAbrigo(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => AbrigoController.deletaAbrigo(req, res));
router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) => AbrigoController.atualizaEnderecoAbrigo  (req, res));
router.put("/:idAbrigo/:idPet", (req, res) => AbrigoController.abrigaPets(req, res));


export default router;