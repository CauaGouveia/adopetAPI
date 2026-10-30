import { Repository } from "typeorm";
import petEntity from "../entities/petEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import adotanteRepository from "./adotanteRepository";
import AdotanteEntity from "../entities/adotanteEntity";
import enumPorte from "../enum/enumPorte";

export default class petRepository implements InterfacePetRepository {
   private petRepository: Repository<petEntity>;
   private adotanteRepository: Repository<AdotanteEntity>;

   constructor(petRepository: Repository<petEntity>, adotanteRepository: Repository<AdotanteEntity>) {
    this.petRepository= petRepository;
    this.adotanteRepository = adotanteRepository
   }

    criaPet(pet: petEntity): void {
        this.petRepository.save(pet);
    }

    async listaPet(): Promise<petEntity[]> {
        return await this.petRepository.find();
    }

    async atualizaPet(id: number, newData: petEntity): Promise<{success: boolean; message?: string}>  {
        try{ 
            const petToBeUpdated = await this.petRepository.findOne({where: {id}});
            if (!petToBeUpdated){
                return {success: false, message: "pet nao encontrado"};
            }
            Object.assign(petToBeUpdated, newData);
            await this.petRepository.save(petToBeUpdated);
           return {success: true};    
        } catch (erro) {
            console.log(erro);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o pet",
            };
        }
    }

    async deletaPet(id: number): Promise<{ success: boolean; message?: string}> {
        try{
            const petToBeRemoved = await this.petRepository.findOne({where: {id} });
            if(!petToBeRemoved) {
                return {success: false, message: "Pet não encontrado"};
            }
            await this.petRepository.remove(petToBeRemoved);
            return {success: true};
        } catch (erro) {
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o pet",
            };
        }
    }

    async adotaPet( pet_id: number, adotante_id:number): Promise<{ success: boolean; message?: string}> {
        try {
            const petQueSeraAdotado = await this.petRepository.findOne({ where: {id: pet_id}});
            const adotante = await this.adotanteRepository.findOne({ where: {id: adotante_id}});
            if (!petQueSeraAdotado || !adotante) {
                return { success: false, message: "Pet ou adotante nao encontrado!"};
            }
            petQueSeraAdotado.adotante = adotante;
            petQueSeraAdotado.adotado = true;
            await this.petRepository.save(petQueSeraAdotado);
            return {success: true};
        
        } catch (erro) {
            return { success: false, message: "erro interno de codigo"};
        }
    }

    async buscaPetPeloPorte(porte: enumPorte): Promise<petEntity[]> {
        const pets = await this.petRepository.find({ where: {porte}});
        return pets;
        }

    async buscaPetPorCampoGenerico<Tipo extends keyof petEntity>(
        campo: Tipo, 
        valor: petEntity[Tipo]): 
        Promise<petEntity[]>{
        const pets = await this.petRepository.find({where: {[campo]: valor }})
        return pets;
    }

}