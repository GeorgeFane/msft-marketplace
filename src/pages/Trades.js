import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, Badge, CardMedia, Card, Typography, TextField } from '@mui/material';

import { ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import AlertDialog from './itemActions/AlertDialog';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const trades = [
    [
        [
            [0, 5],
            [1, 20],
        ],
        [
            [2, 1]
        ]
    ],
    [
        [
            [0, 1],
            [1, 1],
        ],
        [
            [3, 1]
        ]
    ],
]

export default function BasicButtons({ getToken, tokens }) {
    const [trader, setTrader] = React.useState();
    console.log(tokens);

    function plus(side) {
        return side.map( ( [id, num] ) => (
            <Badge
                badgeContent={num}
                color='primary'
            >
                <img
                    src={tokens[id].image}
                    height='99'
                    alt={tokens[id].name}
                />
            </Badge>
        ));

        // const badges = await side.map( async ( [num, id] ) => {
        //     const item = await getToken(id);
        //     return (
        //         <Badge
        //             badgeContent={num}
        //         >
        //             <img
        //                 src={item.image}
        //                 height='99'
        //                 alt={item.name}
        //             />
        //         </Badge>
        //     );
        // });

        // return badges;
    }

    const allItems = tokens.map(token => (
        <CardMedia
            component="img"
            sx={{ height: '99px', width: '99px' }}
            src={token.image}
            alt="Live from space album cover"
        />
    ));

    const title = `
        Trade your stuff for their stuff?
    `;

    const description = `
        You'll call "safeBatchTransferFrom" to give your stuff to them,
        and also pay a flat 100 wei platform fee to Microsoft.
        They'll call "safeBatchTransferFrom" to give their stuff to you.
    `;

    const action = () => {

    };

    const papers = trades.map(trade => (
        <Item>
            {plus(trade[0])}
            <ArrowForward fontSize="large" />
            {plus(trade[1])}
            <AlertDialog
                title={title}
                description={description}
                action={action}
            />
        </Item>
    ));

    return (
        <Stack spacing={2} direction="column">
            <Typography>
                All Items
            </Typography>

            <Card sx={{ display: 'flex', p: 2 }}>
                {allItems}
            </Card>
            
            <Typography>
                Trades
            </Typography>

            <TextField
                label='Trade With Whom?'
                style={{ width: 222 }}
                onChange={event => {
                    const trader = event.target.value;
                    this.setState({ trader });
                }}
            />

            {papers}
        </Stack>
    );
}
