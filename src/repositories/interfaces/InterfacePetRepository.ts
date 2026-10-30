import petEntity from "../../entities/petEntity";
import enumPorte from "../../enum/enumPorte";

export default interface InterfacePetRepository {
    criaPet(pet: petEntity): void;
    listaPet(): Array<petEntity> | Promise<petEntity[]>;
    atualizaPet(id:number, pet: petEntity): Promise<{success: boolean; message?: string}> | void;
    deletaPet(id:number): Promise<{success: boolean; message?: string }> | void;
    buscaPetPeloPorte(porte: enumPorte): Promise<petEntity[]> | petEntity[];
    buscaPetPorCampoGenerico<Tipo extends keyof petEntity>(campo:Tipo, valor:petEntity[Tipo]): Promise<petEntity[]> | petEntity[];
}