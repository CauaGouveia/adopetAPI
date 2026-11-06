import express, { RequestHandler, response } from "express";
import petcontroller from "../controller/petcontroller";
import petRepository from "../repositories/petRepository";
import { AppDataSource } from "../config/dataSource";
import adotanteRepository from "../repositories/adotanteRepository";
import { middlewareValidadorBodyPet } from "../middleware/validadores/petRequestBody";
import { verificaIdMiddleware } from "../middleware/validadores/verificaId";

const router = express.Router();
const PetRepository = new petRepository(AppDataSource.getRepository("petEntity"), AppDataSource.getRepository("AdotanteEntity"));
const petController = new petcontroller(PetRepository);
const validateBodyPet:RequestHandler = (req, res, next) => middlewareValidadorBodyPet(req, res, next);

router.post('/', validateBodyPet, (req, res) => petController.criaPet(req, res));
router.get('/', (req, res) => petController.listaPets(req, res));
router.put('/:id', verificaIdMiddleware, (req, res) => petController.atualizaPet(req, res));
router.delete('/:id', verificaIdMiddleware, (req, res) => petController.deletaPet(req, res));
router.put('/:pet_id/:adotante_id', verificaIdMiddleware, (req, res) => petController.adotaPet(req, res));
router.get('/filtroporte', (req, res) => petController.buscaPetPeloPorte(req, res));
router.get('/filtro', (req, res) => petController.buscaPetPorCampoGenerico(req, res));



export default router;