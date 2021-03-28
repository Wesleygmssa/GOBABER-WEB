import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web"; //
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErros";
import Button from "../../components/Button"; //SEPRANDO POR COMPONENTE
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input"; //SEPRANDO POR COMPENTENTE
import { Container, Content, AimationContainer, Background } from "./styles";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null); //PEGAND REFERENCIA DO FORMULARIO
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          //VALIDAÇÃO USANDO YUP
          name: Yup.string().required("Nome obrigatótio"),
          email: Yup.string()
            .required("E-mail obrigatótio")
            .email("Digite um e-mail válido"),
          password: Yup.string().min(6, "No mínimo 6 dígitos"),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post("/users", data); // fazendo cadastro

        history.push("/");

        addToast({
          type: "success",
          title: "Cadastro realizado",
          description: "Você já pode fazer seu logon no GoBarber!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: "error",
          title: "error no cadastro",
          description: "Ocerreu um erro ao ao fazer cadastro, tente novamente",
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AimationContainer>
          <img src={logoImg} alt="GoBarber" />

          {/* DADOS SÃO PASSADOS PELO (useField)  @unform/core*/}
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input

              name="name"
              icon={FiUser}
              placeholder="Nome"
            />

            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit"> Cadastrar </Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
