import React from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

import Dashboard from './dashboard'
import penales from './share/penales';

export const getNamePenal = (prefijoPenal) => {
    const penalSelected = penales.filter((penal) => 
        penal.id === Number(prefijoPenal)
    )
    return penalSelected[0].penal
}

const Plataforma = () => {
    const location = useLocation();

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Lato', 'sans-serif'
            ].join(','),
            fontSize: 20
        }}
    );

    return (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <Box sx={{display:"flex", justifyContent:"center", p:2}}>
                <ThemeProvider theme={theme}>
                    <Typography  sx={{fontWeight: 'bold'}}> 
                        PLATAFORMA DE SARA - {getNamePenal(location.state.penal)}
                    </Typography>
                </ThemeProvider>    
            </Box>
            <Box sx={{p: 5}}>
                <Dashboard prop={location.state}/>
            </Box>
        </Box>
    )
}

export default Plataforma