import { enumHttpStatusCode } from "../../enum/enumHttpStatusCode";
import { ManipulaErros } from "../../utils/manipulaErros";
import { NextFunction, Request, Response } from "express";

export const erroMidleware = (error: ManipulaErros, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode?? enumHttpStatusCode.INTERNAL_SERVER_ERROR;
    const message = error.statusCode? error.message : "Erro interno do servidor";
    res.status(statusCode).json({ errorMessage: message });
    return next();
}