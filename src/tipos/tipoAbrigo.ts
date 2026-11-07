import AbrigoEntity from "../entities/abrigoEntity";

type tipoRequestBodyAbrigo =  Omit<AbrigoEntity, "id" | "pets">;
type tipoRequestParamsAbrigo = {
    id?: string;
    idAbrigo?: string;
    idPet?: string;
};
type tipoResponseBodyAbrigo = {
    data?: Pick<AbrigoEntity, "id" | "nome" | "celular" | "endereco" | "email" | "pets" > |
             Pick<AbrigoEntity, "id" | "nome" | "celular" | "endereco" | "email" | "pets" > [];
    errorMessage?: string;
    success?: boolean;
    message?: string;
    error?: Record<string, string>;
}

export { tipoRequestBodyAbrigo, tipoRequestParamsAbrigo, tipoResponseBodyAbrigo };