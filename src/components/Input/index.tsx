import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react';
import {IconBaseProps} from 'react-icons';// TODAS PROPRIEDAEDS QUE ICONE DEVE TER.
import {FiAlertCircle} from 'react-icons/fi';
import { Container, Error} from './styles';
import {useField} from '@unform/core'; //RUCK PRA FORM


// TODAS PROPRIEDADE QUE JÁ EXISTE EM INPUT TRADICIONAL
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ 
      name: string;
      icon?: React.ComponentType<IconBaseProps>; //PROPS DE ICON.
}

//CRIADO COMPONENTE INPUT, 
const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) =>{ //ONDE SÃO PASSADAS AS PROPS

    const inputRef = useRef<HTMLInputElement>(null);// SERVE PRA FAZER MANUPULAÇÃO DIRETA NO INPUTT
    const [isFocused, setIsFocused] = useState(false); // VERIFICANDO SE RECEBEU FOCO
    const [isFilled, SetIsFilled] = useState(false);   // VERIFICANDO SE NÃO TEM FOCO
    const {fieldName, defaultValue, error, registerField} = useField(name);//DADOS QUE SÃO MONITORADOS PELO FORM SIGNUP

    useEffect(()=>{// ASSIM QUE COMPONENTE FOR EXIBIDO EM TELA
        registerField({
            name: fieldName, // NAME NO INPUT
            ref: inputRef.current, // \ACESSO AO INPUNT NO HTML
            path: 'value',// VALUE É VALOR DIGITADO NO INPUNT
        });
    },[fieldName,registerField ]);

    const handleInputFocus = useCallback(()=>{
        setIsFocused(true);
    },[]);

    const handleInputBlue =  useCallback(() =>{ // VERIFICANDO SE INPUT ESTA VAZIO.
           setIsFocused(false); 

        if(inputRef.current?.value){ // SE TEM ALGUM VALOR 
            SetIsFilled(true); // SE ESTA PREENCHIDO VALOR LOGIVO VERDADEIRO
        }else{
            SetIsFilled(false); // VALOR LOGIVO FALSO
        }

        SetIsFilled(!!inputRef.current?.value);
    },[]);

    return(
    <Container  isFocused={isFocused} isFilled={isFilled} isErrored={!!error}> 

        {Icon && <Icon size={20}/>} {/* SE EXISTIR ICONE */}

        <input 
        onFocus={handleInputFocus}  //  RECEBEU FOCO
        onBlur={handleInputBlue}    //  PERDEU FOCO
        defaultValue={defaultValue} //  VALOR PRADÃO
        ref={inputRef}  
        {...rest}
        />

        {error && (

        <Error title={error}> 
            <FiAlertCircle color="#c53030" size={20}/> 
        </Error>
        )}
   </Container>

    )
}
 
export default Input;