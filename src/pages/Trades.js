import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Paper, Badge } from '@mui/material';

import { ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const trades = [
    [
        [
            [5, 0],
            [20, 2],
        ],
        [
            [1, 3]
        ]
    ]
]

export default function BasicButtons({ getToken, backpack }) {

    function plus(side) {
        return side.map( ( [num, id] ) => (
            <Badge
                badgeContent={num}
                color='primary'
            >
                <img
                    src={backpack[id].image}
                    height='99'
                    alt={backpack[id].name}
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

    const papers = trades.map(trade => (
        <Item>
            {plus(trade[0])}
            <ArrowForward fontSize="large" />
            {plus(trade[1])}
        </Item>
    ));

    return (
        <Stack spacing={2} direction="column">
            <Button variant="text">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            {papers}
        </Stack>
    );
}
