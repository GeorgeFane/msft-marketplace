import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ papers, setIndex }) {
    const [age, setAge] = React.useState(0);

    const handleChange = (event) => {
        setIndex(event.target.value);
        setAge(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">
                    Select Your Trade
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    {papers}
                </Select>
            </FormControl>
        </Box>
    );
}
