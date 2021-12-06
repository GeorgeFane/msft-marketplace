import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@mui/material';

import Provider from './Provider.js';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid({ setAccount }) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            // style={{ minHeight: '100vh' }}
        >
            <Grid item xs={6}>
                <Item>
                    <Provider
                        setAccount={setAccount}
                    />
                </Item>
            </Grid>   
        </Grid>
        
    );
}
