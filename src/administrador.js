import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useLocation } from "react-router-dom";

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Alert from '@mui/material/Alert';
import ApiIcon from '@mui/icons-material/Api';
import BuildIcon from '@mui/icons-material/Build';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { DataGrid } from '@mui/x-data-grid';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import HardwareIcon from '@mui/icons-material/Hardware';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import PasswordIcon from '@mui/icons-material/Password';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Person4Icon from '@mui/icons-material/Person4';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import PublicIcon from '@mui/icons-material/Public';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import SummarizeIcon from '@mui/icons-material/Summarize';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TextField from '@mui/material/TextField';
import TtyIcon from '@mui/icons-material/Tty';
import { useNavigate } from "react-router-dom";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import fetchData from './share/fetchData'
import penales from './share/penales'
import tiposUsuarios from './share/tiposUsuarios'

import Dashboard from './dashboard'
import IdleTimeOutHandler from './IdleTimeOutHandler';
import {ExportToExcel} from './componentes/exportarExcel'

const Administrador = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const[ isActive, setIsActive ] = useState(true)
    const[ isLogout, setLogout ] = useState(false)

    const [opSara, setOpSara] = useState(false)
    const [users, setUsers] = useState(false)
    const [reportes, setReportes] = useState(false)
    const [interfazCrearUsuario, setInterfazCrearUsuario] = useState(false)
    const [interfazCambiarContraseña, setInterfazCambiarContraseña] = useState(false)
    const [interfazDeshabilitarUsuario, setInterfazDeshabilitarUsuario] = useState(false)
    const [interfazFallas, setInterfazFallas] = useState(false)
    const [interfazOperaciones, setInterfazOperaciones] = useState(false)
    const [interfazRepuestos, setInterfazRepuestos] = useState(false)
    const [interfazTelefonos, setInterfazTelefonos] = useState(false)
    const [interfazDashboard, setInterfazDashboard] = useState(false)
    
    const [showCrearTipoTelefono, setShowCrearTipoTelefono] = useState(false)
    const [showListarTipoTelefono, setShowListarTipoTelefono] = useState(false)
    const [showActualizarTipoTelefono, setShowActualizarTipoTelefono] = useState(false)

    const [showCrearFalla, setShowCrearFalla] = useState(false)
    const [showListarFalla, setShowListarFalla] = useState(false)
    const [showActualizarFalla, setShowActualizarFalla] = useState(false)

    const [showCrearRepuesto, setShowCrearRepuesto] = useState(false)
    const [showListarRepuesto, setShowListarRepuesto] = useState(false)
    const [showActualizarRepuesto, setShowActualizarRepuesto] = useState(false)

    const [showCrearOperaciones, setShowCrearOperaciones] = useState(false)
    const [showListarOperaciones, setShowListarOperaciones] = useState(false)
    const [showActualizarOperaciones, setShowActualizarOperaciones] = useState(false)

    const [tipoTelefono, setTipoTelefono] = useState()
    const [falla, setFalla] = useState(undefined)
    const [repuesto, setRepuesto] = useState(undefined)
    const [operacion, setOperacion] = useState(undefined)
    const [dataFallaActualizar, setDataFallaActualizar] = useState(undefined)
    const [dataRepuestoActualizar, setDataRepuestoActualizar] = useState(undefined)
    const [dataOperacionActualizar, setDataOperacionActualizar] = useState(undefined)
    const [dataTipoTelefonoActualizar, setDataTipoTelefonoActualizar] = useState(undefined)

    const [tipoTelefonoBdD, setTipoTelefonoBdD] = useState([])
    const [fallasBdD, setFallasBdD] = useState([])
    const [repuestoBdD, setRepuestoBdD] = useState([])
    const [operacionesBdD, setOperacionesBdD] = useState([])

    const [crearTipoTelefono_S, setCrearTipoTelefono_S] = useState(false)
    const [crearFalla_S, setCrearFalla_S] = useState(false)
    const [crearRepuesto_S, setCrearRepuesto_S] = useState(false)
    const [crearOperacion_S, setCrearOperacion_S] = useState(false)
    
    const [eliminarOperacion_S, setEliminarOperacion_S] = useState(false)
    const [eliminarTipoTelefono_S, setEliminarTipoTelefono_S] = useState(false)
    const [eliminarRepuesto_S, setEliminarRepuesto_S] = useState(false)
    const [eliminarFalla_S, setEliminarFalla_S] = useState(false)

    const [actualizarFalla_S ,setActualizarFalla_S] = useState(false)
    const [actualizarOperacion_S ,setActualizarOperacion_S] = useState(false)
    const [actualizarRepuesto_S, setActualizarRepuesto_S] = useState(false)
    const [actualizarTipoTelefono_S, setActualizarTipoTelefono_S] = useState(false)

    const [tipoTelefono_E ,setTipoTelefono_E] = useState(false)
    const [repuesto_E ,setRepuesto_E] = useState(false)
    const [operacion_E ,setOperacion_E] = useState(false)
    const [falla_E ,setFalla_E] = useState(false)

    const [nuevaFalla, setNuevaFalla] = useState(undefined)
    const [checkedFalla, setCheckedFalla] = useState(false)
    const [nuevoRepuesto, setNuevoRepuesto] = useState(undefined)
    const [nuevaOperacion, setNuevaOperacion] = useState(undefined)
    const [checkedRepuesto, setCheckedRepuesto] = useState(false)
    const [checkedOperacion, setCheckedOperacion] = useState(false)
    const [nuevoTipoTelefono, setNuevoTipoTelefono] = useState(undefined)
    const [checkedTipoTelefono, setCheckedTipoTelefono] = useState(false)

    const [openActualizarFalla, setOpenActualizarFalla] = useState(false);
    const [openActualizarRepuesto, setOpenActualizarRepuesto] = useState(false);
    const [openActualizarOperacion, setOpenActualizarOperacion] = useState(false);
    const [openActualizarTipoTelefono, setOpenActualizarTipoTelefono] = useState(false);

    // ---------------- USUARIOS -----------------
    const [usuarioSara, setUsuarioSara] = useState("");
    const [contraseñaSara, setContraseñaSara] = useState("");
    const [checkedAdministrador, setCheckedAdministrador] = useState(false);
    const [reContraseñaSara, setReContraseñaSara] = useState("");
    const [penal, setPenal] = useState(undefined);
    const [nuevoPenal, setNuevoPenal] = useState(undefined);
    const [equalsPassword, setEqualsPassword] = useState(false);
    const [startValidacion, setStartValidacion] = useState(false);

    const [usuariosBdD, setUsuariosBdD] = useState([])
    const [dataUsuarioActualizar, setDataUsuarioActualizar] = useState(undefined)

    const [contraseñas_E ,setContraseñas_E] = useState(false)
    const [crearUsuario_E ,setCrearUsuario_E] = useState(false)
    const [crearUsuario_S ,setCrearUsuario_S] = useState(false)
    const [eliminarUsuario_S ,setEliminarUsuario_S] = useState(false)
    const [actualizarUsuario_S, setActualizarUsuario_S] = useState(false)

    const [nuevoTipoUsuario, setNuevoTipoUsuario] = useState(undefined)

    const [openActualizarUsuario, setOpenActualizarUsuario] = useState(false);
    const [openCambiarContraseñaUsuario, setOpenCambiarContraseñaUsuario] = useState(false);

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Lato', 'sans-serif'
            ].join(','),
            fontSize: 12
        }}
    );

    const themeUsuario = createTheme({
        typography: {
            fontFamily: [
                'Lato', 'sans-serif'
            ].join(','),
            fontSize: 15
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

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setCrearTipoTelefono_S(false)
        setCrearFalla_S(false)
        setCrearRepuesto_S(false)
        setActualizarFalla_S(false)
        setActualizarRepuesto_S(false)
        setCrearOperacion_S(false)
        setActualizarOperacion_S(false)
        setActualizarUsuario_S(false)
        setTipoTelefono_E(false)
        setFalla_E(false)
        setOperacion_E(false)
        setRepuesto_E(false)
        setEliminarOperacion_S(false)
        setEliminarFalla_S(false)
        setEliminarTipoTelefono_S(false)
        setEliminarRepuesto_S(false)
        setActualizarTipoTelefono_S(false)
        setContraseñas_E(false)
        setCrearUsuario_S(false)
        setEliminarUsuario_S(false)
        setCrearUsuario_E(false)
        setOpenCambiarContraseñaUsuario(false)
    };

    const toggleOp = () => {
        setOpSara(!opSara)
    }

    const toggleUser = () => {
        setUsers(!users)
    }

    const toggleReportes = () => {
        setReportes(!reportes)
    }

    const InterfazFallas = () => {
        setInterfazDashboard(false)
        setInterfazFallas(true)
        setInterfazOperaciones(false)
        setInterfazRepuestos(false)
        setInterfazCrearUsuario(false)
        setInterfazCambiarContraseña(false)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(false)

        // traer todos los tipos de telefonos
        getListasTipoTelefono();
        // traer todos los tipos de Fallas
        getListasFalla();
    }

    const InterfazOperaciones = () => {
        setInterfazDashboard(false)
        setInterfazFallas(false)
        setInterfazOperaciones(true)
        setInterfazRepuestos(false)
        setInterfazCrearUsuario(false)
        setInterfazCambiarContraseña(false)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(false)

        // traer todos los tipos de telefonos
        getListasTipoTelefono();
    }

    const InterfazRepuestos = () => {
        setInterfazDashboard(false)
        setInterfazFallas(false)
        setInterfazOperaciones(false)
        setInterfazRepuestos(true)
        setInterfazCrearUsuario(false)
        setInterfazCambiarContraseña(false)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(false)

        // traer todos los tipos de telefonos
        getListasTipoTelefono();
    }

    const InterfazTelefonos = () => {
        setInterfazDashboard(false)
        setInterfazFallas(false)
        setInterfazOperaciones(false)
        setInterfazRepuestos(false)
        setInterfazCrearUsuario(false)
        setInterfazCambiarContraseña(false)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(true)

        // traer todos los tipos de telefonos
        getListasTipoTelefono();
    }

    const IntefazDashboard = () => {
        setInterfazDashboard(true)
        setInterfazFallas(false)
        setInterfazOperaciones(false)
        setInterfazRepuestos(false)
        setInterfazCrearUsuario(false)
        setInterfazCambiarContraseña(false)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(false)
    }

    const InterfazCrearUsuario = () => {
        setInterfazDashboard(false)
        setInterfazFallas(false)
        setInterfazOperaciones(false)
        setInterfazRepuestos(false)
        setInterfazCrearUsuario(true)
        setInterfazCambiarContraseña(false)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(false)
    }

    const InterfazCambiarContraseña = () => {
        setInterfazDashboard(false)
        setInterfazFallas(false)
        setInterfazOperaciones(false)
        setInterfazRepuestos(false)
        setInterfazCrearUsuario(false)
        setInterfazCambiarContraseña(true)
        setInterfazDeshabilitarUsuario(false)
        setInterfazTelefonos(false)

        // traer todos los usuarios 
        getUsuariosSara()
    }

    const InterfazCrearTipoTelefono = () => {
        setShowCrearTipoTelefono(true)
        setShowListarTipoTelefono(false)
        setShowActualizarTipoTelefono(false) 
    }

    const InterfazListarTipoTelefono = () => {
        setShowCrearTipoTelefono(false)
        setShowListarTipoTelefono(true)
        setShowActualizarTipoTelefono(false) 
    }

    const InterfazActualizarTipoTelefono = () => {
        setShowCrearTipoTelefono(false)
        setShowListarTipoTelefono(false)
        setShowActualizarTipoTelefono(true) 
    }

    const InterfazCrearFalla = () => {
        setShowCrearFalla(true)
        setShowListarFalla(false)
        setShowActualizarFalla(false) 
    }

    const InterfazListarFalla = () => {
        setShowCrearFalla(false)
        setShowListarFalla(true)
        setShowActualizarFalla(false) 
    }

    const InterfazActualizarFalla = () => {
        setShowCrearFalla(false)
        setShowListarFalla(false)
        setShowActualizarFalla(true) 
    }

    const InterfazCrearRepuesto = () => {
        setShowCrearRepuesto(true)
        setShowListarRepuesto(false)
        setShowActualizarRepuesto(false) 
    }

    const InterfazListarRepuesto = () => {
        setShowCrearRepuesto(false)
        setShowListarRepuesto(true)
        setShowActualizarRepuesto(false) 
    }

    const InterfazActualizarRepuesto = () => {
        setShowCrearRepuesto(false)
        setShowListarRepuesto(false)
        setShowActualizarRepuesto(true) 
    }

    const InterfazCrearOperaciones = () => {
        setShowCrearOperaciones(true)
        setShowListarOperaciones(false)
        setShowActualizarOperaciones(false) 
    }

    const InterfazListarOperaciones = () => {
        setShowCrearOperaciones(false)
        setShowListarOperaciones(true)
        setShowActualizarOperaciones(false) 
    }

    const InterfazActualizarOperaciones = () => {
        setShowCrearOperaciones(false)
        setShowListarOperaciones(false)
        setShowActualizarOperaciones(true) 
    }

    const handleChangeTipoTelefono = (event) => {
        setTipoTelefono(event.target.value);
    }

    const handleChangeNuevoTipoTelefono = (event) => {
        setNuevoTipoTelefono(event.target.value);
    }

    const handleChangeNuevoFalla = (event) => {
        setNuevaFalla(event.target.value);
    }

    const handleChangeNuevoRepuesto = (event) => {
        setNuevoRepuesto(event.target.value);
    }

    const handleChangeNuevaOperacion = (event) => {
        setNuevaOperacion(event.target.value);
    }

    const crearTipoTelefono = async () => {
        if (tipoTelefono) {
            let params = {telefono: tipoTelefono}
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/configuracionesSara/tipoTelefonos/crearTiposTelefonos", params, 3000);
            let rptaBdD = await response.json()
            if(rptaBdD.rpta === "OK") setCrearTipoTelefono_S(true)
        } else {
            setTipoTelefono_E(true)
        }
        
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
        console.log(rptaBdD)
        setRepuestoBdD(JSON.parse(rptaBdD.rpta))
    }

    const crearRepuesto = async () => {
        if (repuesto) {
            let params = {descripcion: repuesto, idTelefono: tipoTelefono}
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/configuracionesSara/repuestosMtto/actualizarRepuestos", params, 3000);
            let rptaBdD = await response.json()
            if(rptaBdD.rpta === "OK") setCrearRepuesto_S(true)
        } else {
            setRepuesto_E(true)
        }
    }

    const crearFalla = async () => {
        if (falla) {
            let params = {descripcion: falla, idTelefono: tipoTelefono}
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/configuracionesSara/fallasMtto/actualizarFallas", params, 3000);
            let rptaBdD = await response.json()
            if(rptaBdD.rpta === "OK") setCrearFalla_S(true)
        } else {
            setFalla_E(true)
        }
    }

    const crearOperacion = async () => {
        if (operacion) {
            let params = {descripcion: operacion, idTelefono: tipoTelefono}
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/configuracionesSara/operacionesMtto/actualizarOperaciones", params, 3000);
            let rptaBdD = await response.json()
            if(rptaBdD.rpta === "OK") setCrearOperacion_S(true)
        } else {
            setOperacion_E(true)
        }
    }

    const eliminarOperacion = async (idOperacion) => {
        let params = {id: idOperacion}
        let response = await fetchData.deleteDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/operacionesMtto/delOperaciones", params, 3000);
        let rptaBdD = await response.json()
        if(rptaBdD.rpta === "OK") {
            setEliminarOperacion_S(true)
            getListasOperaciones()
        }
    }

    const eliminarFalla = async (idFalla) => {
        let params = {id: idFalla}
        let response = await fetchData.deleteDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/fallasMtto/delFallas", params, 3000);
        let rptaBdD = await response.json()
        if(rptaBdD.rpta === "OK") {
            setEliminarFalla_S(true)
            getListasFalla()
        }
    }

    const eliminarTipoTelefono = async (idTipoTelefono) => {
        let params = {id: idTipoTelefono}
        let response = await fetchData.deleteDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/tipoTelefonos/delTipoTelefonos", params, 3000);
        let rptaBdD = await response.json()
        if(rptaBdD.rpta === "OK") {
            setEliminarTipoTelefono_S(true)
            getListasTipoTelefono()
        }
    }

    const eliminarRepuesto = async (idRepuesto) => {
        let params = {id: idRepuesto}
        let response = await fetchData.deleteDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/repuestosMtto/delRepuestos", params, 3000);
        let rptaBdD = await response.json()
        if(rptaBdD.rpta === "OK") {
            setEliminarRepuesto_S(true)
            getListasRepuesto()
        }
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
        console.log(rptaBdD)
        setOperacionesBdD(JSON.parse(rptaBdD.rpta))
    }

    useEffect(() => {
        if (showListarTipoTelefono || showActualizarTipoTelefono) {
            getListasTipoTelefono()
        }
    },[showListarTipoTelefono, showActualizarTipoTelefono])
    

    useEffect(() => {
        if (showListarFalla || showActualizarFalla) getListasFalla()
    },[showListarFalla, showActualizarFalla])

    useEffect(() => {
        if (showListarRepuesto || showActualizarRepuesto) getListasRepuesto()
    },[showListarRepuesto, showActualizarRepuesto])

    useEffect(() => {
        if (showListarOperaciones || showActualizarOperaciones) getListasOperaciones()
    },[showListarOperaciones, showActualizarOperaciones])

    const intefazActualizarFalla = (datos) => {
        handleClickOpenDialogAF()
    }

    const intefazActualizarOperacion = (datos) => {
        handleClickOpenDialogAO()
    }

    const intefazActualizarTipoTelefono = (datos) => {
        handleClickOpenDialogATP()
    }

    const intefazActualizarRepuesto = (datos) => {
        handleClickOpenDialogAR()
    }

    const handleClickOpenDialogAF = () => {
        setOpenActualizarFalla(true);
    };

    const handleClickOpenDialogAO = () => {
        setOpenActualizarOperacion(true);
    };

    const handleClickOpenDialogAR = () => {
        setOpenActualizarRepuesto(true);
    }

    const handleClickOpenDialogATP = () => {
        setOpenActualizarTipoTelefono(true);
    }
    
    const handleCloseDialogAF = () => {
        setOpenActualizarFalla(false);
    };

    const handleCloseDialogATP = () => {
        setOpenActualizarTipoTelefono(false);
    };

    const handleCloseDialogAR = () => {
        setOpenActualizarRepuesto(false);
    };

    const handleCloseDialogAO = () => {
        setOpenActualizarOperacion(false);
    };

    const actualizarFalla = async (idFalla, descripcion, idTelefono) => {
        let params = {id: idFalla, 
            descripcion: nuevaFalla?nuevaFalla:descripcion, 
            idTelefono: nuevoTipoTelefono?nuevoTipoTelefono:idTelefono, 
            estado: checkedFalla}
        
        let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/fallasMtto/actualizarFallas", params, 3000);
        let rptaBdD = await response.json()
        console.log(rptaBdD);
        if(rptaBdD.rpta === "OK") setActualizarFalla_S(true)
        getListasFalla()
    }

    const actualizarRepuesto = async (idRepuesto, descripcion, idTelefono) => {
        let params = {id: idRepuesto, 
            descripcion: nuevoRepuesto?nuevoRepuesto:descripcion, 
            idTelefono: nuevoTipoTelefono?nuevoTipoTelefono:idTelefono, 
            estado: checkedRepuesto}
        
        let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/repuestosMtto/actualizarRepuestos", params, 3000);
        let rptaBdD = await response.json()
        console.log(rptaBdD);
        if(rptaBdD.rpta === "OK") setActualizarRepuesto_S(true)
        getListasRepuesto()
    }

    const actualizarOperacion = async (idOperacion, descripcion, idTelefono) => {
        let params = {id: idOperacion, 
            descripcion: nuevaOperacion?nuevaOperacion:descripcion, 
            idTelefono: nuevoTipoTelefono?nuevoTipoTelefono:idTelefono, 
            estado: checkedOperacion}
        
        let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/operacionesMtto/actualizarOperaciones", params, 3000);
        let rptaBdD = await response.json()
        console.log(rptaBdD);
        if(rptaBdD.rpta === "OK") setActualizarOperacion_S(true)
        getListasOperaciones()
    }

    const actualizarTipoTelefono = async (idTipoTelefono, nombreTelefonos) => {
        let params = {id: idTipoTelefono, 
            nombreTelefonos: nuevoTipoTelefono?nuevoTipoTelefono:nombreTelefonos, 
            estado: checkedTipoTelefono}

        console.log(params)
        
        let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
            "/configuracionesSara/tipoTelefonos/actualizarTiposTelefonos", params, 3000);
        let rptaBdD = await response.json()
        console.log(rptaBdD);
        if(rptaBdD.rpta === "OK") setActualizarTipoTelefono_S(true)
        getListasTipoTelefono()
    }

    // ----------- USUARIOS SARA ------------

    const settingUsuarioSara = (evt) => {
        setUsuarioSara(evt.target.value);
    }

    const settingContraseñaSara = (evt) => {
        setContraseñaSara(evt.target.value)
    }

    const settingReContraseñaSara = (evt) => {
        setReContraseñaSara(evt.target.value)
    }

    const setCheckingOperacion = (evt) => {
        setCheckedAdministrador(evt.target.checked)
    }

    const handleChangePenal = (evt) => {
        setPenal(evt.target.value)
    }

    const crearUsuarioSara = async () => {
        if (usuarioSara === "" || contraseñaSara === "" || reContraseñaSara === "" ) {
            setContraseñas_E(true)
            setUsuarioSara("")
            setContraseñaSara("")
            setReContraseñaSara("")
        } else {
            if (!equalsPassword) {
                setContraseñas_E(true)
            } else {
                let params = {contrasena: contraseñaSara, username: usuarioSara, 
                    tipoUsuario: checkedAdministrador?1:0, penal: penal?penal:101}
                console.log(params)
                let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                    "/login/crearUsuario", params, 3000);
                let rptaBdD = await response.json()
                console.log(rptaBdD)
                if(rptaBdD.rpta === "OK") setCrearUsuario_S(true)
                else setCrearUsuario_E(true)
                setUsuarioSara("")
                setContraseñaSara("")
                setReContraseñaSara("")
                setEqualsPassword(false)
            }
        }
    }

    const getUsuariosSara = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/login/getUsuarios/", 3000); 
        const rptaBdD = await response.json()
        console.log(rptaBdD)
        setUsuariosBdD(JSON.parse(rptaBdD.rpta))
    }

    const interfazActualizarUsuario = (datos) => {
        handleClickOpenDialogAU()
    }

    const handleClickOpenDialogAU = () => {
        setOpenActualizarUsuario(true);
    }

    const handleCloseDialogAU = () => {
        setOpenActualizarUsuario(false);
        setNuevoTipoUsuario(undefined);
        setNuevoPenal(undefined);
    };

    const handleClickOpenDialogCCU = () => {
        setOpenCambiarContraseñaUsuario(true)
    }

    const handleCloseDialogCCU = () => {
        setOpenCambiarContraseñaUsuario(false)
        setContraseñaSara("")
        setReContraseñaSara("")
        setEqualsPassword(false)
    }

    const handleChangeNuevoTipoUsuario = (event) => {
        console.log(event.target.value)
        setNuevoTipoUsuario(event.target.value);
    }

    const handleChangeNuevoPenal = (event) => {
        setNuevoPenal(event.target.value);
    }

    const getPrefijoPenal = (nombrePenal) => {
        for(let penal of penales) {
            if (penal.penal === nombrePenal) {
                return penal.id
            }
        }
    }

    const getIDTipoUsuario = (tipoUsuario) => {
        if (tipoUsuario === "ADMIN") {
            return 1
        } else {
            return 0
        }
    }

    const actualizarUsuario = async (data) => {
        let params = {id: data.id, 
            penal: nuevoPenal?nuevoPenal:getPrefijoPenal(data.penal), 
            usuario: data.username, 
            tipoUsuario: nuevoTipoUsuario?nuevoTipoUsuario:getIDTipoUsuario(data.tipoUsuario==="ADMIN")}
        
        let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
            "/login/updateUsuario/", params, 3000);
        let rptaBdD = await response.json()
        
        if(rptaBdD.rpta === "OK") setActualizarUsuario_S(true)
        getUsuariosSara()
        
    }

    const cambiarContraseña = async (data) => {
        console.log(data)
        if (contraseñaSara === "" || reContraseñaSara === "" ) {
            setContraseñas_E(true)
            setUsuarioSara("")
            setContraseñaSara("")
            setReContraseñaSara("")
        } else {
            if (!equalsPassword) setContraseñas_E(true)
            let params = {id: data.id, 
                nuevaContrasena: contraseñaSara}
            
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/login/cambiarContrasena/", params, 3000);
            let rptaBdD = await response.json()
            console.log(rptaBdD);
            if(rptaBdD.rpta === "OK") setActualizarRepuesto_S(true)
            setContraseñaSara("")
            setReContraseñaSara("")
        }
    }

    const eliminarUsuario = async (data) => {
        console.log(data)
        let params = {id: data.id}
        let response = await fetchData.deleteDataPromise("http://192.237.253.176:2700", 
            "/login/delUsuer/", params, 3000);
        let rptaBdD = await response.json()
        if(rptaBdD.rpta === "OK") {
            setEliminarUsuario_S(true)
            getUsuariosSara()
            setOpenActualizarUsuario(false);
        }
        
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

    const downloadProgresoMttos = async () => {
        let response = await fetchData.getDataPromise("http://192.237.253.176:2700", 
            "/reportes/progresoMttos/", 3000); 
        const rptaBdD = await response.json()
        
        const data = JSON.parse(rptaBdD.avanceMttos)
        console.log(data)

        for (let i = 0; i < data.length; i++) {
            data[i].fechaInicio = epoch2Date(data[i].fechaInicio)
            data[i].fechaFin = epoch2Date(data[i].fechaFin)
        }
        ExportToExcel(data, 'avanceReporteMttos')
    }

    // ---------------------------------------------

    useEffect (() => {
        if (contraseñaSara !== "" && reContraseñaSara !== "") {
            setStartValidacion(true)
            if (contraseñaSara === reContraseñaSara) {
                setEqualsPassword(true)
            } else {
                setEqualsPassword(false)
            }
        } else {
            setStartValidacion(false)
        }
    }, [contraseñaSara, reContraseñaSara])

    const columnsFallas = [
        { field: 'id', headerName: 'ID', width: 20},
        { field: 'descripcion', headerName: 'Falla', width: 200 },
        { field: 'nombreTelefono', headerName: 'Telefono', width: 100 },
        { field: 'idTelefono', headerName: 'idTelefono', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
    ];

    const columnsRepuestos = [
        { field: 'id', headerName: 'ID', width: 20},
        { field: 'descripcion', headerName: 'Repuesto', width: 200 },
        { field: 'nombreTelefono', headerName: 'Telefono', width: 100 },
        { field: 'idTelefono', headerName: 'idTelefono', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
    ];

    const columnsOperaciones = [
        { field: 'id', headerName: 'ID', width: 20},
        { field: 'descripcion', headerName: 'Operacion', width: 200 },
        { field: 'nombreTelefono', headerName: 'Telefono', width: 100 },
        { field: 'idTelefono', headerName: 'idTelefono', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
    ];
    
    const columnsFallasActualizar = [
        { field: 'id', headerName: 'ID', width: 20,},
        { field: 'descripcion', headerName: 'Falla', width: 200 },
        { field: 'nombreTelefono', headerName: 'Telefono', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
    ];

    const columnsRepuestosActualizar = [
        { field: 'id', headerName: 'ID', width: 20,},
        { field: 'descripcion', headerName: 'Repuesto', width: 200 },
        { field: 'nombreTelefono', headerName: 'Telefono', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
    ];

    const columnsOperacionesActualizar = [
        { field: 'id', headerName: 'ID', width: 20,},
        { field: 'descripcion', headerName: 'Operacion', width: 200 },
        { field: 'nombreTelefono', headerName: 'Telefono', width: 100 },
        { field: 'estado', headerName: 'Estado', width: 100 },
    ];

    const columnsTiposTelefonoActualizar = [
        { field: 'id', headerName: 'ID', width: 100, align:'center', headerAlign: 'center'},
        { field: 'nombreTelefonos', headerName: 'Telefono', width: 100, align:'center',headerAlign: 'center'},
        { field: 'estado', headerName: 'Estado', width: 100, align:'center',headerAlign: 'center'},
    ]

    // ------ USUARIOS -------

    const columnsUsuariosActualizar = [
        { field: 'id', headerName: 'ID', width: 100, align:'center', headerAlign: 'center'},
        { field: 'tipoUsuario', headerName: 'Tipo Usuario', width: 200, align:'center',headerAlign: 'center'},
        { field: 'username', headerName: 'Usuario', width: 300, align:'center',headerAlign: 'center'},
        { field: 'penal', headerName: 'Penal', width: 100, align:'center',headerAlign: 'center'},
    ]

    const doLoginAgain = () => {
        console.log("Login")
        navigate('/', {})
    }

    return (
        <>

        <IdleTimeOutHandler 
            onActive={()=>{setIsActive(true)}} 
            onIdle={()=>{setIsActive(false)}}
            onLogout={()=>{setLogout(true)}}
            doLoginAgain={() => {doLoginAgain()}}
        />

        <Snackbar open={crearTipoTelefono_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Tipo Telefono Creado
            </Alert>
        </Snackbar>

        <Snackbar open={tipoTelefono_E} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Tipo Telefono Inválido
            </Alert>
        </Snackbar>

        <Snackbar open={actualizarTipoTelefono_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Tipo Telefono Actualizado
            </Alert>
        </Snackbar>

        <Snackbar open={eliminarTipoTelefono_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Tipo Telefono Eliminado
            </Alert>
        </Snackbar>

        <Snackbar open={crearFalla_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Falla Creada
            </Alert>
        </Snackbar>

        <Snackbar open={actualizarFalla_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Falla Actualizada
            </Alert>
        </Snackbar>

        <Snackbar open={falla_E} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Falla Inválida
            </Alert>
        </Snackbar>

        <Snackbar open={eliminarFalla_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Falla Eliminada
            </Alert>
        </Snackbar>

        <Snackbar open={crearOperacion_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Operación Creada
            </Alert>
        </Snackbar>

        <Snackbar open={actualizarOperacion_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Operacion Actualizada
            </Alert>
        </Snackbar>

        <Snackbar open={operacion_E} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Operacion Inválida
            </Alert>
        </Snackbar>

        <Snackbar open={eliminarOperacion_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Operación Eliminada
            </Alert>
        </Snackbar>

        <Snackbar open={crearRepuesto_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Repuesto Creado
            </Alert>
        </Snackbar>

        <Snackbar open={repuesto_E} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Repuesto Inválido
            </Alert>
        </Snackbar>

        <Snackbar open={actualizarRepuesto_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Repuesto Actualizado
            </Alert>
        </Snackbar>

        <Snackbar open={eliminarRepuesto_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Repuesto Eliminado
            </Alert>
        </Snackbar>

        {/* USUARIOS */}

        <Snackbar open={contraseñas_E} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Usuario o Contraseña Invalidas
            </Alert>
        </Snackbar>

        <Snackbar open={crearUsuario_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Usuario Creado
            </Alert>
        </Snackbar>

        <Snackbar open={eliminarUsuario_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Usuario Eliminado
            </Alert>
        </Snackbar>

        <Snackbar open={crearUsuario_E} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                Error en la creación
            </Alert>
        </Snackbar>

        <Snackbar open={actualizarUsuario_S} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Usuario Actualizado
            </Alert>
        </Snackbar>

        <Dialog
            open={openActualizarFalla}
            onClose={handleCloseDialogAF}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Actualización de una Falla
            </DialogTitle>
            <DialogContent>
                {dataFallaActualizar && 
                <Box sx={{display:"flex",justifyContent:"center", pt: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                        <TextField
                            disabled
                            required
                            id="id"
                            label="ID Falla"
                            value={dataFallaActualizar.row.id}
                        />
                        <TextField
                            required
                            id="oldDescripcion"
                            label="Falla Actual"
                            onChange={handleChangeNuevoFalla}
                            defaultValue={dataFallaActualizar.row.descripcion}
                            value={nuevaFalla}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                <Select
                                    labelId="label-tipo-telefono"
                                    id="label-tipoTelefono"
                                    defaultValue={dataFallaActualizar.row.idTelefono}
                                    value={nuevoTipoTelefono}
                                    label="Telefono"
                                    onChange={handleChangeNuevoTipoTelefono}
                                >{ tipoTelefonoBdD.map((row) => (
                                    <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent: "center", columnGap:0}}>
                            <Checkbox
                                label="habilitado"
                                checked={checkedFalla}
                                onChange={(evt) => {setCheckedFalla(evt.target.checked)}}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <Typography >Habilitado</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"row", columnGap: 3}}>
                            <Button variant="contained" 
                                onClick={() => {
                                    actualizarFalla(dataFallaActualizar.row.id, dataFallaActualizar.row.descripcion, 
                                        dataFallaActualizar.row.idTelefono)}} >
                                Actualizar
                            </Button>
                            <Button variant="contained" color="error"
                                    onClick={() => {
                                        eliminarFalla(dataFallaActualizar.row.id)}} >
                                    Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Box>}
            </DialogContent>
        </Dialog>

        <Dialog
            open={openActualizarTipoTelefono}
            onClose={handleCloseDialogATP}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Actualización de una Tipo Telefono
            </DialogTitle>
            <DialogContent>
                {dataTipoTelefonoActualizar && 
                <Box sx={{display:"flex",justifyContent:"center", pt: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                        <TextField
                            disabled
                            required
                            id="id"
                            label="ID Tipo Telefono"
                            value={dataTipoTelefonoActualizar.row.id}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                <Select
                                    labelId="label-tipo-telefono"
                                    id="label-tipoTelefono"
                                    defaultValue={dataTipoTelefonoActualizar.row.id}
                                    value={nuevoTipoTelefono}
                                    label="Telefono"
                                    onChange={handleChangeNuevoTipoTelefono}
                                >{ tipoTelefonoBdD.map((row) => (
                                    <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent: "center", columnGap:0}}>
                            <Checkbox
                                label="habilitado"
                                checked={checkedTipoTelefono}
                                onChange={(evt) => {setCheckedTipoTelefono(evt.target.checked)}}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <Typography >Habilitado</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"row", columnGap: 3}}>
                            <Button variant="contained" 
                                onClick={() => {
                                    actualizarTipoTelefono(
                                        dataTipoTelefonoActualizar.row.id, dataTipoTelefonoActualizar.row.nombreTelefonos)}} >
                                Actualizar
                            </Button>
                            <Button variant="contained" color="error"
                                onClick={() => {
                                    eliminarTipoTelefono(dataTipoTelefonoActualizar.row.id)}} >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Box>}
            </DialogContent>
        </Dialog>

        <Dialog
            open={openActualizarRepuesto}
            onClose={handleCloseDialogAR}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Actualización de un Repuesto
            </DialogTitle>
            <DialogContent>
                {dataRepuestoActualizar && 
                <Box sx={{display:"flex",justifyContent:"center", pt: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                        <TextField
                            disabled
                            required
                            id="id"
                            label="ID Repuesto"
                            value={dataRepuestoActualizar.row.id}
                        />
                        <TextField
                            required
                            id="oldDescripcion"
                            label="Repuesto Actual"
                            onChange={handleChangeNuevoRepuesto}
                            defaultValue={dataRepuestoActualizar.row.descripcion}
                            value={nuevoRepuesto}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                <Select
                                    labelId="label-tipo-telefono"
                                    id="label-tipoTelefono"
                                    defaultValue={dataRepuestoActualizar.row.idTelefono}
                                    value={nuevoTipoTelefono}
                                    label="Telefono"
                                    onChange={handleChangeNuevoTipoTelefono}
                                >{ tipoTelefonoBdD.map((row) => (
                                    <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent: "center", columnGap:0}}>
                            <Checkbox
                                label="habilitado"
                                checked={checkedRepuesto}
                                onChange={(evt) => {setCheckedRepuesto(evt.target.checked)}}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <Typography >Habilitado</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"row", columnGap: 3}}>
                            <Button variant="contained" 
                                onClick={() => {
                                    actualizarRepuesto(dataRepuestoActualizar.row.id, dataRepuestoActualizar.row.descripcion, 
                                        dataRepuestoActualizar.row.idTelefono)}} >
                                Actualizar
                            </Button>
                            <Button variant="contained" color="error"
                                onClick={() => {
                                    eliminarRepuesto(dataRepuestoActualizar.row.id)}} >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Box>}
            </DialogContent>
        </Dialog>

        <Dialog
            open={openActualizarOperacion}
            onClose={handleCloseDialogAO}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Actualización de una Operación
            </DialogTitle>
            <DialogContent>
                {dataOperacionActualizar && 
                <Box sx={{display:"flex",justifyContent:"center", pt: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                        <TextField
                            disabled
                            required
                            id="id"
                            label="ID Operacion"
                            value={dataOperacionActualizar.row.id}
                        />
                        <TextField
                            required
                            id="oldDescripcion"
                            label="Operacion Actual"
                            onChange={handleChangeNuevaOperacion}
                            defaultValue={dataOperacionActualizar.row.descripcion}
                            value={nuevaOperacion}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                <Select
                                    labelId="label-tipo-telefono"
                                    id="label-tipoTelefono"
                                    defaultValue={dataOperacionActualizar.row.idTelefono}
                                    value={nuevoTipoTelefono}
                                    label="Telefono"
                                    onChange={handleChangeNuevoTipoTelefono}
                                >{ tipoTelefonoBdD.map((row) => (
                                    <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent: "center", columnGap:0}}>
                            <Checkbox
                                label="habilitado"
                                checked={checkedOperacion}
                                onChange={(evt) => {setCheckedOperacion(evt.target.checked)}}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <Typography >Habilitado</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:"flex", flexDirection:"row", columnGap: 3}}>
                            <Button variant="contained" 
                                onClick={() => {
                                    actualizarOperacion(dataOperacionActualizar.row.id, dataOperacionActualizar.row.descripcion, 
                                        dataOperacionActualizar.row.idTelefono)}} >
                                Actualizar
                            </Button>
                            <Button variant="contained" color="error"
                                onClick={() => {
                                    eliminarOperacion(dataOperacionActualizar.row.id)}} >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Box>}
            </DialogContent>
        </Dialog>

        <Dialog
            open={openActualizarUsuario}
            onClose={handleCloseDialogAU}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Actualización de un Usuario
            </DialogTitle>
            <DialogContent>
                {dataUsuarioActualizar && 
                <Box sx={{display:"flex",justifyContent:"center", pt: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                        <TextField
                            disabled
                            required
                            id="id"
                            label="ID Usuario"
                            value={dataUsuarioActualizar.row.id}
                        />
                        <TextField
                            disabled
                            required
                            id="usuario"
                            label="Usuario"
                            value={dataUsuarioActualizar.row.username}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="label-tipo-user">Tipo User</InputLabel>
                                <Select
                                    labelId="label-tipo-User"
                                    id="label-tipoUser"
                                    value={(nuevoTipoUsuario !== undefined) ? nuevoTipoUsuario : 
                                        getIDTipoUsuario(dataUsuarioActualizar.row.tipoUsuario)}
                                    label="tipoUsuario"
                                    onChange={handleChangeNuevoTipoUsuario}
                                >{ tiposUsuarios.map((row) => (
                                    <MenuItem value={row.tipo}>{row.nombre}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="label-penal">Penal</InputLabel>
                                <Select
                                    labelId="label-penal"
                                    id="label-penal"
                                    value={nuevoPenal || getPrefijoPenal(dataUsuarioActualizar.row.penal)}
                                    label="penal"
                                    onChange={handleChangeNuevoPenal}
                                >{ penales.map((row) => (
                                    <MenuItem value={row.id}>{row.penal}</MenuItem>
                                ))
                                }
                            </Select>
                        </FormControl>
                        <Box sx={{display:"flex", flexDirection:"row", columnGap: 3}}>
                            <Button variant="contained" 
                                onClick={() => {
                                    actualizarUsuario(dataUsuarioActualizar.row)}} >
                                Actualizar
                            </Button>
                            <Button variant="contained" color="error"
                                onClick={() => {
                                    eliminarUsuario(dataUsuarioActualizar.row)}} >
                                Eliminar
                            </Button>
                        </Box>
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <Button variant="contained" color="warning"
                                onClick={() => {
                                    handleClickOpenDialogCCU()
                                }}>
                                Cambiar Contraseña
                            </Button>
                        </Box>
                    </Box>
                </Box>}
            </DialogContent>
        </Dialog>

        <Dialog
            open={openCambiarContraseñaUsuario}
            onClose={handleCloseDialogCCU}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Cambiar Contraseña Usuario
            </DialogTitle>
            <DialogContent>
                {dataUsuarioActualizar && 
                <Box sx={{display:"flex",justifyContent:"center", pt: 1}}>
                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 4}}>
                        <TextField
                            disabled
                            required
                            id="id"
                            label="ID Usuario"
                            value={dataUsuarioActualizar.row.id}
                        />
                        <TextField
                            disabled
                            required
                            id="usuario"
                            label="Usuario"
                            value={dataUsuarioActualizar.row.username}
                        />
                        <TextField
                            required
                            id="password"
                            type="password"
                            label="Contraseña"
                            value={contraseñaSara}
                            onChange={settingContraseñaSara}
                        />
                        <TextField
                            required
                            id="rePassword"
                            type="password"
                            label="Repetir Contraseña"
                            value={reContraseñaSara}
                            onChange={settingReContraseñaSara}
                        />
                        { startValidacion && (
                            !equalsPassword ? (
                            <Box>
                                <ThemeProvider theme={themeLittle}>
                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center", color:"red"}}> 
                                        contraseñas no coinciden
                                    </Typography>
                                </ThemeProvider>
                            </Box>)
                            :
                            (<Box>
                                <ThemeProvider theme={themeLittle}>
                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center", color:"green"}}> 
                                        contraseñas coinciden
                                    </Typography>
                                </ThemeProvider>
                            </Box> )
                            )
                        }
                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            <Button variant="contained" 
                                color="success"
                                onClick={() => {cambiarContraseña(dataUsuarioActualizar.row)}}>
                                Cambiar
                            </Button>
                        </Box>
                    </Box>
                </Box>}
            </DialogContent>
        </Dialog>

        <Box sx={{display:"flex", position:"absolute", width:"100%", height:"100%"}}>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", width:"20%", pl:5, pt:5, pb:5}}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%"}}>
                    <Box id="profile" onClick={() => IntefazDashboard()}
                        sx={[{display:"flex", justifyContent:"center", boxShadow:2, height:"20%"},
                            {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}
                        }]}>
                        <ThemeProvider theme={theme}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                    {location.state.tipoUsuario ? <VerifiedUserIcon /> :<Person4Icon />}
                                </Box>
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                    <Typography  sx={{fontWeight: 'bold'}}> 
                                        {location.state.usuario}
                                    </Typography>
                                </Box>
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                    <Typography  sx={{fontWeight: 'bold'}}> 
                                        {location.state.tipoUsuario?"Administrador":"Usuario"}
                                    </Typography>
                                </Box>
                            </Box>
                        </ThemeProvider>
                    </Box>
                    <Box id="usuarios" onClick={() => toggleUser()} 
                        sx={[{display:"flex", flexDirection:"column", justifyContent:"center", boxShadow:2, height:"10%"}, 
                            {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}
                        }]}>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                            <SupervisorAccountIcon />
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    Usuarios
                                </Typography>
                            </ThemeProvider>    
                        </Box>
                    </Box>
                    { users && 
                        <Box id="users-crear" onClick={() => InterfazCrearUsuario()}
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3}, 
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <PersonAddAltIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Crear 
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    { users && 
                        <Box id="users-cambiarContraseña" onClick={() => InterfazCambiarContraseña()}
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3}, 
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <PasswordIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Actualizar Usuarios 
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    <Box id="sara" onClick={() => toggleOp()} 
                        sx={[{display:"flex", flexDirection:"column", justifyContent:"center", boxShadow:2, height:"10%"}, 
                            {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}}
                        ]}>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", columnGap: 1}}>
                            <ApiIcon />
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    SARA
                                </Typography>
                            </ThemeProvider>    
                        </Box>
                    </Box>

                    { opSara && 
                        <Box id="operaciones" 
                            onClick={() => InterfazOperaciones()}
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3}, 
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <BuildIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Operaciones
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    { opSara && 
                        <Box id="repuestos"
                            onClick={() => InterfazRepuestos()} 
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3}, 
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <PlumbingIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Repuestos
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    { opSara && 
                        <Box id="fallas"
                            onClick={() => InterfazFallas()} 
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3},
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <HardwareIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Fallas
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    { opSara && 
                        <Box id="tipoTelefonos"
                            onClick={() => InterfazTelefonos()} 
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3},
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <TtyIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Tipos Telefonos
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    <Box id="reportes" onClick={() => toggleReportes()} 
                        sx={[{display:"flex", flexDirection:"column", justifyContent:"center", boxShadow:2, height:"10%"},
                            {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}}
                        ]}>
                        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", columnGap: 1}}>
                            <SummarizeIcon />
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    Reportes
                                </Typography>
                            </ThemeProvider>    
                        </Box>
                    </Box>
                    { reportes && 
                        <Box id="reportes-penal" 
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3},
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <AccountBalanceIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Penal
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                    { reportes && 
                        <Box id="reportes-pais" 
                            onClick={() => {downloadProgresoMttos()}}
                            sx={[{display:"flex", flexDirection:"column", justifyContent:"center", height:"10%", pr: 3},
                                {"&:hover":{backgroundColor: '#dcffd9', cursor: "pointer"}}
                            ]}>
                            <Box sx={{display:"flex", flexDirection:"colum", justifyContent:"right"}}>
                                <Box sx={{display:"flex", justifyContent:"center", columnGap: 1}}>
                                    <PublicIcon />
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Pais
                                        </Typography>
                                    </ThemeProvider>    
                                </Box>
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
            
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center", width:"80%", pl:5, pt:5, pb:5, pr:5}}>
                <Box sx={{display:"flex", justifyContent:"center", p:5, width:"100%", boxShadow:2}}>
                    { interfazDashboard &&    
                        <Dashboard prop={location.state}/>
                    }
                    { interfazCrearUsuario &&
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%",}}>
                        <Box id="crearUsuario" sx={{display:"flex", justifyContent:"center",}}> 
                            <Box sx={{display:"flex", flexDirection:"column", boxShadow: 2, rowGap: 4, width:"40%", height:"100%", pt:2, pb: 2}}>    
                                <ThemeProvider theme={themeUsuario}>
                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center"}}> 
                                        Crear Usuario Sara
                                    </Typography>
                                </ThemeProvider>
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                    <Box sx={{display:"flex", flexDirection:"column", rowGap: 2}}>
                                        <TextField
                                            required
                                            id="usuario"
                                            label="usuario"
                                            value={usuarioSara}
                                            onChange={settingUsuarioSara}
                                        />
                                        <TextField
                                            required
                                            id="password"
                                            type="password"
                                            label="Contraseña"
                                            value={contraseñaSara}
                                            onChange={settingContraseñaSara}
                                        />
                                        <TextField
                                            required
                                            id="rePassword"
                                            type="password"
                                            label="Repetir Contraseña"
                                            value={reContraseñaSara}
                                            onChange={settingReContraseñaSara}
                                        />
                                        { startValidacion && (
                                            !equalsPassword ? (
                                            <Box>
                                                <ThemeProvider theme={themeLittle}>
                                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center", color:"red"}}> 
                                                        contraseñas no coinciden
                                                    </Typography>
                                                </ThemeProvider>
                                            </Box>)
                                            :
                                            (<Box>
                                                <ThemeProvider theme={themeLittle}>
                                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center", color:"green"}}> 
                                                        contraseñas coinciden
                                                    </Typography>
                                                </ThemeProvider>
                                            </Box> )
                                            )
                                        }

                                        <FormControl fullWidth>
                                            <InputLabel id="label-tipo-telefono">Asignar</InputLabel>
                                                <Select
                                                    labelId="label-tipo-telefono"
                                                    id="label-tipoTelefono"
                                                    defaultValue={101}
                                                    label="Telefono"
                                                    onChange={handleChangePenal}
                                                >{ penales.map((row) => (
                                                    <MenuItem value={row.id}>{row.penal}</MenuItem>
                                                ))
                                                }
                                            </Select>
                                        </FormControl>

                                        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                                            <Checkbox
                                                label="habilitado"
                                                checked={checkedAdministrador}
                                                onChange={setCheckingOperacion}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                                <Typography >Administrador</Typography>
                                            </Box>
                                        </Box>
                                        <Button variant="outlined"
                                            onClick={crearUsuarioSara}>
                                            Registrar
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    }
                    { interfazCambiarContraseña &&
                    <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", width:"100%",}}>
                        <Box id="cambiarContraseña" sx={{display:"flex", justifyContent:"center",}}> 
                            <Box sx={{display:"flex", flexDirection:"column", boxShadow: 2, rowGap: 4, width:"80%", height:"100%", pt:2, pb: 2}}>
                                <ThemeProvider theme={themeUsuario}>
                                    <Typography  sx={{fontWeight: 'bold', display:"flex", flexDirection:"row", justifyContent:"center"}}> 
                                        Actualizar Usuario Sara
                                    </Typography>
                                </ThemeProvider>

                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={usuariosBdD}
                                        onRowClick={(row) => {
                                            setDataUsuarioActualizar(row)
                                            interfazActualizarUsuario(row)
                                        }}
                                        columns={columnsUsuariosActualizar}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>        
                        </Box>
                    </Box>
                    }   
                    { interfazFallas &&
                    <Box sx={{display:"flex", flexDirection:"column", width:"50%", rowGap: 5}}>
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    FALLAS - SARA
                                </Typography>
                            </ThemeProvider> 
                        </Box>
                        <Box sx={{display:"flex", backgroundColor:"#dcffd9", width:"100%", height:"10%", position:"static"}}>
                            <Box id="listarFallas" onClick={() => {InterfazListarFalla()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Listar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="crearFallas"   onClick={() => {InterfazCrearFalla()}} 
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"}, 
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Crear
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="actualizarFallas" onClick={() => {InterfazActualizarFalla()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Actualizar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>
                        </Box>
                        { showCrearFalla && !showListarFalla && !showActualizarFalla && 
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            CREAR UNA FALLA
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                
                                <FormControl fullWidth>
                                    <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                        <Select
                                            labelId="label-tipo-telefono"
                                            id="label-tipoTelefono"
                                            value={tipoTelefono}
                                            defaultValue={''}
                                            label="Telefono"
                                            onChange={handleChangeTipoTelefono}
                                        >{ tipoTelefonoBdD.map((row) => (
                                            <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    onChange = {(e) => setFalla(e.target.value)}
                                    required
                                    id="descripcionFalla"
                                    label="Falla"
                                    defaultValue=""
                                />
                                <Button variant="contained" onClick={() => {crearFalla()}} sx={{}}>
                                    Crear
                                </Button>
                            </Box>
                        </Box>
                        }
                        { !showCrearFalla && showListarFalla && !showActualizarFalla && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            LISTA DE FALLAS 
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                              
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={fallasBdD}
                                        columns={columnsFallas}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>
                        </Box>
                        }
                        { !showCrearFalla && !showListarFalla && showActualizarFalla && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            ACTUALIZAR FALLA
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                              
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={fallasBdD}
                                        onRowClick={(row) => {
                                            setDataFallaActualizar(row)
                                            intefazActualizarFalla(row)
                                            setCheckedFalla(row.row.estado?true:false);
                                        }}
                                        columns={columnsFallasActualizar}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>
                        </Box>
                        }
                    </Box>
                    }
                    { interfazOperaciones &&
                    <Box sx={{display:"flex", flexDirection:"column", width:"50%", rowGap: 5}}>
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    OPERACIONES
                                </Typography>
                            </ThemeProvider> 
                        </Box>
                        <Box sx={{display:"flex", backgroundColor:"#dcffd9", width:"100%", height:"10%"}}>
                            <Box id="listarOperaciones" onClick={() => {InterfazListarOperaciones()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Listar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="crearOperaciones" onClick={() => {InterfazCrearOperaciones()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"}, 
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Crear
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="actualizarOperaciones" onClick={() => {InterfazActualizarOperaciones()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Actualizar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>
                        </Box>
                        { showCrearOperaciones && !showListarOperaciones && !showActualizarOperaciones && 
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            CREAR UNA OPERACION
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                
                                <FormControl fullWidth>
                                    <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                        <Select
                                            labelId="label-tipo-telefono"
                                            id="label-tipoTelefono"
                                            value={tipoTelefono}
                                            defaultValue={''}
                                            label="Telefono"
                                            onChange={handleChangeTipoTelefono}
                                        >{ tipoTelefonoBdD.map((row) => (
                                            <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>
                                <TextField
                                    onChange = {(e) => setOperacion(e.target.value)}
                                    required
                                    id="descripcionFalla"
                                    label="Operaciones"
                                    defaultValue=""
                                />
                                <Button variant="contained" onClick={() => {crearOperacion()}} sx={{}}>
                                    Crear
                                </Button>
                            </Box>
                        </Box>
                        }
                        { !showCrearOperaciones && showListarOperaciones && !showActualizarOperaciones && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            LISTA DE OPERACIONES 
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                              
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={operacionesBdD}
                                        columns={columnsOperaciones}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>
                        </Box>
                        }
                        { !showCrearOperaciones && !showListarOperaciones && showActualizarOperaciones && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            ACTUALIZAR OPERACIÓN
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                              
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={operacionesBdD}
                                        onRowClick={(row) => {
                                            setDataOperacionActualizar(row)
                                            intefazActualizarOperacion(row)
                                            setCheckedOperacion(row.row.estado?true:false);
                                        }}
                                        columns={columnsOperacionesActualizar}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>
                        </Box>
                        }
                    </Box>
                    }
                    { interfazRepuestos &&
                    <Box sx={{display:"flex", flexDirection:"column", width:"50%", rowGap: 5}}>
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    REPUESTOS
                                </Typography>
                            </ThemeProvider> 
                        </Box>
                        <Box sx={{display:"flex", backgroundColor:"#dcffd9", width:"100%", height:"10%"}}>
                            <Box id="listarRepuestos" onClick={() => {InterfazListarRepuesto()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Listar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="crearRepuestos" onClick={() => {InterfazCrearRepuesto()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"}, 
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Crear
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="actualizarRepuestos" onClick={() => {InterfazActualizarRepuesto()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Actualizar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>
                        </Box>

                        { showCrearRepuesto && !showListarRepuesto && !showActualizarRepuesto && 
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            CREAR UN REPUESTO
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>

                                <FormControl fullWidth>
                                    <InputLabel id="label-tipo-telefono">Telefono</InputLabel>
                                        <Select
                                            labelId="label-tipo-telefono"
                                            id="label-tipoTelefono"
                                            value={tipoTelefono}
                                            defaultValue={''}
                                            label="Telefono"
                                            onChange={handleChangeTipoTelefono}
                                        >{ tipoTelefonoBdD.map((row) => (
                                            <MenuItem value={row.id}>{row.nombreTelefonos}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    onChange = {(e) => setRepuesto(e.target.value)}
                                    required
                                    id="repuesto"
                                    label="Repuesto"
                                    defaultValue=""
                                />
                                <Button variant="contained" onClick={() => {crearRepuesto()}} sx={{}}>
                                    Crear
                                </Button>
                            </Box>
                        </Box>
                        }
                        { !showCrearRepuesto && showListarRepuesto && !showActualizarRepuesto && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            LISTA DE REPUESTOS
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={repuestoBdD}
                                        columns={columnsRepuestos}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div> 
                            </Box>
                        </Box>
                        }
                        { !showCrearRepuesto && !showListarRepuesto && showActualizarRepuesto && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            ACTUALIZAR REPUESTO 
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={repuestoBdD}
                                        onRowClick={(row) => {
                                            setDataRepuestoActualizar(row)
                                            intefazActualizarRepuesto(row)
                                            setCheckedRepuesto(row.row.estado?true:false);
                                        }}
                                        columns={columnsRepuestosActualizar}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>
                        </Box>
                        }
                    </Box>
                    }
                    { interfazTelefonos &&
                    <Box sx={{display:"flex", flexDirection:"column", width:"50%", rowGap: 5}}>
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <ThemeProvider theme={theme}>
                                <Typography  sx={{fontWeight: 'bold'}}> 
                                    TIPO TELEFONO
                                </Typography>
                            </ThemeProvider> 
                        </Box>
                        <Box sx={{display:"flex", backgroundColor:"#dcffd9", width:"100%", height:"10%"}}>
                            <Box id="listarTelefonos" onClick={() => {InterfazListarTipoTelefono()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Listar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="crearTelefonos" onClick={() => {InterfazCrearTipoTelefono()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"}, 
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box
                                    sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Crear
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>

                            <Box id="actualizarTelefonos" onClick={() => {InterfazActualizarTipoTelefono()}}
                                sx={[{display:"flex", flexDirection:"row", justifyContent:"center", boxShadow: 1, width:"33.3%"},
                                    {"&:hover":{backgroundColor: '#daeeff', cursor: "pointer"}} 
                                ]}>
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            Actualizar
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                            </Box>
                        </Box>
                        { showCrearTipoTelefono && !showListarTipoTelefono && !showActualizarTipoTelefono && 
                        <Box sx={{display:"flex", justifyContent:"center"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            CREAR UN TIPO DE TELEFONO
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                <TextField
                                    onChange = {(e) => setTipoTelefono(e.target.value)}
                                    required
                                    id="tipoTelefono"
                                    label="Telefono"
                                    defaultValue=""
                                />
                                <Button variant="contained" onClick={() => {crearTipoTelefono()}} sx={{}}>
                                    Crear
                                </Button>
                            </Box>
                        </Box>
                        }
                        { !showCrearTipoTelefono && showListarTipoTelefono && !showActualizarTipoTelefono && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            LISTA DE TELEFONOS CREADOS
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={tipoTelefonoBdD}
                                        columns={columnsTiposTelefonoActualizar}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div> 
                            </Box>
                        </Box>
                        }
                        { !showCrearTipoTelefono && !showListarTipoTelefono && showActualizarTipoTelefono && 
                        <Box sx={{display:"flex", justifyContent:"center", height:"60%"}}>
                            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                                <Box sx={{display:"flex", justifyContent:"center"}}>
                                    <ThemeProvider theme={theme}>
                                        <Typography  sx={{fontWeight: 'bold'}}> 
                                            ACTUALIZAR TELEFONOS 
                                        </Typography>
                                    </ThemeProvider> 
                                </Box>
                                
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={tipoTelefonoBdD}
                                        onRowClick={(row) => {
                                            setDataTipoTelefonoActualizar(row)
                                            intefazActualizarTipoTelefono(row)
                                            setCheckedTipoTelefono(row.row.estado?true:false);
                                        }}
                                        columns={columnsTiposTelefonoActualizar}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                    />
                                </div>
                            </Box>
                        </Box>
                        }
                    </Box>
                    }
                </Box>
            </Box>
        </Box>
        </>
    )
}


export default Administrador