import { Request, Response } from 'express';
import type tipoPet from "../tipos/tipoPet";
import enumEspecie from '../enum/enumEspecie';
import petRepository from '../repositories/petRepository';
import petEntity from '../entities/petEntity';
import enumPorte from '../enum/enumPorte';
let listaDePets:Array<tipoPet> = [];

let id = 0;
function geraId() {
  id = id++;
  return id;
}


export default class petcontroller {
    constructor(private repository: petRepository) {}

    async criaPet(req:Request, res:Response){
        const {nome, especie, porte, adotado, dataDeNascimento } = req.body as petEntity;
        if (!Object.values(enumEspecie).includes(especie)) {
            return res.status(400).json({ error: 'Espécie Inválida'});
        }
        if (porte && !(porte in enumPorte)) {
            return res.status(400).json({ error: 'Porte Inválido'});
        }
        const novoPet = new petEntity(nome, especie, dataDeNascimento, adotado, porte);
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPets (req:Request, res: Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }   

    async atualizaPet (req: Request, res: Response) {
        const { id } = req.params;
        const {success, message} = await this.repository.atualizaPet(
            Number(id),
            req.body as petEntity
        );

        if (!success){
            return res.status(404).json({ message });
        }
        return res.status(204);
    }

    async deletaPet (req: Request, res: Response) {
        const { id } = req.params;
        const {success, message} = await this.repository.deletaPet(Number(id));
            if (!success){
            return res.status(404).json({ message });
        }
        return res.status(204);
    }

    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotante_id } = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        );

        if(!success){
            return res.status(404).json({ success: false, message: "ocorreu um erro ao adotar o pet"})
        }
        return res.status(204).json({ success: true, message: `Pet adotado com sucesso pelo adotante de id ${adotante_id}`})
    }

    async buscaPetPeloPorte (req: Request, res: Response) {
        const { porte } = req.query;
        const listaDePetsFiltradosPorPorte = await this.repository.buscaPetPeloPorte(porte as enumPorte);
        return res.status(200).json(listaDePetsFiltradosPorPorte);
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response){
        const { campo, valor } = req.query;
        const listaPets = await this.repository.buscaPetPorCampoGenerico(campo as keyof petEntity, valor as string);
        return res.status(200).json(listaPets);
    }
}