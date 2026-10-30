import enumEspecie from "../enum/enumEspecie";

type tipoPet = {
    id:number;
    nome:string;
    especie: enumEspecie;
    adotado:boolean;
    dataDeNascimento:Date;
}

export default tipoPet;