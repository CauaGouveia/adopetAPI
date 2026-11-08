import { Repository } from "typeorm";
import AdotanteEntity from "../entities/adotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/endereco";
import { RecursoNaoEncontrado, RequisicaoInvalida } from "../utils/manipulaErros";

export default class adotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;
    
    constructor(repository: Repository<AdotanteEntity>){
        this.repository = repository;
    }
    private async verificaCelular(celular: string){
        return await this.repository.findOne({where: {celular}});
    }
    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        if (await this.verificaCelular(adotante.celular)){
        throw new RequisicaoInvalida("Celular já cadastrado");
        }
        await this.repository.save(adotante);
        
    }

     async listaAdotante(): Promise<AdotanteEntity[]> {
            return await this.repository.find();
        }

        async atualizaAdotante(id: number, newData: AdotanteEntity) {
                const adotanteToBeUpdated = await this.repository.findOne({where: {id}});
                    if (!adotanteToBeUpdated){
                        throw new RecursoNaoEncontrado("adotante nao encontrado");
                    }
                    Object.assign(adotanteToBeUpdated, newData);
                    await this.repository.save(adotanteToBeUpdated);
                   return {success: true};
                }

            async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): 
                Promise<{success: boolean; message?: string}>  {
                try{ 
                    const enderecoAdotanteToBeUpdated = await this.repository.findOne({where: {id: idAdotante}});
                    if (!enderecoAdotanteToBeUpdated){
                        throw new RecursoNaoEncontrado("adotante nao encontrado");
                    }
                    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
                    enderecoAdotanteToBeUpdated.endereco = novoEndereco; 
                    await this.repository.save(enderecoAdotanteToBeUpdated);
                   return {success: true, message: "endereco atualizado com sucesso"};    
                } catch (erro) {
                    console.log(erro);
                    return {
                        success: false,
                        message: "Ocorreu um erro ao tentar atualizar o endereco do  adotante",
                    };
                }
            }
        
            async deletaAdotante(id: number): Promise<{ success: boolean; message?: string}> {
                const adotanteToBeRemoved = await this.repository.findOne({where: {id} });
                    if(!adotanteToBeRemoved) {
                        throw new RecursoNaoEncontrado("Adotante não encontrado");
                    }
                    await this.repository.remove(adotanteToBeRemoved);
                    return {success: true};
                
                }

}

