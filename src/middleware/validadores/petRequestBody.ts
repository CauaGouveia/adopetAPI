import * as yup from 'yup';
import { tipoRequestBodyPet } from '../../tipos/tipoPet';
import { Request, Response, NextFunction } from 'express';
import EnderecoEntity from '../../entities/endereco';
import enumEspecie from '../../enum/enumEspecie';
import enumPorte from '../../enum/enumPorte';


const esquemaBodyPet: yup.ObjectSchema<Omit<tipoRequestBodyPet, "adotante" | "abrigo">>= yup.object().shape({
    nome:yup.string().defined().required("O nome é obrigatório"),
    especie:yup.string().oneOf(Object.values(enumEspecie), "A especie deve ser cachorro ou gato").defined().required("A especie é obrigatória"),
    porte:yup.string().oneOf(Object.values(enumPorte), "O porte deve ser pequeno, medio ou grande" ).defined().required("O porte é obrigatório"),
    dataDeNascimento:yup.date().defined().required("A data de nascimento é obrigatória").max(new Date(), "A data de nascimento não pode ser no futuro"),
    adotado:yup.boolean().defined().required("O campo adotado é obrigatório"),
});


const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
    try{
        await esquemaBodyPet.validate(req.body, {abortEarly: false});
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

export { middlewareValidadorBodyPet };