import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { CardActions, Button, TextField } from '@mui/material';

import shield from './shield.jpg';

export default function MediaControlCard({ item }) {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: '33%' }}
                src={item.image}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {item.description}
                    </Typography>
                </CardContent>

                <CardContent sx={{ flex: '1 0 auto' }}>
                    <TextField
                        label='Name'
                    />
                    <br /><br />

                    <TextField
                        label='Description'
                        multiline
                        rows={4}
                    />
                    <br /><br />
                    
                    <TextField
                        label='Image URL'
                    />
                    <br /><br />
                    
                    <Button
                        variant='contained'
                        type='submit'
                    >
                        Submit
                    </Button>
                </CardContent>
            </Box>
        </Card>
    );
}
