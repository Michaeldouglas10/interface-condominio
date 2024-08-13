import { useTheme } from "@mui/material";
import { Box} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";


import { Container, Grid } from '@mui/material';
import ImageCard from './imageCard';



const imageData = [
  { 
    image: 'https://via.placeholder.com/150', 
    title: 'Título 1',
    subtitle: 'Subtítulo 1',
    description: 'Descrição do item 1. Aqui você pode adicionar uma descrição mais longa.'
  },
  { 
    image: 'https://via.placeholder.com/150', 
    title: 'Título 2',
    subtitle: 'Subtítulo 2',
    description: 'Descrição do item 2. Mais detalhes podem ser fornecidos aqui.'
  },
  { 
    image: 'https://via.placeholder.com/150', 
    title: 'Título 3',
    subtitle: 'Subtítulo 3',
    description: 'Descrição do item 3. Inclua informações relevantes para este item.'
  }
];

const Quiosque = () => {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  
  const [inputValues, setInputValues] = useState(
    imageData.reduce((acc, _, index) => ({ ...acc, [index]: '' }), {})
  );

  const [checkboxStates, setCheckboxStates] = useState(
    imageData.reduce((acc, _, index) => ({ ...acc, [index]: { available: false, reserved: false } }), {})
  );

  const handleInputChange = (index) => (event) => {
    setInputValues({
      ...inputValues,
      [index]: event.target.value,
    });
  };

  const handleCheckboxChange = (index, type, checked) => {
    setCheckboxStates({
      ...checkboxStates,
      [index]: {
        ...checkboxStates[index],
        [type]: checked,
      },
    });
  };


  return (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
          
        <Box m="15px">
        {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="Quiosques" subtitle="Aréa de Reserva de Quiosques" />

        </Box>
          
       
    <Container>
      <Grid container spacing={2}>
        {imageData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ImageCard
              image={data.image}
              title={data.title}
              subtitle={data.subtitle}
              description={data.description}
              inputValue={inputValues[index]}
              onInputChange={handleInputChange(index)}
              checked={checkboxStates[index]}
              onCheckboxChange={(type, checked) => handleCheckboxChange(index, type, checked)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
          </Box>
        </main>
        
      </div>
    </>
  );
};

export default Quiosque;
