import { Request, Response } from 'express';
import abrigoRepository from '../repositories/abrigoRepository';
import abrigoEntity from '../entities/abrigoEntity';
import petEntity from '../entities/petEntity';
import petRepository from '../repositories/petRepository';
import EnderecoEntity from '../entities/endereco';
import * as yup from 'yup';
import { tipoRequestParamsAbrigo, tipoRequestBodyAbrigo, tipoResponseBodyAbrigo } from '../tipos/tipoAbrigo';

export default class abrigoController{
    constructor(private abrigoRepository: abrigoRepository, private petRepository: petRepository) {
        this.abrigoRepository = abrigoRepository;
        this.petRepository = petRepository;
    }

async criaAbrigo(req:Request<tipoRequestParamsAbrigo, {}, tipoRequestBodyAbrigo>, res:Response<tipoResponseBodyAbrigo>) {
  try {
    const { nome, celular, endereco, email, senha } = <abrigoEntity>req.body;
    const novoAbrigo = new abrigoEntity(
      nome,
      senha,
      celular,
      email,
      endereco
    );

    await this.abrigoRepository.criaAbrigo(novoAbrigo);
    return res.status(201).json({ data: { id: novoAbrigo.id, pets: novoAbrigo.pets, nome: novoAbrigo.nome, celular: novoAbrigo.celular, email: novoAbrigo.email, endereco: novoAbrigo.endereco } });
    } catch (error) {
    return res.status(500).json({errorMessage: 'Erro ao criar o abrigo' });
    }
    }

    async listaAbrigos(req:Request<tipoRequestParamsAbrigo, {}, tipoRequestBodyAbrigo>, res:Response<tipoResponseBodyAbrigo>) {
        try{
            const listaDeAbrigos = await this.abrigoRepository.listaAbrigos();
            const data = listaDeAbrigos.map((abrigo) => {
                return {
                    id: abrigo.id,
                    pets: abrigo.pets ?? [],
                    nome: abrigo.nome,
                    celular: abrigo.celular,
                    email: abrigo.email !== null ? abrigo.email : undefined,
                    endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
                };
            });
            return res.status(200).json({ data: data });
            } catch(error){
            return res.status(500).json({errorMessage: "erro ao obter lista de abrigos"});
        };
    }


    async atualizaAbrigo(req:Request<tipoRequestParamsAbrigo, {}, tipoRequestBodyAbrigo>, res:Response<tipoResponseBodyAbrigo>) {
        try{
            const { id } = req.params;
            const { success, message } = await this.abrigoRepository.atualizaAbrigo(
                Number(id),
                req.body as abrigoEntity
            );

            if(!success){
                return res.status(400).json({errorMessage: message})
            } else {
                return res.status(200).json({errorMessage: "Dados do abrigo atualizados com sucesso!"})
            }

        } catch(error){
            return res.status(500).json({errorMessage: "erro ao atualizar dados do abrigo"});
        };
    }

    async deletaAbrigo(req:Request<tipoRequestParamsAbrigo, {}, tipoRequestBodyAbrigo>, res:Response<tipoResponseBodyAbrigo>) {
        try {
             const { id } = req.params;
            const {success, message} = await this.abrigoRepository.deletaAbrigo(Number(id));
            if (!success){
            return res.status(404).json({ errorMessage: "abrigo nao encontrado! Verifique o id" });
            } else {
            return res.status(204).json({ message: "abrigo deletado com sucesso!"});
            }

        } catch (error){
            return res.status(500).json({errorMessage: "erro ao deletar o abrigo"});
        };
    }

    async atualizaEnderecoAbrigo(req:Request<tipoRequestParamsAbrigo, {}, EnderecoEntity>, res:Response<tipoResponseBodyAbrigo>) {
        try {
             const { id } = req.params;
            const {success, message} = await this.abrigoRepository.atualizaEnderecoAbrigo(Number(id), req.body);
            if (!success){
            return res.status(404).json({ success: false, message: "abrigo nao encontrado! Verifique o id" });
            } else {
            return res.status(204).json({ success: true, message: "endereco do abrigo alterado com sucesso!"});
            }

        } catch (error){
            return res.status(500).json({errorMessage: "erro ao atualizar o endereco do abrigo"});
        };
    }

    async abrigaPets(req:Request<tipoRequestParamsAbrigo, {}, tipoRequestBodyAbrigo>, res:Response<tipoResponseBodyAbrigo>) {
        try {
            const { idAbrigo, idPet } = req.params;
            const { success, message } = await this.abrigoRepository.abrigaPets(Number(idAbrigo), Number(idPet));
            if (!success) {
                return res.status(404).json({ success: false, message: message });
            } else {
                return res.status(200).json({ success: true, message: "pet abrigado com sucesso!" });
            }
        } catch (error) {
            return res.status(500).json({ errorMessage: "erro ao abrigar o pet" });
        }
    }
}
