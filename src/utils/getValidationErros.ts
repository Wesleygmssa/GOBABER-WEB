import { ValidationError } from 'yup';

interface Errors{ [key: string]: string } //typagem 

export default function getValidationErros(err: ValidationError):Errors{
    
    const validationErrors: Errors = {}; //VARIALVEL DO TIPO ERRO, INICANDO VAZIO.

    err.inner.forEach((error) =>{

        validationErrors[error.path] = error.message;
    });

    return validationErrors;
}