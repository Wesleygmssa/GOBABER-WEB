import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Form} from '@unform/web'; //
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';



import Button from '../../components/Button';  //SEPRANDO POR COMPONENTE
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';    //SEPRANDO POR COMPENTENTE

import { Container, Content, Background } from './styles';


const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null); //PEGAND REFERENCIA DO FORMULARIO
 

 const handleSubmit = useCallback(async(data: object)=>{
     try {
        formRef.current?.setErrors({})
         //VALIDAÇÃO USANDO YUP
         const schema = Yup.object().shape({
             name: Yup.string().required('Nome obrigatótio'),
             email:Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
             password:Yup.string().required('Senha obrigatótoria'),
         });

         await schema.validate(data,{abortEarly:false});
         
     } catch (err) {

            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)
        }  
 },[])
 
  return  (

        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
    
                <Form  ref={formRef}  onSubmit={handleSubmit}> {/* DADOS SÃO PASSADOS PELO (useField)  */}
    
                    <h1>Faça seu cadastro</h1>
    
                    <Input name="name" icon={FiUser} placeholder="Nome" />
                    <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
    
                    <Button type="submit"> Cadastrar </Button>
    
                </Form>
    
                <a href="">
                    <FiArrowLeft />
                    Voltar para logon
                </a>
            </Content>
    
        </Container>
    );
}


export default SignUp