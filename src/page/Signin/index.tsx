import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';    //SEPRANDO POR COMPENTENTE
import Button from '../../components/Button';  //SEPRANDO POR COMPONENTE
import { Form } from '@unform/web'; //BLIBLIOTECA FORM
import { FormHandles } from '@unform/core'; // INTERFACE QUE TEM AS TIPAGENS E TODOAS A FUNÇÕES.
import getValidationErrors from '../../utils/getValidationErros'; //FUNCÇÕES UTILS
import { Container, Content, Background } from './styles'; //ESTILOS
import * as Yup from 'yup'; //BILIOTECA PARA VALIDAÇOES
import { useAuth } from '../../hooks/Auth'; //
import {useToast} from '../../hooks/Toast'


interface SignInFormData {
    email: string,
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);  // PEGANDO REFERENCIA DO FORMULARIO E TBM PASSANDO A REFENCIA DE TIPAGEM
    const { user,  signIn } = useAuth(); // ACESSO A INFORMAÇÃO DE AUTENTICAÇÃO, PEGANDO INFORMAÇÃO DO CONTEXTO
    const {addToast} = useToast();

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({   // ESQUEMA DE VALIDAÇÃO (SCHEMA)
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos'),
            });

            await schema.validate(data, { abortEarly: false }); // VERIFICANDO A VALIDAÇÃO DOS DADOS ESRÃO CORRETA.

         await signIn({ email: data.email, password: data.password });
        
        } catch (err) {
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }
            addToast({
                type: 'error',
                title: 'error na autenticação',
                description: 'Ocerreu um erro ao ao fazer login, cheque as credenciais.',
            });
        }
    }, [signIn, addToast]);

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="GoBarber" />

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faça seu logon</h1>

                    <Input
                        name="email"
                        icon={FiMail}
                        placeholder="E-mail"
                    />

                    <Input
                        name="password"
                        icon={FiLock}  //ENVIADO ICONE PELA PROPS
                        type="password"
                        placeholder="Senha"
                    />
                    <Button type="submit">
                        Entrar
                    </Button>

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

export default SignIn;