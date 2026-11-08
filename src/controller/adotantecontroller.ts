import { Request, Response } from 'express';
import adotanteRepository from '../repositories/adotanteRepository';
import adotanteEntity from '../entities/adotanteEntity';
import EnderecoEntity from '../entities/endereco';
import { tipoRequestBodyAdotante, tipoRequestParamsAdotante, tipoResponseBodyAdotante } from '../tipos/tipoAdotante';
import * as yup from 'yup';
import { RequisicaoInvalida } from '../utils/manipulaErros';

export default class adotanteController{
    constructor(private repository: adotanteRepository) {}

async criaAdotante(req:Request<{}, {}, tipoRequestBodyAdotante>
    , res:Response<tipoResponseBodyAdotante | { error: Record<string, string> }>) {
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
    return res.status(201).json({ data: { id: novoAdotante.id, nome: novoAdotante.nome, celular: novoAdotante.celular } });
    } catch (error) {
    return res.status(500).json({errorMessage: 'Erro ao criar o adotante' });
    }
    }

    async listaAdotantes(req:Request<tipoRequestParamsAdotante, {}, tipoRequestBodyAdotante>
    , res:Response<tipoResponseBodyAdotante | { errorMessage: string }>) {
        try{
            const listaDeAdotantes = await this.repository.listaAdotante();
            const data = listaDeAdotantes.map((adotante) => {
                return {
                    id: adotante.id,
                    nome: adotante.nome,
                    celular: adotante.celular,
                    endereco: adotante.endereco !== null ? adotante.endereco : undefined
                };
            });
            return res.status(200).json({ data: data });
            } catch(error){
            return res.status(500).json({errorMessage: "erro ao obter lista de adotantes"});
        };
    }


    async atualizaAdotante(req: Request<tipoRequestParamsAdotante, {}, tipoRequestBodyAdotante>,
    res: Response<tipoResponseBodyAdotante>) {
    try {
        const { id } = req.params;
        const { success } = await this.repository.atualizaAdotante(
            Number(id),
            req.body as adotanteEntity
        );

        if (success) {
            return res.status(200).json({ errorMessage: "Dados do adotante atualizados com sucesso!" });
        } else {
            throw new RequisicaoInvalida("adotante nao encontrado! Verifique o id");
        }
    } catch (error) {
        return res.status(500).json({ errorMessage: "erro ao atualizar dados do adotante" });
    }
}

    async deletaAdotante(req:Request<tipoRequestParamsAdotante, {}, tipoRequestBodyAdotante>
    , res:Response<tipoResponseBodyAdotante | { errorMessage: string }>) {
        try {
             const { id } = req.params;
            const {success, message} = await this.repository.deletaAdotante(Number(id));
            if (!success){
            return res.status(404).json({ errorMessage: "adotante nao encontrado! Verifique o id" });
            } else {
            return res.status(204).json({ errorMessage: "adotante deletado com sucesso!"});
            }

        } catch (error){
            return res.status(500).json({errorMessage: "erro ao deletar o adotante"});
        };
    }

    async atualizaEnderecoAdotante(req:Request<tipoRequestParamsAdotante, {}, EnderecoEntity>
    , res:Response<tipoResponseBodyAdotante | { errorMessage: string }>) {
        try {
             const { id } = req.params;
            const {success, message} = await this.repository.atualizaEnderecoAdotante(Number(id), req.body);
            if (!success){
            return res.status(404).json({ success: false, message: "adotante nao encontrado! Verifique o id" });
            } else {
            return res.status(204).json({ success: true, message: "endereco do adotante alterado com sucesso!"});
            }

        } catch (error){
            return res.status(500).json({errorMessage: "erro ao deletar o adotante"});
        };
    }
}
