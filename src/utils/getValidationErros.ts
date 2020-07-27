import { ValidationError } from 'yup';

interface Errors{ 
    [key: string]: string  //FORMA DINÂMICA DE TYPAGEM
} //typagem 

export default function getValidationErros(err: ValidationError){
    
    const validationErrors: Errors = {}; //VARIALVEL DO TIPO ERRO, INICANDO VAZIO.

    err.inner.forEach((error) =>{ //PERCORRENDO ERRO

        validationErrors[error.path] = error.message; // VALOR DO PATH É A MESSAGEM
    });

    return validationErrors;
}