import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core"; // INTERFACE QUE TEM AS TIPAGENS E TODOAS A FUNÇÕES.
import getValidationErrors from "../../utils/getValidationErros"; //FUNCÇÕES UTILS
import { Container, Content, AimationContainer, Background } from "./styles";
import * as Yup from "yup"; //BILIOTECA PARA VALIDAÇOES
import { useAuth } from "../../hooks/Auth"; //
import { useToast } from "../../hooks/Toast";
import { Link, useHistory } from "react-router-dom";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // PEGANDO REFERENCIA DO FORMULARIO E TBM PASSANDO A REFENCIA DE TIPAGEM
  const formRef = useRef<FormHandles>(null);

  // ACESSO A INFORMAÇÃO DE AUTENTICAÇÃO, PEGANDO INFORMAÇÃO DO CONTEXTO
  const { user, signIn } = useAuth();
  //Acessando toast como hooks
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        // ESQUEMA DE VALIDAÇÃO (SCHEMA)
        const schema = Yup.object().shape({
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "No mínimo 6 dígitos"),
        });

        await schema.validate(data, { abortEarly: false }); //validation
        const { email, password } = data;

        await signIn({ email, password });

        history.push("/dashboard");

        addToast({
          type: "success",
          title: "Bem vindo, ao Gobaber",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "error na autenticação",
          description:
            "Ocerreu um erro ao ao fazer login, cheque as credenciais.",
        });
      }
    },
    [signIn, addToast, history]
  );

  return (
    <Container>
      <Content>
        <AimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock} //ENVIADO ICONE PELA PROPS
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
