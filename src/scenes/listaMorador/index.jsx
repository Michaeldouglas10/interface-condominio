import { Box, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate(); // Para navegação programática
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/morador');
        const data = response.data;

        const formattedData = data.map(user => ({
          id: user.id_morador,
          name: user.nome_morador,
          tel: user.tel_morador,
          bloco: user.id_casa,
          email: user.veiculo_morador,
          imagem: user.imagem,
          accessLevel: user.accessLevel
        }));

        setUsers(formattedData);

        setColumns([
          { field: 'id', headerName: 'ID', width: 20 },
          { field: 'name', headerName: 'Nome', flex: 1 },
          { field: 'tel', headerName: 'Telefone', flex: 1 },
          { field: 'bloco', headerName: 'Bloco', flex: 1 },
          { field: 'email', headerName: 'Email', flex: 1 },
          { field: 'imagem', headerName: 'Imagem', flex: 1 },
          {
            field: 'edit',
            headerName: 'Editar',
            width: 150,
            renderCell: (params) => (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/morador/${params.row.id}`)} // Redirecionar
              >
                Editar
              </Button>
            ),
          },
          {
            field: 'remover',
            headerName: 'Remover',
            width: 150,
            renderCell: (params) => (
              <FaTrash
                onClick={() => handleDelete(params.row.id)}
                style={{ cursor: 'pointer' }}
              />
            ),
          },
          {
            field: 'accessLevel',
            headerName: 'Nível de Acesso',
            flex: 1,
            renderCell: (params) => {
              const access = params.row.accessLevel;
              return (
                <Box
                  width="60%"
                  m="0 auto"
                  p="5px"
                  display="flex"
                  justifyContent="center"
                  backgroundColor={
                    access === 'admin'
                      ? 'green'
                      : access === 'manager'
                      ? 'blue'
                      : 'gray'
                  }
                  borderRadius="4px"
                >
                  <span>{access}</span>
                </Box>
              );
            },
          },
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    const handleDelete = async (id) => {
      try {
        console.log(`Deletando Morador com ID: ${id}`);
        const response = await axios.delete(`http://localhost:8800/morador/${id}`);
        console.log('Delete resposta:', response.data);
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      } catch (error) {
        console.error("Erro ao excluir Morador:", error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  }, []); // Sem dependências, executa apenas na montagem do componente

  return (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px">
            <Header title="Moradores" subtitle="Listas dos Moradores do Condominio" />
            <Box display="flex" justifyContent="end" mt="20px">
              <Link to={`/form/`}>
                <Button type="submit" color="secondary" variant="contained">
                  Cadastrar Morador
                </Button>
              </Link>
            </Box>
            <Box
              m="40px 0 0 0"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
              }}
            >
              <DataGrid rows={users} columns={columns} />
            </Box>
          </Box>
        </main>
      </div>
    </>
  );
};

export default Team;
