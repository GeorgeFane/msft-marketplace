import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { GitHub } from '@mui/icons-material';

import logo from './logo.png';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Box
                        m={1}
                    >
                        <img src={logo} alt={'Microsoft logo'} height='22' />
                    </Box>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NFT Marketplace
                    </Typography>
                    <IconButton
                        color='inherit'
                        href='https://github.com/GeorgeFane/msft-marketplace'
                        target='_blank'
                    >
                        <GitHub fontSize='large' />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Box>
    );
}
