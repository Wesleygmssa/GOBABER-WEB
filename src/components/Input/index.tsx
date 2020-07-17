import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react';
import {IconBaseProps} from 'react-icons';
import {FiAlertCircle} from 'react-icons/fi';
import { Container, Error} from './styles';
import {useField} from '@unform/core'; //RUCK PRA FORM

import Tooltip from '../Tooltip';


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ // TODAS PROPRIEDADE DO INPUT
    name: string;
    icon?: React.ComponentType<IconBaseProps>; //ATRIBUTOS NO ICON  PASSANDO PELA PROPS
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) =>{ // PROPS NO INPUT NA PAGINA PRINCIPAL

    const inputRef = useRef<HTMLInputElement>(null);// SERVE PRA FAZER MANUPULAÇÃO DIRETA NO INPUTT

    const [isFocused, setIsFocused] = useState(false); // VERIFICANDO SE RECEBEU FOCO
    const [isFilled, SetIsFilled] = useState(false);   // VERIFICANDO SE NÃO TEM FOCO

    const {fieldName, defaultValue, error, registerField} = useField(name);//DADOS QUE SÃO MONITORADOS PELO FORM SIGNUP

    const handleInputFocus =useCallback(()=>{
        setIsFocused(true);
    },[]);

    const handleInputBlue = useCallback(() =>{ //VERIFICANDO SE INPUT ESTA VAZIO.
          setIsFocused(false); 

        if(inputRef.current?.value){ //SE VONTER UM VALUE
            SetIsFilled(true);
        }else{
            SetIsFilled(false);
        }

        // SetIsFilled(!!inputRef.current?.value);
    },[]);


    useEffect(()=>{// ASSIM QUE COMPONENTE FOR EXIBIDO EM TELA
        registerField({
            name: fieldName, // NAME NO INPUT
            ref: inputRef.current, // \ACESSO AO INPUNT NO HTML
            path: 'value',// VALUE É VALOR DIGITADO NO INPUNT
        });
    },[fieldName,registerField ]);
    
    return(

    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}> 
        {Icon && <Icon size={20}    />}
        <input 
        onFocus={handleInputFocus} // RECEBEU FOCOS
        onBlur={handleInputBlue}   //PERDEU FOCOS
        defaultValue={defaultValue} //VALOR PRADÃO
        ref={inputRef}  
        {...rest}
        />

        {error && (
        <Error title={error}> 
            <FiAlertCircle color="#c53030" size={20}/> 
        </Error>)}


   </Container>
    )
}
 
export default Input;