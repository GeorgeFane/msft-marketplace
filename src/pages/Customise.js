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

export default class MediaControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            token: null,
            balance: 0,
            name: '',
            data: '',
            image: '',
        };
    }

    async componentDidMount() {
        const { getToken, getBalance, account } = this.props;
        const { id } = this.state;
        const token = await getToken(id);
        console.log(token);

        const image = '';
        const balance = await getBalance(account, id);
        this.setState({ token, balance, image });
    }

    render() {
        const { contract, account } = this.props;
        const {
            id, token, balance,
            image, name, data
        } = this.state;

        if (token === null) {
            return <div />;
        }

        return (
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '33%' }}
                    src={image === '' ? token.image : image}
                    alt="Live from space album cover"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <TextField
                            label='Token ID'
                            type='number'
                            value={id}
                            onChange={event => {
                                const id = event.target.value;
                                this.setState({ id }, this.componentDidMount);
                            }}
                        />

                        <Typography component="div" variant="h5">
                            {token.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {token.data}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            You have {balance}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                            When 'Submit' is pressed, you lose one unit of the original item and mint the new customised item
                        </Typography>
                    </CardContent>

                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <TextField
                            label='Name'
                            onChange={event => {
                                const name = event.target.value;
                                this.setState({ name });
                            }}
                        />
                        <br /><br />

                        <TextField
                            label='Description'
                            multiline
                            rows={4}
                            onChange={event => {
                                const data = event.target.value;
                                this.setState({ data });
                            }}
                        />
                        <br /><br />
                        
                        <TextField
                            label='Image URL'
                            value={image}
                            onChange={event => {
                                const image = event.target.value;
                                this.setState({ image });
                            }}
                        />
                        <br /><br />
                        
                        <Button
                            variant='contained'
                            type='submit'
                            onClick={() => {
                                const from = account;
                                contract.methods.mint(
                                    1, data, name, token.tokenType, image
                                ).send({ from });
                                
                                contract.methods.safeTransferFrom(
                                    account, '0x0', id, 1, '0x0'
                                ).send({ from });
                            }}
                        >
                            Submit
                        </Button>
                    </CardContent>
                </Box>
            </Card>
        );
    }
}
