import React, {useState} from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

import fetchData from './share/fetchData'

const Login = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [_tipoUsuario, setTipoUsuario] = useState(0)
    const [invalidLogin, setInvalidLogin] = useState(undefined)
    const [acceso_S, setAcceso_S] = React.useState(false);

    const settingUser = (value) => {
        setUser(value)
    }

    const settingPassword = (value) => {
        setPassword(value)
    }

    const doLogin = async () => {
        if (user === undefined || password === undefined) {
            setInvalidLogin(true)
            return
        } else {
            let params = {tipoUsuario: _tipoUsuario, username: user}
            let response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                "/login/validarUsuario", params, 3000);
            const rptaLogin = (await response.json())
            
            if (rptaLogin.existe === "OK") {
                params = {contrasenaHash: rptaLogin.hash, contrasena: password, username: user}
                response = await fetchData.postDataPromise("http://192.237.253.176:2700", 
                    "/login/validarContrasena", params, 3000);
                let rpta = await response.json()
                
                if(rpta.contrasenaCorrecta) {
                    setAcceso_S(true)
                    setTimeout(() => {
                        if (!_tipoUsuario) {
                            // tipo 0 => Usuario normal
                            navigate('/plataforma', {state:{usuario: user, tipoUsuario: _tipoUsuario, penal: rptaLogin.penal}})
                        } else { 
                            // tipo 1 => administrador
                            navigate('/plataformaAdmin', {state:{usuario: user, tipoUsuario: _tipoUsuario, penal: 0}})
                        }
                    }, 3000);
                } else {
                    setInvalidLogin(true)    
                }
            } else {
                setInvalidLogin(true)
            }
        }
    }

    const handleChangeCheckAdminProfile = (event) => {
        setTipoUsuario(event.target.checked?1:0)
      };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setInvalidLogin(false)
        setAcceso_S(false)
    };

    return (
        <>
            <Snackbar open={invalidLogin} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                    Usuario o Contraseña invalidos
                </Alert>
            </Snackbar>

            <Snackbar open={acceso_S} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Bienvenido a la plataforma SARA
                </Alert>
            </Snackbar>

            <Box sx={{display:"flex", position:"absolute", width:"100%", height:"100%", justifyContent: "center"}}>
                <Box sx={{display:"flex", flexDirection:"column", justifyContent: "center"}}>
                    <Box sx={{display:"flex", width: 400, height: 400, boxShadow: 2, justifyContent: "center"}}> 
                        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
                            <Typography variant="h5" >PLATAFORMA SARA</Typography>
                            <TextField
                                onChange = {(e) => settingUser(e.target.value)}
                                required
                                id="username"
                                label="Usuario"
                                defaultValue=""
                            />
                            <TextField
                                onChange = {(e) => settingPassword(e.target.value)}
                                required
                                id="password"
                                label="Contraseña"
                                defaultValue=""
                                type="password"
                            />
                            <Box sx={{display:"flex", flexDirection:"row", justifyContent: "center", columnGap:0}}>
                                <Checkbox
                                    label="Administrador"
                                    checked={_tipoUsuario?true:false}
                                    onChange={handleChangeCheckAdminProfile}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                    <Typography >Administrador</Typography>
                                </Box>
                            </Box>
                            <Button variant="contained" onClick={() => doLogin()} sx={{}}>
                                Ingresar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Login