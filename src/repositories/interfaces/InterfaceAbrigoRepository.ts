import AbrigoEntity from "../../entities/abrigoEntity";
import EnderecoEntity from "../../entities/endereco";

export default interface InterfaceAbrigoRepository {
    criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;
    listaAbrigos(): Array<AbrigoEntity> | Promise<AbrigoEntity[]>;
    atualizaAbrigo(id:number, abrigo: AbrigoEntity): Promise<{success: boolean; message?: string}> | void;
    deletaAbrigo(id:number): Promise<{success: boolean; message?: string }> | void;
    atualizaEnderecoAbrigo(idAbrigo:number, endereco: EnderecoEntity): Promise<{success: boolean; message?: string}> | void;
    abrigaPets(idAbrigo:number, idPet:number): Promise<{success: boolean; message?: string}> | void;
}