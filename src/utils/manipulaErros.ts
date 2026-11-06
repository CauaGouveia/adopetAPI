import { enumHttpStatusCode } from "../enum/enumHttpStatusCode";

export class ManipulaErros extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
};

export class RequisicaoInvalida extends ManipulaErros {
    constructor(message: string) {
        super(message, enumHttpStatusCode.BAD_REQUEST);
    }
};

export class RecursoNaoEncontrado extends ManipulaErros {
    constructor(message: string) {
        super(message, enumHttpStatusCode.NOT_FOUND);
    }
};