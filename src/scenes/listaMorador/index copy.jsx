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
import { useState } from "react";

const Team = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);


  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tel",
      headerName: "Tel",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "bloco",
      headerName: "Bloco",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "imagem",
      headerName: "Imagem",
      flex: 1,
    },
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/edit/${params.row.id}`} style={{ color: colors.greenAccent[300] }}>
          Editar
        </Link>
      ),
    },
    {
      field: "remover",
      headerName: "Remover",
      flex: 0.5,
      renderCell: (params) => (
        <Link to={`/remove/${params.row.id}`} style={{ color: colors.redAccent[300] }}>
          Remover
        </Link>
      ),
    },
    {
      field: "accessLevel",
      headerName: "Nivel de Acesso",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "sistema" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (

    <>
    <div className="app" >
      <Sidebar isSidebar={isSidebar} />
      <main className="content" >
        <Topbar setIsSidebar={setIsSidebar} />
    <Box m="20px">
      <Header title="Moradores" subtitle="Listas dos Moradores do Condominio" />
      
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
        <DataGrid  rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
    

    </main>
    </div>
  </>
  );
};

export default Team;
