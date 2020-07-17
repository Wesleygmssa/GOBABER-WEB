
import React,{useRef, useCallback} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';    //SEPRANDO POR COMPENTENTE
import Button from '../../components/Button';  //SEPRANDO POR COMPONENTE
import {Form} from '@unform/web';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErros';
import { Container, Content, Background } from './styles';
import * as Yup from 'yup';

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null); //PEGAND REFERENCIA DO FORMULARIO
 

    const handleSubmit = useCallback(async(data: object)=>{
        try {
           formRef.current?.setErrors({})
            //VALIDAÇÃO USANDO YUP
            const schema = Yup.object().shape({

                email:Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password:Yup.string().required('Senha obrigatótoria'),
            });
   
            await schema.validate(data,{abortEarly:false});
            
        } catch (err) {
   
               const errors = getValidationErrors(err)
   
               formRef.current?.setErrors(errors)
           }  
    },[])
    

    return(

        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />
    
                <Form ref={formRef}  onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>
    
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
    
                    <Input name="password"  icon={FiLock} type="password" placeholder="Senha" />
    
                    <Button type="submit"> Entrar </Button>
    
                    <a href="forgot">Esqueci minha senha</a>
                </Form>
    
                <a href="">
                    <FiLogIn />
                Criar conta
                </a>
            </Content>
            <Background />
        </Container>
    ); 
}

export default SignIn