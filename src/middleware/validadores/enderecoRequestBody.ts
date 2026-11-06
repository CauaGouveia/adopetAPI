import * as yup from 'yup';
import { tipoRequestBodyAdotante } from '../../tipos/tipoAdotante';
import { Request, Response, NextFunction } from 'express';
import EnderecoEntity from '../../entities/endereco';


const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">>= yup.object().shape({
    cidade:yup.string().defined().required("A cidade é obrigatória"),
    estado:yup.string().defined().required().min(2, "O estado deve ter no mínimo 2 caracteres").max(2, "O estado deve ter no máximo 2 caracteres"),
});


const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await esquemaBodyEndereco.validate(req.body, {abortEarly: false});
        return next();
        } catch (error) {
            const yupErrors = error as yup.ValidationError;
            const validationErrors:Record<string, string> = {};
            yupErrors.inner.forEach((error) => {
                if (!error.path) return;
                validationErrors[error.path] = error.message;
            })
            return res.status(400).json({ error: validationErrors });
        }
};

export { middlewareValidadorBodyEndereco };