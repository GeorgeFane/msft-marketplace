import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function SwitchLabels({ setChecked }) {
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <FormGroup>
            <FormControlLabel control={(
                <Switch
                    onChange={handleChange}
                />
            )} label="Buy Fraction" />
        </FormGroup>
    );
}
