import React, {useState, useEffect} from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

import fetchData from './share/fetchData'

const MisTareas = () => {
    const location = useLocation();

    const themeLittle = createTheme({
        typography: {
            fontFamily: [
                'Lato', 'sans-serif'
            ].join(','),
            fontSize: 8
        }}
    );

    const [fallasBdD, setFallasBdD] = useState([])
    const [repuestoBdD, setRepuestoBdD] = useState([])
    const [operacionesBdD, setOperacionesBdD] = useState([])
    const [ordenesHoy, setOrdenesHoy] = useState(undefined)

    const getListasFalla = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/fallasMtto/getFallas/", 3000); 
        const rptaBdD = await response.json()
        setFallasBdD(JSON.parse(rptaBdD.rpta))
    }

    const getListasOperaciones = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/operacionesMtto/getOperaciones/", 3000); 
        const rptaBdD = await response.json()
        setOperacionesBdD(JSON.parse(rptaBdD.rpta))
    }

    const getListasRepuesto = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/repuestosMtto/getRepuestos/", 3000); 
        const rptaBdD = await response.json()
        setRepuestoBdD(JSON.parse(rptaBdD.rpta))
    }

    const getOrdenesHoy = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/programaciones/getOrdenesTrabajoHoy?prefijoPenal=" + location.state.props.penal, 3000); 
        const rptaBdD = await response.json()
        console.log(rptaBdD)
        setOrdenesHoy(JSON.parse(rptaBdD.rpta))
    }

    useEffect(() => {
        getListasFalla()
        getListasOperaciones()
        getListasRepuesto()
        getOrdenesHoy()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box sx={{display:"flex", width:"100%", pt:2, pb:2}}>
            <Box sx={{display:"flex", justifyContent:"center", width:"100%", p:4}}>
                <Box sx={{display:"flex", flexDirection:"column", rowGap: 2}}>
                    { ordenesHoy && 
                    ordenesHoy.ordenes.map((myOrden) => (
                    <Box sx={{display:"flex", flexDirection:"row", columnGap: 2, boxShadow: 2, border: 1}}>
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pl: 2}}>
                                <ThemeProvider theme={themeLittle}>
                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row"}}> 
                                        <b>{myOrden.anexo}</b>
                                    </Typography>
                                </ThemeProvider >
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"column", borderLeft: 1}}>
                            <Box id="tareaFallas" sx={{display:"flex", flexDirection:"row", justifyContent:"", columnGap: 2, pl: 2, borderBottom: 1}}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"70px"}}>
                                    <ThemeProvider theme={themeLittle}>
                                        <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row"}}> 
                                            <b>FALLAS</b>
                                        </Typography>
                                    </ThemeProvider >    
                                </Box>
                                <Box sx={{display:"flex", justifyContent:"right", width:"100%", flexWrap: 'wrap', borderLeft: 1, pl: 3}}>
                                        {(fallasBdD.filter((falla) => (falla.idTelefono === myOrden.tipoTelefono))).map((fallaFilter) => (        
                                            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center",}}>
                                                <ThemeProvider theme={themeLittle}>
                                                    <Typography  sx={{ display:"flex", flexDirection:"row"}}> 
                                                        {fallaFilter.descripcion}
                                                    </Typography>
                                                </ThemeProvider >
                                                <Box sx={{display:"flex", }}>
                                                <Checkbox
                                                    size="small"
                                                    checked={false}
                                                    sx={{p:"0px"}}
                                                />
                                                </Box>
                                            </Box>
                                        ))}
                                </Box>   
                            </Box>
                            <Box id="tareaOperaciones" sx={{display:"flex", flexDirection:"row", justifyContent:"", columnGap: 2, pl: 2, borderBottom: 1}}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"70px"}}>
                                    <ThemeProvider theme={themeLittle}>
                                        <Typography  sx={{ display:"flex", flexDirection:"row"}}> 
                                            <b>OPERACIONES</b>
                                        </Typography>
                                    </ThemeProvider >    
                                </Box>
                                <Box sx={{display:"flex", justifyContent:"right", width:"100%", flexWrap: 'wrap', borderLeft: 1, pl: 3}}>
                                    {(operacionesBdD.filter((operacion) => (operacion.idTelefono === myOrden.tipoTelefono))).map((opFilter) => (
                                        <Box sx={{display:"flex"}}>
                                            <ThemeProvider theme={themeLittle}>
                                                <Typography  sx={{ display:"flex", flexDirection:"row"}}> 
                                                    {opFilter.descripcion}
                                                </Typography>
                                            </ThemeProvider > 
                                            <Checkbox
                                                size="small"
                                                checked={false}
                                                sx={{p:"0px"}}
                                            />
                                        </Box>
                                    ))}   
                                </Box>
                            </Box>
                            <Box id="tareaRepuestosCambiados" sx={{display:"flex", flexDirection:"row", justifyContent:"", columnGap: 2, pl: 2, borderBottom: 1}}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"70px"}}>
                                    <ThemeProvider theme={themeLittle}>
                                        <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row"}}> 
                                            <b>CAMBIADOS</b>
                                        </Typography>
                                    </ThemeProvider >   
                                </Box>
                                <Box sx={{display:"flex", justifyContent:"right", width:"100%", flexWrap: 'wrap', borderLeft: 1, pl: 3}}>
                                    {(repuestoBdD.filter((repCambdo) => (repCambdo.idTelefono === myOrden.tipoTelefono))).map((repCambdoFilter) => (
                                        <Box sx={{display:"flex"}}>
                                            <ThemeProvider theme={themeLittle}>
                                                <Typography  sx={{ display:"flex", flexDirection:"row"}}> 
                                                    {repCambdoFilter.descripcion}
                                                </Typography>
                                            </ThemeProvider >
                                            <Checkbox
                                                size="small"
                                                checked={false}
                                                sx={{p:"0px"}}
                                            />
                                        </Box>
                                    ))}   
                                </Box>
                            </Box>
                            <Box id="tareaRepuestosRequeridos" sx={{display:"flex", flexDirection:"row", justifyContent:"", columnGap: 2, pl: 2, borderBottom: 1}}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"70px"}}>
                                    <ThemeProvider theme={themeLittle}>
                                        <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row"}}> 
                                            <b>REQUERIDOS</b>
                                        </Typography>
                                    </ThemeProvider >    
                                </Box>
                                <Box sx={{display:"flex", justifyContent:"right", width:"100%", flexWrap: 'wrap', borderLeft: 1, pl: 3}}>  
                                    {(repuestoBdD.filter((repReqdo) => (repReqdo.idTelefono === myOrden.tipoTelefono))).map((repReqdoFilter) => (
                                        <Box sx={{display:"flex", justifyContent:"center"}}>
                                            <ThemeProvider theme={themeLittle}>
                                                <Typography  sx={{ display:"flex", flexDirection:"row", justifyContent:"center"}}> 
                                                    {repReqdoFilter.descripcion}
                                                </Typography>
                                            </ThemeProvider >    
                                            <Checkbox
                                                size="small"
                                                checked={false}
                                                sx={{p:"0px"}}
                                            />
                                        </Box>
                                    ))} 
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
                </Box>
            </Box>
        </Box>
    )
}

export default MisTareas