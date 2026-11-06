import * as yup from 'yup';
import { tipoRequestBodyAdotante } from '../../tipos/tipoAdotante';
import { Request, Response, NextFunction } from 'express';


const esquemaBodyAdotante: yup.ObjectSchema<Omit<tipoRequestBodyAdotante, "endereco">>= yup.object().shape({
    nome:yup.string().defined().required("O nome é obrigatório"),
    senha:yup.string().defined().required().min(6, "A senha deve ter no mínimo 6 caracteres").matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "A senha deve ter no mínimo 8 caracteres, no máximo 16 caracteres, pelo menos um dígito, pelo menos uma letra maiúscula, pelo menos uma letra minúscula e pelo menos um caractere especial"),
    celular:yup.string().defined().required("O celular é obrigatório").matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, "celular inválido"),
    foto:yup.string().optional(),
});


const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await esquemaBodyAdotante.validate(req.body, {abortEarly: false});
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

export { middlewareValidadorBodyAdotante };