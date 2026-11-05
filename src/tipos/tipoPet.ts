import petEntity from "../entities/petEntity";
import enumEspecie from "../enum/enumEspecie";

type tipoRequestBodyPet =  Omit<petEntity, "id">;
type tipoRequestParamsPet = { id?: string, pet_id?: string, adotante_id?: string, porte?: enumEspecie };
type tipoResponseBodyPet = {
    data?: Pick<petEntity, "id" | "nome" | "porte" | "especie" > | 
            Pick<petEntity, "id" | "nome" | "porte" | "especie" > [] |
            Pick<petEntity, "porte" > [];
    errorMessage?: string;
    success?: boolean;
    message?: string;
}

export { tipoRequestBodyPet, tipoRequestParamsPet, tipoResponseBodyPet };

type tipoPet = {
    id:number;
    nome:string;
    especie: enumEspecie;
    adotado:boolean;
    dataDeNascimento:Date;
}

export default tipoPet;