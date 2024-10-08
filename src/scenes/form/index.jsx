import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import Axios from "axios";
import React, { useState } from "react";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagem de sucesso
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controle do Snackbar

  const handleFormSubmit = (values, { resetForm }) => {
    Axios.post("http://localhost:8800/morador", {
      nome: values.nome,
      sobrenome: values.sobrenome,
      tel: values.tel,
      email: values.email,
      bloco: values.bloco,
      rua: values.rua,
    })
    .then(response => {
      // Atualiza a mensagem de sucesso e abre o Snackbar
      setSuccessMessage("Dados salvos com sucesso!");
      setOpenSnackbar(true);
      resetForm(); // Limpa o formulário após sucesso
    })
    .catch(error => {
      console.error("Erro ao enviar os dados:", error);
    });
  };

  // Fecha o Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px">
            <Header title="CRIAR MORADOR" subtitle="Criar um Novo Morador" />
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Nome *"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nome}
                      name="nome"
                      error={!!touched.nome && !!errors.nome}
                      helperText={touched.nome && errors.nome}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Sobrenome *"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.sobrenome}
                      name="sobrenome"
                      error={!!touched.sobrenome && !!errors.sobrenome}
                      helperText={touched.sobrenome && errors.sobrenome}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Número de Contato"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.tel}
                      name="tel"
                      error={!!touched.tel && !!errors.tel}
                      helperText={touched.tel && errors.tel}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      name="email"
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Numero Bloco"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bloco}
                      name="bloco"
                      error={!!touched.bloco && !!errors.bloco}
                      helperText={touched.bloco && errors.bloco}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Rua"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.rua}
                      name="rua"
                      error={!!touched.rua && !!errors.rua}
                      helperText={touched.rua && errors.rua}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px" gap="16px">
                    <Link to={`/listaMorador/`} style={{ textDecoration: 'none' }}>
                      <Button type="button" color="warning" variant="contained">
                        Retornar
                      </Button>
                    </Link>
                    <Button type="submit" color="secondary" variant="contained">
                      Salvar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
            {/* Snackbar para mostrar mensagens de sucesso */}
            <Snackbar
              open={openSnackbar}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
            >
              <Alert onClose={handleCloseSnackbar} severity="success">
                {successMessage}
              </Alert>
            </Snackbar>
          </Box>
        </main>
      </div>
    </>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("Campo Obrigatório"),
  sobrenome: yup.string().required("Campo Obrigatório"),
  bloco: yup.string().required("Campo Obrigatório"),
  email: yup.string().email("Email inválido").required("Campo Obrigatório"),
  tel: yup.string().matches(phoneRegExp, "Número de telefone não é válido").required("Campo Obrigatório"),
  rua: yup.string().required("Campo Obrigatório"),
});

const initialValues = {
  nome: "",
  sobrenome: "",
  tel: "",
  email: "",
  bloco: "",
  rua: "",
};

export default Form;
