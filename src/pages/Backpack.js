import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Badge, Typography, Tooltip } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BasicGrid({ backpack }) {
    const items = backpack.map(item => (
        <Grid item>
            <Item>
                <Tooltip
                    title={item.name}
                >
                    <Badge
                        badgeContent={item.balance}
                        color='primary'
                    >
                        <img
                            src={item.image}
                            height='99'
                            alt={item.name}
                        />
                    </Badge>
                </Tooltip>
            </Item>
        </Grid>
    ))

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {items}
            </Grid>
        </Box>
    );
}
