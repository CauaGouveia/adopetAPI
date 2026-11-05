import AdotanteEntity from "../entities/adotanteEntity";

type tipoRequestBodyAdotante =  Omit<AdotanteEntity, "id">;
type tipoRequestParamsAdotante = {
    id?: string;
};
type tipoResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular" > |
             Pick<AdotanteEntity, "id" | "nome" | "celular" > [];
    errorMessage?: string;
    success?: boolean;
    message?: string;
}

export { tipoRequestBodyAdotante, tipoRequestParamsAdotante, tipoResponseBodyAdotante };