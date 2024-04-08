import React, {useState} from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const FormularioCrear = () => {

    const [descripcion, setDescripcion] = useState(undefined)
    const [tipoTelefono, setTipoTelefono] = useState(undefined)

    return (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", rowGap: 3}}>
            <TextField
                onChange = {(e) => setDescripcion(e.target.value)}
                required
                id="descripcion"
                label="Descripcion"
                defaultValue=""
                value={descripcion}
            />
            <TextField
                onChange = {(e) => setTipoTelefono(e.target.value)}
                required
                id="idTelefono"
                label="tipoTelefono"
                defaultValue=""
                value={tipoTelefono}
            />
            <Button variant="contained" sx={{}}>
                Ingresar
            </Button>
        </Box>
    )
}

export default FormularioCrear