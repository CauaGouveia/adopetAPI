import AdotanteEntity from "../entities/adotanteEntity";

type tipoRequestBodyAdotante =  Omit<AdotanteEntity, "id" | "pets">;
type tipoRequestParamsAdotante = {
    id?: string;
};
type tipoResponseBodyAdotante = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco" > |
             Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco" > [];
    errorMessage?: string;
    success?: boolean;
    message?: string;
    error?: Record<string, string>;
}

export { tipoRequestBodyAdotante, tipoRequestParamsAdotante, tipoResponseBodyAdotante };