import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./scenes/login/login";
import Dashboard from "./scenes/dashboard";
import ListaMorador from "./scenes/listaMorador";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Quiosque from "./scenes/quiosque";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Terceiro from "./scenes/terceiro";
import Geography from "./scenes/geography";
import Morador from "./scenes/morador";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";


const Private =({Item}) =>{
  const logined = false;

  return logined > 0 ? <Item />: <login/>;
};




function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
          <main className="content">
          
            <Routes>
             
              <Route path="/" element={<Login/>} />
              <Route path="/painel" element={<Dashboard/>} />
              <Route path="/listaMorador" element={<ListaMorador/>} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/quiosque" element={<Quiosque />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terceiro" element={<Terceiro />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/morador/:id" element={<Morador />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
