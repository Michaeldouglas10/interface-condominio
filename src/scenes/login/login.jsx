import React from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

import { FaUser, FaLock } from "react-icons/fa";

function LoginPage() {

  let navigate = useNavigate();

  const handleLogin = (values) =>   {
    Axios.post("https://api-condominio.vercel.app/login", {
      usuario_morador: values.usuario_morador,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);

      if (response.data.msg === "Usuário logado") {
        navigate("/painel");
    } else {
        // Permanecer na página inicial
        // Você pode adicionar aqui uma mensagem de erro, caso deseje
    }
           
      }).catch((error) => {
        console.error("Erro ao fazer login:", error);
        // Tratar erro de forma apropriada, como exibir uma mensagem de erro para o usuário
    });
};

  const handleRegister = (values) => {
    Axios.post("https://api-condominio.vercel.app//register", {
      usuario: values.usuario_morador,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    usuario_morador: yup
      .string()
      
      .required("O usuario é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("A senha é obrigatória"),
    confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas são diferentes")
      .required("A confirmação da senha é obrigatória"),
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="input-field">
           <Field name="usuario_morador" placeholder="Digite seu Usuario" /><FaUser className="icon" />
            <ErrorMessage component="span" name="usuario_morador" className="form-error" />
          </div>
          <div className="input-field">
          <Field name="password" type="senha" placeholder="Digite sua Senha" /> <FaLock className="icon" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <button className="button" type="submit" onClick={handleLogin}>Login</button>
        </Form>
      </Formik>

      <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Registar</a>{" "}
          </p>
        </div>
      <h1>Cadastro</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="password" type="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <div className="form-group">
            <Field name="confirmation" type="password" className="form-field" placeholder="Confirmação de senha" />
            <ErrorMessage component="span" name="confirmation" className="form-error" />
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginPage;
