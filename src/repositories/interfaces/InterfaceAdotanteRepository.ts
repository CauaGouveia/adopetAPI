import AdotanteEntity from "../../entities/adotanteEntity";
import EnderecoEntity from "../../entities/endereco";

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listaAdotante(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
    atualizaAdotante(id:number, adotante: AdotanteEntity): Promise<{success: boolean; message?: string}> | void;
    deletaAdotante(id:number): Promise<{success: boolean; message?: string }> | void;
    atualizaEnderecoAdotante(idAdotante:number, endereco: EnderecoEntity): Promise<{success: boolean; message?: string}> | void;
}