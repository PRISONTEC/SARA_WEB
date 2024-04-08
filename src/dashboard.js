import React, {useState, useEffect, useRef} from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import { DataGrid } from '@mui/x-data-grid';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DownloadIcon from '@mui/icons-material/Download';
import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import { keyframes } from "@emotion/react";
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ReactTooltip from 'react-tooltip'
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import MisTareas from './misTareas'
import MultipleSelect from './multipleSelect'
import fetchData from './share/fetchData'
import penales, {getPenalFromID} from './share/penales'
import { getNamePenal } from './plataforma'

import {ExportToExcel} from './componentes/exportarExcel'

const Dashboard = (props) => {
    const navigate = useNavigate();

    const [penal, setPenal] = useState(Number(props.prop.penal))
    const [completarReportes, setCompletarReportes] = useState(false)
    const [checkAnexosSinRevisar, setCheckAnexosSinRevisar] = useState(false)
    //const [anexosSinRevisar, setAnexosSinRevisar] = useState([])
    const anexosSinRevisar = useRef([]);
    const [statsMttos, setStatsMttos] = useState(undefined)
    const [statsRepuestos, setStatsRepuestos] = useState(undefined)
    const [reportes, setReportes] = useState([])
    const [reportesPending, setReportesPending] = useState(0)
    const [anexosPending, setAnexosPending] = useState(0)
    const [openActualizarReporte, setOpenActualizarReporte] = useState(false)
    const [reporteActualizar, setReportesActualizar] = useState(undefined)
    const [checkReporte, setCheckReporte] = useState(false)
    const [checkConsolidadoMttos, setCheckConsolidadoMttos] = useState(false)
    const [checkResumenRepuestosRequeridos, setCheckResumenRepuestosRequeridos] = useState(false)
    const [checkResumenRepuestosCambiados, setCheckResumenRepuestosCambiados] = useState(false)
    const [miReporte, setMiReporte] = useState(undefined)
    const [miReportesConsolidado, setMiReportesConsolidado] = useState(undefined)
    const [resumenRepuestosRequeridos, setResumenRepuestosRequeridos] = useState(undefined)
    const [resumenRepuestosCambiados, setResumenRepuestosCambiados] = useState(undefined)

    const [tipoTelefonoBdD, setTipoTelefonoBdD] = useState([])
    const [nuevoTipoTelefono, setNuevoTipoTelefono] = useState("")
    const [fallasBdD, setFallasBdD] = useState([])
    const [fallasFiltered, setFallasFiltered] = useState([])
    const [fallasSelected, setFallasSelected] = useState([])
    const [repuestosBdD, setRepuestoBdD] = useState([])
    const [repuestosFiltered, setRepuestosFiltered] = useState([])
    const [repuestosCambiadosSelected, setRepuestosCambiadosSelected] = useState([])
    const [repuestosRequeridosSelected, setRepuestosRequeridosSelected] = useState([])
    const [operacionesBdD, setOperacionesBdD] = useState([])
    const [operacionesFiltered, setOperacionesFiltered] = useState([])
    const [operacionesSelected, setOperacionesSelected] = useState([])

    const [readyForUpdate, setReadyForUpdate] = useState(false)
    const [actualizarReporte_W, setActualizarReporte_W] = useState(false)
    const [actualizarReporte_S, setActualizarReporte_S] = useState(false)
    const [consolidadoReporteMtto_E, setConsolidadoReporteMtto_E] = useState(false);
    const [historiaAnexo_E, setHistoriaAnexo_E] = useState(false);

    const [startFallas, setStartFallas] = useState(false)
    const [startOperaciones, setStartOperaciones] = useState(false)
    const [startRepuestos, setStartRepuestos] = useState(false)

    const [ordenesHoy, setOrdenesHoy] = useState(undefined)
    const [misReportesHechos, setMisReportesHechos] = useState([])
    const [anexoSelected, setAnexoSelected] = useState(undefined)
    const [historiaAnexo, setHistoriaAnexo] = useState(undefined)
    const [checkhistoriaAnexo, setCheckhistoriaAnexo] = useState(false)

    const [revisarMisOrdenes, setRevisarMisOrdenes] = useState(false)
    const [checkDiasMtto, setCheckDiasMtto] = useState(false)
    const [diasMttoBdD, setDiasMttoBdD] = useState([])
    const [cambiarDiasMtto, setCambiarDiasMtto] = useState(false)
    const [rowSelected, setRowSelected] = useState({})
    const [nuevoDiasMttoRapido, setNuevoDiasMttoRapido] = useState("")
    const [nuevoDiasMttoExhaustivos, setNuevoDiasMttoExhaustivos] = useState("")
    const [visualizarActualizacionDiasMtto, setVisualizarActualizacionDiasMtto] = useState(false)

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Lato', 'sans-serif'
            ].join(','),
            fontSize: 20
        }}
    );

    const themeLittle = createTheme({
        typography: {
            fontFamily: [
                'Lato', 'sans-serif'
            ].join(','),
            fontSize: 10
        }}
    );

    const formatDatePeru = (date, seprador) => {
        const year = date.getFullYear()
        const month = ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth() + 1):(date.getMonth() + 1))
        const day  = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate())

        return (year + seprador + month + seprador + day)
    }

    const [fechaIni, setFechaIni] = useState(formatDatePeru(new Date(), "-"));
    const [fechaFin, setFechaFin] = useState(formatDatePeru(new Date(), "-"));

    const filtrarData = async () => {
        const dateIni = Number(Date.parse(new Date(Number(fechaIni.split('-')[0]), Number(fechaIni.split('-')[1])-1, Number(fechaIni.split('-')[2]))))/1000
        const dateFin = Number(Date.parse(new Date(Number(fechaFin.split('-')[0]), Number(fechaFin.split('-')[1])-1, Number(fechaFin.split('-')[2]))))/1000
        
        await statsMttoSaraFiltered(penal, dateIni, dateFin)
        await statsRepuestosSaraFiltered(penal, dateIni, dateFin)
        await getMisAnexosHechos(penal, dateIni, dateFin)
    }

    const pulse = keyframes`
        to {
            box-shadow: 0 0 0 12px transparent, 0 0 0 24px rgba(227, 115, 14, 0);
    }`;

    const handleCloseCompletarReportes = () => {
        setCompletarReportes(false)
        setStartFallas(false)
        setStartOperaciones(false)
        setStartRepuestos(false)
    }

    const handleSelectedFallas = (fallas) => {
        setFallasSelected(fallas)
    }

    const handleSelectedOperaciones = (ope) => {
        setOperacionesSelected(ope)
    }

    const handleSelectedRepuestosRequeridos = (repreq) => {
        setRepuestosRequeridosSelected(repreq)
    }

    const handleSelectedRepuestosCambiados = (repcam) => {
        setRepuestosCambiadosSelected(repcam)
    }

    const handleClose = () => {
        setActualizarReporte_W(false)
    }

    const handleCloseReporte = () => {
        setActualizarReporte_S(false);
        setConsolidadoReporteMtto_E(false);
        setHistoriaAnexo_E(false)
    }

    const handleCloseAnexosSinRevisar = () => {
        setCheckAnexosSinRevisar(false)
    }

    const processData = async (data) => {
        if(data.length > 0 && data.length < 2) {
            setReportes(data)
            setReportesPending(data[0].mttos.length)
        } else if(data.length > 1) {
            setReportes(data)
            setReportesPending(data.length)
        }
    }

    const getReportesPendientes = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/pendientesMttoSara?tipoUsuario=" + props.prop.tipoUsuario + "&prefijoPenal=" + penal, 3000); 
        const rptaBdD = await response.json()
        await processData(JSON.parse(rptaBdD.rpta))
    }

    const statsMttoSara = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/statsMttoSara?prefijoPenal=" + penal + "&fechaHoraIni=-1&fechaHoraFin=-1", 3000); 
        const rptaBdD = await response.json()
        setStatsMttos(JSON.parse(rptaBdD.rpta)) 
    }

    const statsMttoSaraFiltered = async (penal, fechaIni, fechaFin) => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/statsMttoSara?prefijoPenal=" + penal + "&fechaHoraIni=" + fechaIni + "&fechaHoraFin=" + fechaFin, 3000); 
        const rptaBdD = await response.json()
        setStatsMttos(JSON.parse(rptaBdD.rpta)) 
    }

    const statsRepuestosSara = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/statsRepuestosSara?prefijoPenal=" + penal + "&fechaHoraIni=-1&fechaHoraFin=-1", 3000); 
        const rptaBdD = await response.json()
        setStatsRepuestos(JSON.parse(rptaBdD.cantRepuestos))
    }

    const diasMtto = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/diasMtto", 3000); 
        const rptaBdD = await response.json()
        console.log(rptaBdD)
        setDiasMttoBdD(rptaBdD.rpta)
    }

    const processData2 = async (data) => {
        console.log(data)
        if(data.length > 0 && data.length < 2) {
            //setAnexosSinRevisar(data)
            anexosSinRevisar.current = data
            setAnexosPending(data[0].anexosSinReporte.length)
        } else if(data.length > 1) {
            //setAnexosSinRevisar(data)
            anexosSinRevisar.current = data
            setAnexosPending(data.length)
        }
    }

    /*const getAnexosSinRevisar = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/anexosSinReporte?prefijoPenal=" + penal, 3000); 
        const rptaBdD = await response.json()
        processData2(JSON.parse(rptaBdD.rpta))
    }*/
    const getAnexosSinRevisar = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/obtenerAnexosSemanal?prefijoPenal=" + penal, 3000); 
        const rptaBdD = await response.json()
        console.log(rptaBdD)
        processData2(JSON.parse(rptaBdD.rpta))
    }

    const statsRepuestosSaraFiltered = async (penal, fechaIni, fechaFin) => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/statsRepuestosSara?prefijoPenal=" + penal + "&fechaHoraIni=" + fechaIni + "&fechaHoraFin=" + fechaFin, 3000); 
        const rptaBdD = await response.json()
        setStatsRepuestos(JSON.parse(rptaBdD.cantRepuestos));
    }

    const getListasTipoTelefono = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/tipoTelefonos/getTiposTelefonos/", 3000); 
        const rptaBdD = await response.json()
        setTipoTelefonoBdD(JSON.parse(rptaBdD.rpta))
    }

    const getListasRepuesto = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/repuestosMtto/getRepuestos/", 3000); 
        const rptaBdD = await response.json()
        setRepuestoBdD(JSON.parse(rptaBdD.rpta))
    }

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

    const epoch2Date = (epoch) => {
        var date = new Date(epoch * 1000);
        var year = date.getFullYear()
        var month = (date.getMonth() + 1) < 10 ? ('0'+(date.getMonth() + 1)) : (date.getMonth() + 1)
        var day = date.getDate() < 10 ? ('0'+(date.getDate())) : date.getDate()
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime
    }

    const epoch2DateShort = (epoch) => {
        var date = new Date(epoch * 1000);
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) < 10 ? ('0'+(date.getMonth() + 1)) : (date.getMonth() + 1);
        var day = date.getDate() < 10 ? ('0'+(date.getDate())) : date.getDate()
        var formattedTime = year + '-' + month + '-' + day;
        return formattedTime
    }

    const date2Epoch = (date) => {
        return new Date(date.split('-')[0], 
            (Number(date.split('-')[1]) - 1), 
            date.split('-')[2]).getTime() / 1000
    }

    const filtrarPorTelefono = async (idTelefono) => {
        setFallasFiltered(fallasBdD.filter((falla) => (falla.idTelefono === idTelefono && falla.estado === 1)))
        setOperacionesFiltered(operacionesBdD.filter((operacion) => (operacion.idTelefono === idTelefono && operacion.estado === 1)))
        setRepuestosFiltered(repuestosBdD.filter((repuesto) => (repuesto.idTelefono === idTelefono && repuesto.estado === 1)))
    }

    const getMisAnexosHechos = async (penal, fechaIni, fechaFin) => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/misReportesHechos?prefijoPenal=" + penal + "&fechaIni=" + fechaIni + "&fechaFin=" + fechaFin, 3000); 
        const rptaBdD = await response.json()
        setMisReportesHechos(JSON.parse(rptaBdD.resultado))
    }

    useEffect(() => {
        setStartFallas(true)
    }, [fallasFiltered])
    useEffect(() => {
        setStartOperaciones(true)
    }, [operacionesFiltered])
    useEffect(() => {
        setStartRepuestos(true)
    }, [repuestosFiltered])

    useEffect(() => {
        //getReportesPendientes();
        getListasFalla();
        getListasOperaciones();
        getListasRepuesto();
        getListasTipoTelefono();
        statsMttoSara();
        statsRepuestosSara();
        getAnexosSinRevisar();
        misAnexosProgramados(props.prop.penal)
        getMisAnexosHechos(penal, -1, -1);
        diasMtto(penal)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateReporte = async () => {
        if (readyForUpdate) {
            let idOperacionesActualizar = operacionesSelected.map((op) => (op.split(':')[0]))
            let idFallasActualizar = fallasSelected.map((falla) => (falla.split(':')[0]))
            let idRepuestosRequeridosActualizar = repuestosRequeridosSelected.map((repuesto) => (repuesto.split(':')[0]))
            let idRepuestosCambiadosActualizar = repuestosCambiadosSelected.map((repuesto) => (repuesto.split(':')[0]))

            //console.log(idOperacionesActualizar, idFallasActualizar, idRepuestosRequeridosActualizar, idRepuestosCambiadosActualizar)
            
            let params = {idReporte: reporteActualizar.id, 
                tipoTelefono: nuevoTipoTelefono, 
                idFallas: idFallasActualizar, 
                idOperaciones: idOperacionesActualizar,
                idRepuestosCambiados: idRepuestosCambiadosActualizar,
                idRepuestosRequeridos: idRepuestosRequeridosActualizar}
            
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/sara/completarReporte", params, 3000);
            let rptaBdD = await response.json()
            if (rptaBdD.rpta === "OK") {
                setActualizarReporte_S(true)
                await getReportesPendientes();
                setOpenActualizarReporte(false)
            }

        } else {
            setActualizarReporte_W(true)
        }
    }

    useEffect(() => {
        if (fallasSelected.length > 0 && operacionesSelected.length > 0) {
            setReadyForUpdate(true)
        }
    }, [fallasSelected, operacionesSelected, repuestosCambiadosSelected, repuestosRequeridosSelected])


    const TableColapse = (props) => {

        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {getNamePenal(row.prefijoPenal)}
                    </TableCell>
                    <TableCell align="right">{row.mttos.length}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Reportes
                            </Typography>
                            <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>ID Incidencia</TableCell>
                                <TableCell align="right">Anexo Reportado</TableCell>
                                <TableCell align="right">Info</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.mttos.map((mtto) => (
                                <TableRow key={mtto.fechaHora}>
                                    <TableCell component="th" scope="row">
                                        {epoch2Date(mtto.fechaHora)}
                                    </TableCell>
                                    <TableCell align="right">{mtto.id}</TableCell>
                                    <TableCell align="right">{mtto.anexoReporta}</TableCell>
                                    <TableCell align="center">{
                                        <IconButton onClick={() => {
                                                setOpenActualizarReporte(true); 
                                                setReportesActualizar(mtto);
                                            }}>
                                            <VisibilityIcon/>
                                        </IconButton>}
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    const generarExcel = (data) => {
        for (let i = 0; i < data.length; i++) {
            data[i].ultimoReporte = epoch2Date(data[i].ultimoReporte)
        }
        ExportToExcel(data, 'mantenimientosSemanal')
    }

    const TableColapse2 = (props) => {

        const [open, setOpen] = React.useState(false);
        const { row } = props;

        const [tipoTelefono, setTipoTelefono] = useState("")
        const [programarReporte, setProgramarReporte] = useState(undefined)
        const [openProgramarReporte, setOpenProgramarReporte] = useState(false)
        const [fechaProgramacion, setFechaProgramacion] = useState(formatDatePeru(new Date(), "-"));

        const [programacionReporte_S, setProgramacionReporte_S] = useState(false)
        const [programacionReporte_W, setProgramacionReporte_W] = useState(false)

        const handleClose = () => {
            setProgramacionReporte_S(false)
            setProgramacionReporte_W(false)
        }

        const enviarProgramacion = async () => {
            
            const epochProgramacion = date2Epoch(fechaProgramacion)
            let params = {anexo: programarReporte.anexoReporta, fechaHora: epochProgramacion, idTelefono: tipoTelefono}
            console.log(params)

            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/programaciones/crearOrdenTrabajo", params, 3000);
            
            let rptaBdD = await response.json()

            if (rptaBdD.rpta === "OK") {
                const index = row.anexosSinReporte.findIndex(anexo => anexo.anexoReporta === programarReporte.anexoReporta)
                row.anexosSinReporte[index].fechaProgramacion = epochProgramacion
                setProgramacionReporte_S(true)
                await getAnexosSinRevisar()
            } else {
                setProgramacionReporte_W(true)
            }
            // reiniciamos la variable  
            setFechaProgramacion(formatDatePeru(new Date(), "-"))
            setOpenProgramarReporte(false)
        }
        
        return (
            <React.Fragment>
                <Snackbar open={programacionReporte_S} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Programación registrada.
                    </Alert>
                </Snackbar>

                <Snackbar open={programacionReporte_W} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" variant="filled" sx={{ width: '100%' }}>
                        Ya se tiene una programación, REALÍCELA PRONTO.
                    </Alert>
                </Snackbar>

                { programarReporte &&
                    <Dialog
                        open={openProgramarReporte}
                        onClose={() => {setOpenProgramarReporte(false); 
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        
                        <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                            Programar Reporte {programarReporte.anexoReporta}
                        </DialogTitle>
                        <DialogContent> 
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                                <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                                        <TextField
                                            disabled
                                            required
                                            id="anexo"
                                            label="Anexo"
                                            value={programarReporte.anexoReporta}
                                        />
                                        <TextField
                                            type="date"
                                            id="fechaProgramacion"
                                            label="Fecha"
                                            value={programarReporte.fechaProgramacion?
                                                epoch2DateShort(programarReporte.fechaProgramacion):
                                                fechaProgramacion}
                                            onChange = {(evt) => setFechaProgramacion(evt.target.value)}
                                        />
                                    </Box>        
                                </Box>
                                <FormControl fullWidth>
                                    <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                    <Select
                                        labelId="label-tipo-telefono"
                                        id="label-tipoTelefono"
                                        value={tipoTelefono}
                                        label="Telefono"
                                        onChange={(evt) => {
                                            setTipoTelefono(evt.target.value); 
                                        }}
                                    >{ tipoTelefonoBdD.map((row) => (
                                        <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                    ))
                                    }
                                    </Select>
                                </FormControl>
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", columnGap: 3}}>
                                    <Button variant="contained" onClick={() => {enviarProgramacion()}}>
                                        Programar
                                    </Button>
                                </Box>
                            </Box>
                        </DialogContent>
                    </Dialog>
                }

                <TableRow sx={{ '& > *' : { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                        >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {getNamePenal(row.prefijoPenal)}
                    </TableCell>
                    <TableCell align="right">{row.anexosSinReporte.length}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Box sx={{display:"flex", justifyContent:"space-around"}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Anexo sin Reporte
                                </Typography>
                                <IconButton onClick={() => {generarExcel(row.anexosSinReporte)}}
                                    aria-label="download">
                                    <DownloadIcon />
                                </IconButton>
                            </Box>
                            <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                <TableCell><b>Anexo</b></TableCell>
                                <TableCell><b>Pabellón</b></TableCell>
                                <TableCell><b>Tipo Mtto</b></TableCell>
                                <TableCell><b>Ultimo Reporte</b></TableCell>
                                <TableCell><b>Fecha Programación</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row.anexosSinReporte.map((anexo) => (
                                    <TableRow key={anexo.fechaHora}>
                                        <TableCell align="right">{anexo.anexoReporta}</TableCell>
                                        <TableCell align="center">{anexo.pabellon}</TableCell>
                                        <TableCell align="right">{anexo.tipoMtto}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {epoch2Date(anexo.ultimoReporte)}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton onClick={() => {
                                                setOpenProgramarReporte(true)
                                                setProgramarReporte(anexo)
                                            }}>
                                                <VisibilityIcon/>
                                                { anexo.fechaProgramacion ? 
                                                    <AccessAlarmIcon color="warning"/> : 
                                                    <PriorityHighIcon color="error"/>
                                                }
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    }

    const DialogProgramacion = ({ children }) => {
        return (
            <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "100vh"
                        },
                    },
                }}
                open={checkAnexosSinRevisar}
                onClose={handleCloseAnexosSinRevisar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    MANTENIMIENTOS PARA ESTA SEMANA
                </DialogTitle>
                <DialogContent> 
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Penal</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {children} 
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        )
    }        

    const misAnexosProgramados = async (penal) => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
        "/programaciones/getOrdenesTrabajoHoy?prefijoPenal=" + penal, 3000); 
        const rptaBdD = await response.json()
        setOrdenesHoy(JSON.parse(rptaBdD.rpta))
    }

    const handleRowMisReportesHechosClick = async (row) => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/detalleReporte?idReporte=" + row.id, 3000);
        const rptaBdD = await response.json()
        setMiReporte(rptaBdD.resultado)
        setCheckReporte(true)
    }

    const getConsolidadoMtto = async () => {
        if (penal !== 0) {
            let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
                "/sara/consolidadoMtto?penal=" + penal, 3000);
            const rptaBdD = await response.json()
            setMiReportesConsolidado(JSON.parse(rptaBdD.consolidadoMttos))
            setCheckConsolidadoMttos(true)
        } else {
            // Penal no valido
            setConsolidadoReporteMtto_E(true)
        }
    }

    const getResumenRepuestosRequeridos = async () => {
        let dateIni = null;
        let dateFin = null;
        if (fechaIni === fechaFin) {
            dateIni = dateFin = -1
        } else {
            dateIni = Number(Date.parse(new Date(Number(fechaIni.split('-')[0]), Number(fechaIni.split('-')[1])-1, Number(fechaIni.split('-')[2]))))/1000
            dateFin = Number(Date.parse(new Date(Number(fechaFin.split('-')[0]), Number(fechaFin.split('-')[1])-1, Number(fechaFin.split('-')[2]))))/1000
        }

        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/resumenRepuestosRequeridos?penal=" + penal + "&fechaIni=" + dateIni + "&fechaFin=" + dateFin , 3000);
        const rptaBdD = await response.json()
        setResumenRepuestosRequeridos(JSON.parse(rptaBdD.resumenRepuestosRequeridos))
        setCheckResumenRepuestosRequeridos(true)
        
    }

    const getResumenRepuestosCambiados = async () => {
        let dateIni = null;
        let dateFin = null;
        if (fechaIni === fechaFin) {
            dateIni = dateFin = -1
        } else {
            dateIni = Number(Date.parse(new Date(Number(fechaIni.split('-')[0]), Number(fechaIni.split('-')[1])-1, Number(fechaIni.split('-')[2]))))/1000
            dateFin = Number(Date.parse(new Date(Number(fechaFin.split('-')[0]), Number(fechaFin.split('-')[1])-1, Number(fechaFin.split('-')[2]))))/1000
        }

        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/sara/resumenRepuestosCambiados?penal=" + penal + "&fechaIni=" + dateIni + "&fechaFin=" + dateFin , 3000);
        const rptaBdD = await response.json()
        setResumenRepuestosCambiados(JSON.parse(rptaBdD.resumenRepuestosCambiados))
        setCheckResumenRepuestosCambiados(true)
        
    }

    const historiaAnexos = async () => {
        console.log("heree", anexoSelected)
        if (anexoSelected) {
            let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
                "/sara/historiaAnexo?anexo=" + anexoSelected, 3000);
            const rptaBdD = await response.json()
            setHistoriaAnexo(JSON.parse(rptaBdD.rpta))
            setCheckhistoriaAnexo(true)
        } else {
            // Penal no valido
            setHistoriaAnexo_E(true)
        }
    }

    const downloadFiltered = async() => {
        console.log(misReportesHechos)
        ExportToExcel(misReportesHechos, 'misReportesHechos')

    }

    /*const DialogMisOrdenes = ({ children }) => {

        const handleCloseAnexosSinRevisar = () => {
            setRevisarMisOrdenes(false)
        }

        return (
            <Dialog
                open={revisarMisOrdenes}
                onClose={handleCloseAnexosSinRevisar}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    MIS ORDENES PARA HOY
                </DialogTitle>
                <DialogContent> 
                    {children}
                </DialogContent>
            </Dialog>
        )
    }*/

    const columnsUso = [
        { field: 'id', headerName: 'id', align:'center', headerAlign: 'center'},
        { field: 'descripcion', headerName: 'Descripción', align:'center', headerAlign: 'center'},
        { field: 'tipoTelefono', headerName: 'Telefono', align:'center', headerAlign: 'center'},
        { field: 'cantidad', headerName: 'Uso', align:'center',headerAlign: 'center'},
    ]

    const columnsMttosHechos = [
        { field: 'id', headerName: 'id', align:'center', headerAlign: 'center', width: 100,},
        { field: 'anexoReporta', headerName: 'Anexo', align:'center', headerAlign: 'center', width: 200,},
        { field: 'pab', headerName: 'Pabellon', align:'center', headerAlign: 'center', width: 200,},
        { field: 'estadoInicio', headerName: 'E° Inicial', align:'center', headerAlign: 'center', width: 200,},
        { field: 'estadoFin', headerName: 'E° Final', align:'center',headerAlign: 'center', width: 200,},
        { field: 'fechaHora', headerName: 'Fecha Reporte', align:'center',headerAlign: 'center', width: 200,},
        { field: 'tipoMtto', headerName: 'Tipo Mtto', align:'center',headerAlign: 'center', width: 200,},
    ]

    const actualizarDiasMtto = async () => {
        console.log(rowSelected.penal, nuevoDiasMttoExhaustivos, nuevoDiasMttoRapido)
        let params = {prefijoPenal: rowSelected.penal, diasRapido: nuevoDiasMttoRapido, diasExhaustivo: nuevoDiasMttoExhaustivos}
        let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
            "/sara/actualizarDiasMtto", params, 3000);
        const rptaBdD = await response.json()
        if (rptaBdD.rpta === 'OK') {
            setVisualizarActualizacionDiasMtto(true)
        }
    }

    useEffect(() => {
        if (visualizarActualizacionDiasMtto) {
            diasMtto()
            setVisualizarActualizacionDiasMtto(false)
            setCambiarDiasMtto(false);
            getAnexosSinRevisar()
        }
    }, [visualizarActualizacionDiasMtto])

    return (
        <>
        <Snackbar open={actualizarReporte_W} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning" variant="filled" sx={{ width: '100%' }}>
                Llene todos los campos necesarios
            </Alert>
        </Snackbar>

        <Snackbar open={actualizarReporte_S} autoHideDuration={2000} onClose={handleCloseReporte}>
            <Alert onClose={handleCloseReporte} severity="success" variant="filled" sx={{ width: '100%' }}>
                Se actualizó satisfactoriamente
            </Alert>
        </Snackbar>

        <Snackbar open={consolidadoReporteMtto_E} autoHideDuration={2000} onClose={handleCloseReporte}>
            <Alert onClose={handleCloseReporte} severity="error" variant="filled" sx={{ width: '100%' }}>
                Penal Inválido
            </Alert>
        </Snackbar>

        <Snackbar open={historiaAnexo_E} autoHideDuration={2000} onClose={handleCloseReporte}>
            <Alert onClose={handleCloseReporte} severity="error" variant="filled" sx={{ width: '100%' }}>
                Anexo Invalido
            </Alert>
        </Snackbar>

        {/*reporteActualizar &&
            <Dialog
                open={openActualizarReporte}
                onClose={() => {setOpenActualizarReporte(false); 
                    setNuevoTipoTelefono(""); 
                    setReadyForUpdate(false);
                    setRepuestosFiltered([]);
                    setOperacionesFiltered([]);
                    setFallasFiltered([]);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                    Completar Reporte {reporteActualizar.id}
                </DialogTitle>
                <DialogContent> 
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                        <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                            <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                                <TextField
                                    disabled
                                    required
                                    id="id"
                                    label="ID Reporte"
                                    value={reporteActualizar.id}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="fechaHora"
                                    label="Fecha"
                                    value={epoch2Date(reporteActualizar.fechaHora)}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="telefonoReporte"
                                    label="Anexo Reporte"
                                    value={reporteActualizar.anexoReporta}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                    <Select
                                        labelId="label-tipo-telefono"
                                        id="label-tipoTelefono"
                                        value={nuevoTipoTelefono}
                                        label="Telefono"
                                        onChange={(evt) => {
                                            setNuevoTipoTelefono(evt.target.value); 
                                            filtrarPorTelefono(evt.target.value);
                                        }}
                                    >{ tipoTelefonoBdD.map((row) => (
                                        <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                    ))
                                    }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{display:"flex", justifyContent:"center"}}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <MultipleSelect props={{"lista": operacionesFiltered, "etiqueta": "Operaciones", "updateData":handleSelectedOperaciones}} />
                                    <MultipleSelect props={{"lista": fallasFiltered, "etiqueta": "Fallas", "updateData":handleSelectedFallas}} />
                                    <MultipleSelect props={{"lista": repuestosFiltered, "etiqueta": "Repuestos Cambiados", "updateData":handleSelectedRepuestosCambiados}} />
                                    <MultipleSelect props={{"lista": repuestosFiltered, "etiqueta": "Repuestos Requeridos", "updateData":handleSelectedRepuestosRequeridos}} />
                                </Box>
                            </Box>
                            
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", columnGap: 3}}>
                            <Button variant="contained" onClick={() => {updateReporte()}}>
                                Completar Reporte
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        */}

        {miReporte &&
            <Dialog
                open={checkReporte}
                onClose={() => {setCheckReporte(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                    Mi Reporte {miReporte.id}
                </DialogTitle>
                <DialogContent> 
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                        <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                            
                            <Box sx={{display:"flex", justifyContent:"center"}}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <MultipleSelect props={{
                                        "lista": JSON.parse(miReporte.operaciones)?JSON.parse(miReporte.operaciones):[], 
                                        "etiqueta": "Operaciones", 
                                        "updateData":handleSelectedOperaciones}} />
                                    <MultipleSelect props={{
                                        "lista": JSON.parse(miReporte.fallas)?JSON.parse(miReporte.fallas):[], 
                                        "etiqueta": "Fallas", 
                                        "updateData":handleSelectedFallas}} />
                                    <MultipleSelect props={{
                                        "lista": JSON.parse(miReporte.repuestosCambiados)?JSON.parse(miReporte.repuestosCambiados):[], 
                                        "etiqueta": "Repuestos Cambiados", 
                                        "updateData":handleSelectedRepuestosCambiados}} />
                                    <MultipleSelect props={{
                                        "lista": JSON.parse(miReporte.repuestosRequeridos)?JSON.parse(miReporte.repuestosRequeridos):[], 
                                        "etiqueta": "Repuestos Requeridos", 
                                        "updateData":handleSelectedRepuestosRequeridos}} />
                                </Box>
                            </Box>
                            
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        }

        {miReportesConsolidado &&
            <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "850px", 
                        },
                    },
                }}
                open={checkConsolidadoMttos}
                onClose={() => {setCheckConsolidadoMttos(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                    Mantemientos Parque Telefónico
                </DialogTitle>
                <DialogContent> 
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                        <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                            <Box sx={{ width: '100%', height: 400, }}>
                                <DataGrid
                                    rows={miReportesConsolidado}
                                    columns={[
                                        {field: 'id', headerName: 'ID', align:'center', headerAlign: 'center', width: 100,},
                                        {field: 'anexoReporta', headerName: 'Anexo', align:'center', headerAlign: 'center', width: 100,},
                                        {field: 'fhUltimoMtto', headerName: 'Ultimo Mtto', align:'center', headerAlign: 'center', width: 200,},
                                        {field: 'ultimoTipoMtto', headerName: 'Ultimo Tipo Mtto', align:'center', headerAlign: 'center', width: 200,},
                                        {field: 'ultimoEstadoFin', headerName: 'Ultimo Estado Final', align:'center', headerAlign: 'center', width: 200,},
                                    ]}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>    
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        }

        {resumenRepuestosRequeridos &&
            <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "700px", 
                        },
                    },
                }}
                open={checkResumenRepuestosRequeridos}
                onClose={() => {setCheckResumenRepuestosRequeridos(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                    Resumen de Repuestos Solicitados
                </DialogTitle>
                <DialogContent> 
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                        <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                            <Box sx={{ width: '100%', height: 400, }}>
                                <DataGrid
                                    rows={resumenRepuestosRequeridos}
                                    columns={[
                                        {field: 'id', headerName: 'ID', align:'center', headerAlign: 'center', width: 100,},
                                        {field: 'repuesto', headerName: 'Repuesto', align:'center', headerAlign: 'center', width: 200,},
                                        {field: 'tipoTelefono', headerName: 'Tipo Telefono', align:'center', headerAlign: 'center', width: 200,},
                                        {field: 'cantidadSolicitada', headerName: 'Cantidad', align:'center', headerAlign: 'center', width: 100,},
                                    ]}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>    
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        }

        {resumenRepuestosCambiados &&
            <Dialog
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "700px", 
                        },
                    },
                }}
                open={checkResumenRepuestosCambiados}
                onClose={() => {setCheckResumenRepuestosCambiados(false)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                    Resumen de Repuestos Cambiados
                </DialogTitle>
                <DialogContent> 
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                        <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                            <Box sx={{ width: '100%', height: 400, }}>
                                <DataGrid
                                    rows={resumenRepuestosCambiados}
                                    columns={[
                                        {field: 'id', headerName: 'ID', align:'center', headerAlign: 'center', width: 100,},
                                        {field: 'repuesto', headerName: 'Repuesto', align:'center', headerAlign: 'center', width: 200,},
                                        {field: 'tipoTelefono', headerName: 'Tipo Telefono', align:'center', headerAlign: 'center', width: 200,},
                                        {field: 'cantidadSolicitada', headerName: 'Cantidad', align:'center', headerAlign: 'center', width: 100,},
                                    ]}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>    
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        }
        
        <Dialog
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "100%",
                        maxWidth: "700px", 
                    },
                },
            }}
            open={checkhistoriaAnexo}
            onClose={() => {setCheckhistoriaAnexo(false);
                setAnexoSelected(undefined);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{display:"flex", justifyContent:"center"}}>
                Historia de Mantenimientos
            </DialogTitle>
            <DialogContent> 
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", pt: 1, rowGap: 2}}>
                <TextField
                    onChange={(evt) => setAnexoSelected(evt.target.value)}
                    required
                    id="AnexoSolicitado"
                    label="anexo"
                    defaultValue="XXXXXX"
                />
                <Button variant="contained" onClick={()=> {historiaAnexos()}}>HISTORIA</Button>
                <Box sx={{display:"flex",justifyContent:"center", pt: 1, columnGap: 5}}>
                    <Box sx={{ width: '100%', height: 400, }}>
                        {historiaAnexo &&
                            <DataGrid
                                rows={historiaAnexo}
                                columns={[
                                    {field: 'id', headerName: 'ID', align:'center', headerAlign: 'center', width: 100,},
                                    {field: 'tipoMtto', headerName: 'Tipo Mtto', align:'center', headerAlign: 'center', width: 150,},
                                    {field: 'fechaHora', headerName: 'Hora', align:'center', headerAlign: 'center', width: 150,},
                                    {field: 'estadoInicio', headerName: 'Estado Inicial', align:'center', headerAlign: 'center', width: 100,},
                                    {field: 'estadoFin', headerName: 'Estado Final', align:'center', headerAlign: 'center', width: 100,},
                                ]}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        }
                    </Box>    
                </Box>
                </Box>
            </DialogContent>
        </Dialog>

        { rowSelected &&
        <Dialog
            open={cambiarDiasMtto}
            onClose={() => {setCambiarDiasMtto(false); 
                setNuevoDiasMttoRapido(""); 
                setNuevoDiasMttoExhaustivos(""); 
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                CONFIGURACION DIAS MTTO
            </DialogTitle>
            <DialogContent>
                <Box sx={{p: 4}}> 
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 2}}>
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="PrefijoPenal"
                            value={rowSelected.penal}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Días Mtto Rápido"
                            value={nuevoDiasMttoRapido} 
                            onChange={(evt) => setNuevoDiasMttoRapido(evt.target.value)}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Días Mtto Exhaustivo"
                            value={nuevoDiasMttoExhaustivos} 
                            onChange={(evt) => setNuevoDiasMttoExhaustivos(evt.target.value)}
                        />
                        <Button variant="contained"
                            onClick={actualizarDiasMtto}>
                            Actualizar
                        </Button>
                    </Box>
                </Box> 
            </DialogContent> 
        </Dialog>
        }
        { diasMttoBdD &&
        <Dialog
            open={checkDiasMtto}
            onClose={() => {setCheckDiasMtto(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                PROGRAMACION DE DIAS PARA MANTENIMIENTOS
            </DialogTitle>
            <DialogContent> 
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            
                            <TableCell align="center">Prefijo Penal</TableCell>
                            <TableCell align="center">Dias -> Rapido</TableCell>
                            <TableCell align="center">Dias -> Exhaustivo</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {diasMttoBdD.map( (dia) => (
                                <TableRow key={dia.penal}>
                                    <TableCell align="center">{dia.penal}</TableCell>
                                    <TableCell align="center">{dia.diasRapido}</TableCell>
                                    <TableCell align="center">{dia.diasExhaustivo}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined"
                                            onClick={() => {setCambiarDiasMtto(true); setRowSelected(dia);}}>
                                            ...
                                        </Button>
                                    </TableCell>
                                    {/*<TableCell align="center">
                                        <IconButton onClick={() => {
                                                setOpenActualizarReporte(true); 
                                                setReportesActualizar(mtto);
                                            }}>
                                            <VisibilityIcon/>
                                        </IconButton>
                                    </TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
        }

        <Dialog
            open={completarReportes}
            onClose={handleCloseCompletarReportes}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                REPORTES PENDIENTES
            </DialogTitle>
            <DialogContent> 
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Penal</TableCell>
                            <TableCell align="right">Cantidad Pendientes</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {reportes.map((row) => (
                            <TableColapse row={row} />
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>

        {checkAnexosSinRevisar &&
            <DialogProgramacion> 
                {anexosSinRevisar.current.map((row) => (
                    <TableColapse2 row={row} />
                ))}
            </DialogProgramacion>

        }
        {/* revisarMisOrdenes && 
             <DialogMisOrdenes> 
                <MisTareas props={props.prop}/>
            </DialogMisOrdenes>

        */}

        { statsMttos && statsRepuestos &&
        <Box sx={{display:"flex", flexDirection:"column", width:"100%", rowGap: 3}}>
            <Box sx={{display:"flex", width:"100%", columnGap: 2}}>
                <Box
                    sx={{display:"flex", justifyContent:"left", width:"70%", columnGap: 4}}>
                    {/*<Fab
                        onClick={() => {setCompletarReportes(true)}}
                        aria-label="save"
                        color="primary"
                        sx={{animation: [`${pulse} 1.25s infinite cubic-bezier(0.66, 0.33, 0, 1)`]}}>
                        {reportesPending}
                    </Fab>*/}
                    <Fab
                        onClick={() => {setCheckAnexosSinRevisar(true)}}
                        aria-label="save"
                        color="warning"
                        sx={{animation: [`${pulse} 1.25s infinite cubic-bezier(0.66, 0.33, 0, 1)`]}}>
                        {anexosPending}
                    </Fab>
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <AccessAlarmsIcon data-tip data-for="anexosProgramados" fontSize="large" color="info"/>
                        </Box>
                    </Box>
                    {props.prop.tipoUsuario === 1 && 
                    <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <Button onClick={() => setCheckDiasMtto(true)} 
                                variant="outlined">
                                DEFINIR DIAS MTTO
                            </Button>
                        </Box>
                    </Box>
                    }
                    <ReactTooltip id="anexosProgramados" place="bottom" effect="float">
                        {ordenesHoy && 
                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <b> Programaciones para hoy </b>

                            {ordenesHoy.ordenes ? 
                                ordenesHoy.ordenes.map((orden) => (
                                <ul>
                                    <li>{orden.anexo}</li>
                                </ul>
                                )): 
                                <b> Sin Programaciones Para Hoy </b>
                            }
                        </Box>
                        }
                    </ReactTooltip>
                </Box>
                <Box sx={{display:"flex", justifyContent:"right", columnGap: 2}}>
                    <Box sx={{display:"flex", flexDirection:"row", width:"20%"}}>
                        <FormControl fullWidth>
                            <InputLabel id="label-penales">Penal</InputLabel>
                                {props.prop.tipoUsuario === 1 ?
                                    <Select
                                        labelId="label-penal"
                                        id="label-penal"
                                        value={penal}
                                        label="Penal"
                                        onChange={(evt) => setPenal(evt.target.value)}
                                    > {penales.map((row) => ( 
                                        <MenuItem value={row.id}>{row.penal}</MenuItem>
                                    ))}
                                    </Select> : 
                                    <Select
                                        labelId="label-penal"
                                        id="label-penal"
                                        value={penal}
                                        label="Penal"
                                    > 
                                        <MenuItem value={penal}> {getPenalFromID(Number(penal))} </MenuItem>
                                    </Select>
                                }
                        </FormControl>
                    </Box>
                    
                    <TextField
                        label="Inicio"
                        type="date"
                        value={fechaIni}
                        inputProps={{ min: "2022-01-01", max: "2030-01-01" }}
                        onChange={(evt) => {setFechaIni(evt.target.value)}}
                    />
                    <TextField
                        label="Fin"
                        type="date"
                        value={fechaFin}
                        inputProps={{ min: "2022-01-01", max: "2030-01-01" }}
                        onChange={(evt) => {setFechaFin(evt.target.value)}}
                    />
                    <Button variant="outlined"
                        onClick={filtrarData}>
                        Filtrar
                    </Button>
                    <IconButton aria-label="delete" onClick={ () => downloadFiltered()}>
                        <CloudDownloadIcon />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"row", width:"100%", }}>
                <Box sx={{display: "flex", justifyContent:"space-around", width:"100%"}}>
                    <Box sx={{display: "flex", justifyContent:"center", borderRadius: 3, width: "20%", boxShadow: 2, backgroundColor:"lightblue"}}>
                        <Box 
                            onClick={() => setCheckhistoriaAnexo(true)}
                            sx={{cursor: 'pointer', display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <ThemeProvider theme={themeLittle}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white"}}> 
                                    Mtto Realizados
                                </Typography>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white", justifyContent:"center"}}> 
                                    {// los mantiniemintos terminados son iguales a los pendientes, es una bandera que se pensaba utilizar en la bdd 
                                     // pero no se utilizo, ahora los mttos se terminan en el telefono comos siempre ... 
                                     // no como se penso al inicio de esta plataforma que era desde la pagina 
                                    }
                                    {!statsMttos.stats.pendiente?0:statsMttos.stats.pendiente}
                                </Typography>
                            </ThemeProvider>
                        </Box>    
                    </Box>
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"row", width:"100%", }}>
                <Box sx={{display: "flex", justifyContent:"space-around", width:"100%"}}>
                    <Box sx={{display: "flex", justifyContent:"center", borderRadius: 3, width: "20%", boxShadow: 2, backgroundColor:"green"}}>
                        <Box 
                            onClick={() => getResumenRepuestosCambiados()}
                            sx={{cursor: 'pointer', display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <ThemeProvider theme={themeLittle}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white"}}> 
                                    Repuestos Cambiados
                                </Typography>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white", justifyContent:"center"}}> 
                                    {statsRepuestos[1].cantRepuestosCambiados}
                                </Typography>
                            </ThemeProvider>
                        </Box>    
                    </Box>
                    <Box 
                        onClick={() => getResumenRepuestosRequeridos()}
                        sx={{display: "flex", justifyContent:"center", borderRadius: 3, width: "20%", boxShadow: 2, backgroundColor:"orange"}}>
                        <Box sx={{cursor: 'pointer', display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <ThemeProvider theme={themeLittle}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white"}}> 
                                    Repuestos Requeridos
                                </Typography>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white", justifyContent:"center"}}> 
                                    {statsRepuestos[0].cantRepuestosRequeridos}
                                </Typography>
                            </ThemeProvider>
                        </Box>    
                    </Box>

                    <Box onClick={() => getConsolidadoMtto()}  
                        sx={{cursor: 'pointer', display: "flex", justifyContent:"center", borderRadius: 3, width: "20%", boxShadow: 2, backgroundColor:"gray"}}>
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <ThemeProvider theme={themeLittle}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white"}}> 
                                    Mtto Rápidos
                                </Typography>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white", justifyContent:"center"}}> 
                                    {!statsMttos.stats.mttoRapido?0:statsMttos.stats.mttoRapido}
                                </Typography>
                            </ThemeProvider>
                        </Box>    
                    </Box>

                    <Box onClick={() => getConsolidadoMtto()}  
                        sx={{cursor: 'pointer', display: "flex", justifyContent:"center", borderRadius: 3, width: "20%", boxShadow: 2, backgroundColor:"blue"}}>
                        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <ThemeProvider theme={themeLittle}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white"}}> 
                                    Mtto Exahustivos
                                </Typography>
                            </ThemeProvider>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", color:"white", justifyContent:"center"}}> 
                                    {!statsMttos.stats.mttoExahustivo?0:statsMttos.stats.mttoExahustivo}
                                </Typography>
                            </ThemeProvider>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{display:"flex", flexDirection:"column", rowGap: 2}}>
                <Box sx={{display:"flex", flexDirection:"row", width:"100%", }}>
                    <Box sx={{display: "flex", justifyContent:"space-around", width:"100%", columnGap: 2}}>
                        <Box sx={{ width: '100%', height: 400, }}>
                            <DataGrid
                                onRowClick={handleRowMisReportesHechosClick}
                                rows={misReportesHechos}
                                columns={columnsMttosHechos}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </Box>
                        {/*<Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center"}}> 
                                    Repuestos Requeridos
                                </Typography>
                            </ThemeProvider>
                            <Box sx={{ width: '100%', height: 300, }}>
                                <DataGrid
                                    rows={(statsRepuestos.repuestos.repuestosRequeridos === null) ? [] : statsRepuestos.repuestos.repuestosRequeridos}
                                    columns={columnsUso}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>
                        </Box>*/}
                        {/*<Box style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center"}}> 
                                    Repuestos Cambiados
                                </Typography>
                            </ThemeProvider>
                            <Box sx={{ width: '100%', height: 300, }}>
                                <DataGrid
                                    rows={(statsRepuestos.repuestos.repuestosCambiados === null) ? []: statsRepuestos.repuestos.repuestosCambiados}
                                    columns={columnsUso}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                />
                            </Box>
                        </Box>*/}
                    </Box>
                </Box>
            </Box>
        </Box>
        }
        </>
    )
}

export default Dashboard;