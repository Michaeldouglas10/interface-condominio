import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";


import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Endereço",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Bairro",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Cidade",
      flex: 1,
    },
    {
      field: "address",
      headerName: "CEP",
      flex: 1,
    },
    {
      field: "city",
      headerName: "CPF",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Imagem",
      flex: 1,
    },
  ];

  return (

    <>
    <div className="app" >
      <Sidebar isSidebar={isSidebar} />
      <main className="content" >
        <Topbar setIsSidebar={setIsSidebar} />


    <Box m="20px">
      <Header
        title="Avisos"
        subtitle="Lista de avisos do condominio"
      />

      <Box display="flex" justifyContent="end" mt="20px">  
        <Link to={`/form/`} >
          <Button type="submit" color="secondary" variant="contained">
           Cadastrar Aviso
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
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>

    </main>
    </div>
    </>
  );
};

export default Contacts;
