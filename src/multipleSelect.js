import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },
  },
};

export default function MultipleSelectChip(data) {
    const [valoresSeleccionados, setValoresSeleccionados] = useState([]);
    const { props } = data;

    useEffect(() => {
        const lista = props.lista.map(value => {
            return(value.id + ':' + value.descripcion)
        })
        setValoresSeleccionados(lista)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /*useEffect(() => {
        props.updateData(valoresSeleccionados)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valoresSeleccionados])*/

    return (
        <Box sx={{display:"flex"}}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">{props.etiqueta}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={valoresSeleccionados}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                </Select>
            </FormControl>
        </Box>
    );
}