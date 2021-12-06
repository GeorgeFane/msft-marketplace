import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, Badge, CardMedia, Card, Typography, TextField, MenuItem } from '@mui/material';

import { ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import AlertDialog from '../item/AlertDialog';
import BasicSelect from './BasicSelect';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const trades = [
    [
        [
            [0, 25],
            [1, 5],
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

function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

export default function BasicButtons({ getToken, tokens, contract, account }) {
    const [trader, setTrader] = React.useState();
    const [index, setIndex] = React.useState(0);
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

    const action = async () => {
        const trade = trades[index];
        let [ids, amounts] = transpose(trade[0]);
        await contract.methods.safeBatchTransferFrom(
            account, trader, ids, amounts, '0x0'
        ).send({ from: account });

        [ids, amounts] = transpose(trade[1]);
        await contract.methods.safeBatchTransferFrom(
            trader, account, ids, amounts, '0x0'
        ).send({ from: trader });

    };

    const papers = trades.map( (trade, index) => (
        <MenuItem
            value={index}
        >
            {plus(trade[0])}
            <ArrowForward fontSize="large" />
            {plus(trade[1])}
        </MenuItem>
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
                    setTrader(trader);
                }}
            />

            <BasicSelect
                papers={papers}
                setIndex={setIndex}
            />
            
            <AlertDialog
                title={title}
                description={description}
                action={action}
            />
        </Stack>
    );
}
