import { Request, Response } from 'express';
import type tipoPet from "../tipos/tipoPet";
import enumEspecie from '../enum/enumEspecie';
import petRepository from '../repositories/petRepository';
import petEntity from '../entities/petEntity';
import enumPorte from '../enum/enumPorte';
import { tipoRequestBodyPet, tipoRequestParamsPet, tipoResponseBodyPet } from '../tipos/tipoPet';

export default class petcontroller {
    constructor(private repository: petRepository) {}

    async criaPet(req:Request<tipoRequestParamsPet, {}, tipoRequestBodyPet>, 
                res:Response<tipoResponseBodyPet | { errorMessage: string }>) {
        const {nome, especie, porte, adotado, dataDeNascimento } = <petEntity>(req.body);
        
        const novoPet =  new petEntity(nome, especie, dataDeNascimento, adotado, porte);
        await this.repository.criaPet(novoPet);
        return res.status(201).json({ data: { id: novoPet.id, nome, porte, especie } });
    
    }

    async listaPets (req:Request<tipoRequestParamsPet, {}, tipoRequestBodyPet>, 
                    res:Response<tipoResponseBodyPet | { errorMessage: string }>) {
        const listaDePets = await this.repository.listaPet();
        const data = listaDePets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                porte: pet.porte !== null ? pet.porte : undefined,
                especie: pet.especie,
                adotado: pet.adotado
            };
        });
        return res.status(200).json({ data: data });
    }   

    async atualizaPet (req: Request<tipoRequestParamsPet, {}, tipoRequestBodyPet>, 
                    res: Response<tipoResponseBodyPet | { errorMessage: string }>) {
        const { id } = req.params;
        const {success, message} = await this.repository.atualizaPet(
            Number(id),
            req.body as petEntity
        );

        if (!success){
            return res.status(404).json({ errorMessage: message });
        }
        return res.status(204);
    }

    async deletaPet (req: Request<tipoRequestParamsPet, {}, tipoRequestBodyPet>, 
                    res: Response<tipoResponseBodyPet | { errorMessage: string }>) {
        const { id } = req.params;
        const {success, message} = await this.repository.deletaPet(Number(id));
            if (!success){
            return res.status(404).json({ errorMessage: message });
        }
        return res.status(204);
    }

    async adotaPet(req: Request<tipoRequestParamsPet, {}, tipoRequestBodyPet>, 
                res: Response<tipoResponseBodyPet | { errorMessage: string }>) {
        const { pet_id, adotante_id } = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        );

        if(!success){
            return res.status(404).json({ errorMessage: "ocorreu um erro ao adotar o pet" })
        }
        return res.status(204).json({ success: true, message: `Pet adotado com sucesso pelo adotante de id ${adotante_id}` })
    }

    async buscaPetPeloPorte (req:Request<tipoRequestParamsPet, {}, tipoRequestBodyPet>, 
        res:Response<tipoResponseBodyPet | { errorMessage: string }>) {
        const { porte } = req.query;
        const listaDePetsFiltradosPorPorte = await this.repository.buscaPetPeloPorte(porte as enumPorte);
        return res.status(200).json({ data: listaDePetsFiltradosPorPorte});
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response){
        const { campo, valor } = req.query;
        const listaPets = await this.repository.buscaPetPorCampoGenerico(campo as keyof petEntity, valor as string);
        return res.status(200).json(listaPets);
    }
}