import AbrigoEntity from "../../entities/abrigoEntity";
import EnderecoEntity from "../../entities/endereco";

export default interface InterfaceAbrigoRepository {
    criaAbrigo(abrigo: AbrigoEntity): void ;
    listaAbrigos(): Array<AbrigoEntity> | Promise<AbrigoEntity[]>;
    atualizaAbrigo(id:number, abrigo: AbrigoEntity): void;
    deletaAbrigo(id:number): void;
    atualizaEnderecoAbrigo(idAbrigo:number, endereco: EnderecoEntity): void;
    abrigaPets(idAbrigo:number, idPet:number): void;
}