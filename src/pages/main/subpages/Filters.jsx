import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Filters = () => {
    const [holding, setHolding] = React.useState('');
    const [zakazchik, setZakazchik] = React.useState('');
    const handleChange = (event) => {
        setHolding(event.target.value);
    };


    return (
        <div>
            <Box sx={{minWidth: 120, mb: '20px'}}>
                <FormControl sx={{m:1, width: 300}} variant="standard">
                    <InputLabel id="holding-label">Холдинг</InputLabel>
                    <Select
                        labelId="holding-label"
                        id="holding"
                        value={holding}
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>Пусто</em></MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m:1, width: 300}} variant="standard">
                    <InputLabel id="zakazchik-label">Заказчик</InputLabel>
                    <Select
                        labelId="zakazchik-label"
                        id="zakazchik"
                        value={zakazchik}
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>Пусто</em></MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>

        </div>
    );
};

export {Filters};