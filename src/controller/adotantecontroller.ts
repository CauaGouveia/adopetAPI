import { Request, Response } from 'express';
import adotanteRepository from '../repositories/adotanteRepository';
import adotanteEntity from '../entities/adotanteEntity';
import EnderecoEntity from '../entities/endereco';

let id = 0;
function geraId() {
  id = id++;
  return id;
};

export default class adotanteController{
    constructor(private repository: adotanteRepository) {}

async criaAdotante(req:Request, res:Response) {
  try {
    const { nome, celular, endereco, foto, senha } = <adotanteEntity>req.body;

    const novoAdotante = new adotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    await this.repository.criaAdotante(novoAdotante);
    return res.status(201).json(novoAdotante);
    } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar o adotante' });
    }
    }

    async listaAdotantes(req:Request, res:Response) {
        try{
            const listaDeAdotantes = await this.repository.listaAdotante();
            return res.status(200).json(listaDeAdotantes);
            } catch(error){
            return res.status(500).json({error: "erro ao obter lista de adotantes"});
        };
    }


    async atualizaAdotante(req:Request, res:Response) {
        try{
            const { id } = req.params;
            const { success, message } = await this.repository.atualizaAdotante(
                Number(id),
                req.body as adotanteEntity
            );

            if(!success){
                return res.status(400).json({error: message})
            } else {
                return res.status(200).json({message: "Dados do adotante atualizados com sucesso!"})
            }

        } catch(error){
            return res.status(500).json({error: "erro ao atualizar dados do adotante"});
        };
    }

    async deletaAdotante(req:Request, res:Response) {
        try {
             const { id } = req.params;
            const {success, message} = await this.repository.deletaAdotante(Number(id));
            if (!success){
            return res.status(404).json({ message: "adotante nao encontrado! Verifique o id" });
            } else {
            return res.status(204).json({ message: "adotante deletado com sucesso!"});
            }

        } catch (error){
            return res.status(500).json({error: "erro ao deletar o adotante"});
        };
    }

    async atualizaEnderecoAdotante(req:Request, res:Response) {
        try {
             const { id } = req.params;
            const {success, message} = await this.repository.atualizaEnderecoAdotante(Number(id), req.body as EnderecoEntity);
            if (!success){
            return res.status(404).json({ success: false, message: "adotante nao encontrado! Verifique o id" });
            } else {
            return res.status(204).json({ success: true, message: "endereco do adotante alterado com sucesso!"});
            }

        } catch (error){
            return res.status(500).json({error: "erro ao deletar o adotante"});
        };
    }
}
