import React from 'react';
import { useNavigate } from "react-router-dom";
import "./login.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function LoginPage() {

  let navigate = useNavigate();

  const handleLogin = (values) =>   {
    Axios.post("http://localhost:8800/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      
      if (response.data.msg ==="Usuário logado"){
     
        navigate("/painel");
      }else{
        navigate("/");
        }
      }
    );
  };

  const handleRegister = (values) => {
    Axios.post("http://localhost:8800/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
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
          <div className="login-form-group">
           <h5>EMAIL:</h5><Field name="email" className="form-field" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="form-error" />
          </div>
          <div className="form-group">
          <h5>SENHA:</h5><Field name="password" type="password" className="form-field" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="form-error" />
          </div>
          <button className="button" type="submit" onClick={handleLogin}>Login</button>
        </Form>
      </Formik>

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
