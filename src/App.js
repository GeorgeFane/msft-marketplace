import * as React from 'react';

import * as c from './contract/contract.mjs';
import Header from './header/Header';

import BasicGrid from './pages/BasicGrid';
import Login from './pages/Login';
import Customise from './pages/Customise';

const pages = 'Marketplace Backpack Customise Login'.split(' ');

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: null,
            tokenNames: [],
            tokenTypes: [],
            accounts: [],
            page: 'Login',
        }
    }

    async componentDidMount() {
        const admin = await c.contract.methods.admin().call();
        const tokenTypes = await c.contract.methods.getTokenTypes().call();
        const tokenNames = await c.contract.methods.getTokenNames().call();

        const accounts = await c.web3.eth.getAccounts();

        this.setState({ admin, tokenNames, tokenTypes, accounts });
    }

    setPage = page => this.setState({ page });

    render() {
        const { page, accounts } = this.state;

        const getPage = {
            Login: <Login
                accounts={accounts}
            />,
            Customise: <Customise />,
            // Backpack: <BasicGrid
            //     accounts={accounts}
            // />,
        }

        return (
            <div>
                <Header
                    pages={pages}
                    page={page}
                    setPage={this.setPage}
                />

                {
                    getPage[page]
                }
            </div>
        );
    }
}
