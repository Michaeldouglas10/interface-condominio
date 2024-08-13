import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";


import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState } from "react";


const Terceiros = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    
    {
      field: "name",
      headerName: "Empresa",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "tel",
      headerName: "Tel",
      flex: 1,
    },
    {
      field: "tipo",
      headerName: "Tipo Serviço",
      flex: 1,
    },
    {
      field: "data_ent",
      headerName: "Data Entrada",
      flex: 1,
    },
    {
      field: "hora_ent",
      headerName: "Hora entrada",
      flex: 1,
    },
    {
      field: "hora_saida",
      headerName: "Hora Saida",
      flex: 1,
    },
    {
      field: "data_saida",
      headerName: "Data saida",
      flex: 1,
    },
    {
      field: "id_func",
      headerName: "ID_Func",
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
        title="TERCEIROS"
        subtitle="Lista Referentes dos Serviços Terceiros do Condominio"
      />
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

export default Terceiros;
