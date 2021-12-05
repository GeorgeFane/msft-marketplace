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
import { CardActions, Button, TextField, Divider, AlertTitle } from '@mui/material';

import BasicTabs from './itemActions/BasicTabs';
import AlertDialog from './itemActions/AlertDialog';

const zeroAddress = '0x42B221DFf0A38c56409032bD2b1D3E6f7cAEdb4B';

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

            bid: 0,
            seller: '',
            royaltys: null,
        };
    }

    async componentDidMount() {
        const { getToken, getBalance, account, seller, getRoyaltys } = this.props;
        const { id } = this.state;
        const token = await getToken(id);
        console.log(token);

        const image = '';
        const balance = await getBalance(account, id);

        const royaltys = await getRoyaltys(id);
        console.log(royaltys);

        this.setState({ token, balance, image, royaltys });
    }

    Customise() {
        const { contract, account } = this.props;
        const {
            id, token, balance,
            image, name, data,
            bid, seller
        } = this.state;

        const title = `
            Use up one "${token.name}"
            to create one "${name}"?
        `;

        const description = `
            Specifically, you will "safeTransferFrom" one "${token.name}"
            to the dead address and "mint" a new token called "${name}"
        `;

        return (
            <Box>
                <TextField
                    label='Name'
                    required
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
                    required
                    value={image}
                    onChange={event => {
                        const image = event.target.value;
                        this.setState({ image });
                    }}
                />
                <br /><br />
                
                <AlertDialog
                    title={title}
                    description={description}
                    action={() => {
                        if (name === '' || image === '') {
                            return;
                        }

                        const from = account;
                        contract.methods.mint(
                            name, data, image, 1, token.tokenType
                        ).send({ from });
                        
                        contract.methods.safeTransferFrom(
                            account, zeroAddress, id, 1, '0x0'
                        ).send({ from });
                    }}
                />
            </Box>
        );
    }

    Buy() {
        const { contract, account } = this.props;
        const {
            id, token, balance,
            image, name, data,
            bid, seller, sellerBalance, royaltys,
        } = this.state;

        const title = `
            Buy one "${token.name}" from "${seller}" for ${bid * 100} wei?
        `;

        const description = `
            You'll call the "buyToken" function,
            which "safeTransferFrom"s one token to you
            and distributes your bid price to all addresses specified
            in the token's royalty array
        `

        return (
            <Box>
                <TextField
                    label='Buy From Whom?'
                    value={seller}
                    onChange={event => {
                        const seller = event.target.value;
                        this.setState({ seller });
                    }}
                />
                
                <br /><br />

                <TextField
                    label='Your Bid'
                    helperText="Units of 100 wei"
                    type='number'
                    value={bid}
                    onChange={event => {
                        const bid = event.target.value;
                        this.setState({ bid });
                    }}
                />
                
                <br /><br />
                
                <AlertDialog
                    title={title}
                    description={description}
                    action={() => {
                        if (seller === '') {
                            return;
                        }

                        // you pay seller and handle royaltys
                        contract.methods.buyToken(
                            seller, token.tokenType
                        ).send({ from: account, value: bid * 100 });
                        
                        // seller transfers token to you
                        contract.methods.safeTransferFrom(
                            seller, account, id, 1, '0x0'
                        ).send({ from: seller });
                    }}
                />
                        
    `           <Typography variant="subtitle1" component="div">
                    Royalties: {JSON.stringify(royaltys, null, 4)}
                </Typography>
            </Box>
        )
    }

    Royalty() {
        const { contract, account } = this.props;
        const {
            id, token, balance,
            image, name, data,
            bid, seller, sellerBalance,
        } = this.state;

        const title = `
            Give "${seller}" ${bid}% of every subsequent sale?
        `;

        const description = `
            You'll call the "createRoyalty" function,
            which creates a "Royalty" object and
            pushes it to the token's Royalty array.
            "buyToken" automatically considers the Royalty array.
        `

        return (
            <Box>
                <TextField
                    label='Royal Address'
                    value={seller}
                    onChange={event => {
                        const seller = event.target.value;
                        this.setState({ seller });
                    }}
                />
                
                <br /><br />

                <TextField
                    label='Percentage'
                    type='number'
                    value={bid}
                    onChange={event => {
                        const bid = event.target.value;
                        this.setState({ bid });
                    }}
                />
                
                <br /><br />
                
                <AlertDialog
                    title={title}
                    description={description}
                    action={() => {
                        if (seller === '') {
                            return;
                        }

                        const from = account;
                        contract.methods.createRoyalty(
                            seller, id, bid
                        ).send({ from });
                    }}
                />
            </Box>
        )
    }

    render() {
        const { contract, account } = this.props;
        const {
            id, token, balance,
            image, name, data,
            bid, seller, royaltys,
        } = this.state;

        if (token === null) {
            return <div />;
        }

        const pages = {
            Customise: this.Customise(),
            Buy: this.Buy(),
            Royalty: this.Royalty(),
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

                        <BasicTabs
                            pages={pages}
                        />

                        <Divider />
                    </CardContent>

                </Box>
            </Card>
        );
    }
}
