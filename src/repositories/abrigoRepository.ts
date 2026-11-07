import { Repository } from "typeorm";
import AbrigoEntity from "../entities/abrigoEntity";
import PetEntity from "../entities/petEntity";
import petRepository from "./petRepository";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import EnderecoEntity from "../entities/endereco";
import { RecursoNaoEncontrado, RequisicaoInvalida } from "../utils/manipulaErros";

export default class abrigoRepository implements InterfaceAbrigoRepository {
    private abrigoRepository: Repository<AbrigoEntity>;
    private petRepository: Repository<PetEntity>;
    
    constructor(abrigoRepository: Repository<AbrigoEntity>, petRepository: Repository<PetEntity>){
        this.abrigoRepository = abrigoRepository;
        this.petRepository = petRepository;
    }
    private async verificaCelular(celular: string){
        return await this.abrigoRepository.findOne({where: {celular}});
    }

    private async verificaEmail(email: string){
        return await this.abrigoRepository.findOne({where: {email}});
    };
    
    private async verificaNome(nome: string){
        return await this.abrigoRepository.findOne({where: {nome}});
    };

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
        if (await this.verificaCelular(abrigo.celular) || await this.verificaNome(abrigo.nome)){
        throw new RequisicaoInvalida("Abrigo com esses dados já cadastrado");
        } 
        await this.abrigoRepository.save(abrigo);
        
    }

     async listaAbrigos(): Promise<AbrigoEntity[]> {
            return await this.abrigoRepository.find();
        }

        async atualizaAbrigo(id: number, newData: AbrigoEntity): Promise<{success: boolean; message?: string}>  {
                const abrigoToBeUpdated = await this.abrigoRepository.findOne({where: {id}});
                    if (!abrigoToBeUpdated){
                        throw new RecursoNaoEncontrado("abrigo nao encontrado");
                    }
                    Object.assign(abrigoToBeUpdated, newData);
                    await this.abrigoRepository.save(abrigoToBeUpdated);
                   return {success: true};
                }

            async atualizaEnderecoAbrigo(idAbrigo: number, endereco: EnderecoEntity): 
                Promise<{success: boolean; message?: string}>  {
                try{ 
                    const enderecoAbrigoToBeUpdated = await this.abrigoRepository.findOne({where: {id: idAbrigo}});
                    if (!enderecoAbrigoToBeUpdated){
                        throw new RecursoNaoEncontrado("abrigo nao encontrado");
                    }
                    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
                    enderecoAbrigoToBeUpdated.endereco = novoEndereco; 
                    await this.abrigoRepository.save(enderecoAbrigoToBeUpdated);
                   return {success: true, message: "endereco atualizado com sucesso"};    
                } catch (erro) {
                    console.log(erro);
                    return {
                        success: false,
                        message: "Ocorreu um erro ao tentar atualizar o endereco do  abrigo",
                    };
                }
            }
        
            async deletaAbrigo(id: number): Promise<{ success: boolean; message?: string}> {
                const abrigoToBeRemoved = await this.abrigoRepository.findOne({where: {id} });
                    if(!abrigoToBeRemoved) {
                        throw new RecursoNaoEncontrado("Abrigo não encontrado");
                    }
                    await this.abrigoRepository.remove(abrigoToBeRemoved);
                    return {success: true};
                
                }

                async abrigaPets(idAbrigo: number, idPet: number): Promise<{ success: boolean; message?: string}> {
                    const abrigo = await this.abrigoRepository.findOne({where: {id: idAbrigo}});
                    const pet = await this.petRepository.findOne({where: {id: idPet}});
                    if (!abrigo || !pet) {
                        throw new RecursoNaoEncontrado("abrigo ou pet nao encontrado");
                    }
                    pet.abrigo = abrigo;
                    await this.petRepository.save(pet);
                    return {success: true, message: "pet abrigado com sucesso"};
                }
}
