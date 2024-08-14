import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Axios from "axios";

import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState, useEffect } from "react";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [totalMoradores, setTotalMoradores] = useState(0);

  /* capturar os dados soma dos moradores no banco de dados */
  useEffect(() => {
    const fetchTotalMoradores = async () => {
      try {
        const response = await Axios.get('https://api-condominio.vercel.app/moradores/total');
        setTotalMoradores(response.data.total);
      } catch (error) {
        console.error("Erro ao buscar o total de moradores:", error);
      }
    };

    fetchTotalMoradores();
  }, []);

  return (   
  <>
    <div className="app" >
      <Sidebar isSidebar={isSidebar} />
      <main className="content" >
        <Topbar setIsSidebar={setIsSidebar} />
    
      <Box m="15px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="PAINEL" subtitle="Bem Vindo Ao Painel do Condominio" />

        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="110px"
          gap="15px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="60"
              subtitle="Total de Residências"
              icon={
                <HomeIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={totalMoradores}
              subtitle="Total de Moradores"
              
              
              icon={
                <PermIdentityIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        
        
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="15"
              subtitle="Total de Acessos do Dia"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
          
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="5"
              subtitle="Total de reserva Area de Lazer"
              icon={
                <AttachFileIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 8"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="10px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Acesso do Dia 
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color={colors.greenAccent[500]}
                >                
                </Typography>
              </Box>
              
            </Box>
            
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                Reserva Quiosque
              </Typography>
            </Box>
            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.txId}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>

          
          
        </Box>
      </Box>
    </main>
    </div>
  </>
  );
};

export default Dashboard;
