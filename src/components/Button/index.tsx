import React , {ButtonHTMLAttributes}from 'react';
import {Container} from './styles';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}
type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement> //TODOS ELEMENTOS DE BUTTON EX: TYPE, VALUE E <ETC className="6"></ETC>

//COMPENTENTE BUTTON
const Button: React.FC<ButtonProps> = ({children, ...rest}) => { 

      return( <Container 
                type="button" {...rest}> {/* TODAS A PROPRIEDADES DE UM BUTTON */}
                {children}  {/* NOME DO BUTTON */}
             </Container>) 
        
}
export default Button;