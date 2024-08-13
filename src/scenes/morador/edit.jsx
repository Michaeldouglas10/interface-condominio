import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Button, TextField } from "@mui/material";

import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState,useEffect } from "react";
import axios from "axios";

const Team = () => {

  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8800/morador');
        const data = response.data;
  
        // Transformar dados se necessário
        const formattedData = data.map(user => ({
          id: user.idmorador,
          name: user.nome,
          tel: user.tel,
          bloco: user.bloco,
          email: user.email,
          imagem: user.imagem,
          accessLevel: user.accessLevel // Supondo que você tem um campo 'access'
        }));
  
        setUsers(formattedData);
  
        // Definir colunas
        setColumns([
          { field: 'id', headerName: 'ID', width: 20 },
          { field: 'name', headerName: 'Nome', flex: 1 },
          { field: 'tel', headerName: 'Telefone', flex:1 },
          { field: 'bloco', headerName: 'Bloco', flex: 1 },
          { field: 'email', headerName: 'Email', flex: 1 },
          { field: 'imagem', headerName: 'Imagem', flex: 1 },
          {
            field: 'edit',
            headerName: 'Editar',
            width: 150,
            renderCell: (params) => (
              <link to={`/edit${params.row.id}`} style={{ color: 'green' }}>Editar</link>
            ),
          },
          {
            field: 'remover',
            headerName: 'Remover',
            width: 150,
            renderCell: (params) => (
              <a href={`/remove/${params.row.id}`} style={{ color: 'red' }}>Remover</a>
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
  
    fetchUsers();
  }, []);


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  

  return (

    <>
    <div className="app" >
      <Sidebar isSidebar={isSidebar} />
      <main className="content" >
        <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header title="Moradores" subtitle="Tem certeza" />
      
      <Box display="flex" justifyContent="end" mt="20px">  
        <Link to={`/form/`} >
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
        <DataGrid  rows={users} columns={columns} />
      </Box>
    </Box>
    

    </main>
    </div>
  </>
  );
};

export default Team;
