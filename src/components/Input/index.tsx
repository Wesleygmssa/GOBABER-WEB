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

    // SERVE PRA FAZER MANUPULAÇÃO DIRETA NO INPUTT
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false); 
    const [isFilled, SetIsFilled] = useState(false);  

    //DADOS QUE SÃO MONITORADOS PELO FORM SIGNUP
    const {fieldName, defaultValue, error, registerField} = useField(name);

    useEffect(()=>{                        //   ASSIM QUE COMPONENTE FOR EXIBIDO EM TELA
        registerField({
            name: fieldName,               //   NAME NO INPUT
            ref: inputRef.current,         //   ACESSO AO INPUNT NO HTML
            path: 'value',                 //   VALUE É VALOR DIGITADO NO INPUNT
        });
    },[fieldName,registerField ]);

    const handleInputFocus = useCallback(()=>{
        setIsFocused(true);
    },[]);

    const handleInputBlue =  useCallback(() =>{ 
           setIsFocused(false); 

        // VERIFICANDO SE INPUT ESTA VAZIO.
        if(inputRef.current?.value){ 
            SetIsFilled(true); 
        }else{
            SetIsFilled(false); 
        }

        // SetIsFilled(!!inputRef.current?.value);
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
 
        {error && ( // SE OUVER ERRO COLOCAR A ICONE
        <Error title={error}> 
            <FiAlertCircle color="#c53030" size={20}/> 
        </Error>
        )}
   </Container>

    )
}
 
export default Input;