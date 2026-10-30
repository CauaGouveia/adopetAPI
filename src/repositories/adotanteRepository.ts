import { Repository } from "typeorm";
import AdotanteEntity from "../entities/adotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/endereco";

export default class adotanteRepository implements InterfaceAdotanteRepository {
    private repository: Repository<AdotanteEntity>;
    
    constructor(repository: Repository<AdotanteEntity>){
        this.repository = repository;
    }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }

     async listaAdotante(): Promise<AdotanteEntity[]> {
            return await this.repository.find();
        }

        async atualizaAdotante(id: number, newData: AdotanteEntity): Promise<{success: boolean; message?: string}>  {
                try{ 
                    const adotanteToBeUpdated = await this.repository.findOne({where: {id}});
                    if (!adotanteToBeUpdated){
                        return {success: false, message: "adotante nao encontrado"};
                    }
                    Object.assign(adotanteToBeUpdated, newData);
                    await this.repository.save(adotanteToBeUpdated);
                   return {success: true};    
                } catch (erro) {
                    console.log(erro);
                    return {
                        success: false,
                        message: "Ocorreu um erro ao tentar atualizar o adotante",
                    };
                }
            }

            async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): 
                Promise<{success: boolean; message?: string}>  {
                try{ 
                    const enderecoAdotanteToBeUpdated = await this.repository.findOne({where: {id: idAdotante}});
                    if (!enderecoAdotanteToBeUpdated){
                        return {success: false, message: "adotante nao encontrado"};
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
                try{
                    const adotanteToBeRemoved = await this.repository.findOne({where: {id} });
                    if(!adotanteToBeRemoved) {
                        return {success: false, message: "Adotante não encontrado"};
                    }
                    await this.repository.remove(adotanteToBeRemoved);
                    return {success: true};
                } catch (erro) {
                    return {
                        success: false,
                        message: "Ocorreu um erro ao tentar excluir o adotante",
                    };
                }
            }

}

