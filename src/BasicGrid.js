import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, MenuItem } from '@mui/material';

import * as c from './contract/contract.mjs';
import BasicSelect from './BasicSelect.js';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: null,
            tokenNames: [],
            tokenTypes: [],
            accounts: [],
        }
    }

    async componentDidMount() {
        const admin = await c.contract.methods.admin().call();
        const tokenTypes = await c.contract.methods.getTokenTypes().call();
        const tokenNames = await c.contract.methods.getTokenNames().call();

        const accounts = await c.web3.eth.getAccounts();

        this.setState({ admin, tokenNames, tokenTypes, accounts });
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Item>
                            Admin: {this.state.admin}
                        </Item>
                    </Grid>
                    <Grid item>
                        <Item>
                            Token Names: {this.state.tokenNames.join(', ')}
                        </Item>
                    </Grid>
                    <Grid item>
                        <Item>
                            Token Types: {this.state.tokenTypes.join(', ')}
                        </Item>
                    </Grid>
                    <Grid item>
                        <Item>
                            Accounts: {this.state.accounts.join(', ')}
                        </Item>
                    </Grid>

                    <Grid item>
                        <Item>
                            <BasicSelect
                                label='Select Account'
                                items={this.state.accounts}
                            />
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}
