import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Button } from '@mui/material';

import BasicSelect from './BasicSelect.js';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid({ accounts, account, setAccount }) {
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
                <BasicSelect
                    label='Select Account'
                    items={accounts}
                    setAccount={setAccount}
                    account={account}
                />

                <br />

                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type='password'
                />

                <br />
                <br />

                <Button
                    variant="contained"
                >
                    Submit
                </Button>
            </Item>
        </Grid>   
    </Grid>
    
  );
}
