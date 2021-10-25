import * as React from 'react';

import * as c from './contract/contract.mjs';
import Header from './header/Header';

import BasicGrid from './pages/BasicGrid';
import Login from './pages/Login';
import Customise from './pages/Customise';
import Backpack from './pages/Backpack';

const pages = 'Login Marketplace Backpack Customise'.split(' ');

const shield = {
    image: 'https://image.shutterstock.com/image-illustration/metal-shield-isolated-on-white-260nw-324051260.jpg',
    name: 'Shield',
    description: 'standard fungible shield',
    balance: 2,
};

const backpack = [
    shield,
    {
        image: 'https://www.scottsdalemint.com/wp-content/uploads/2021/05/2024-Samoa-Year-of-the-Dragon-1-oz-Gold-Coin-02-100x100.jpg',
        name: 'Gold Coin',
        description: 'standard fungible coin, default currency',
        balance: 505,
    },
    {
        image: 'https://soappotions.com/wp-content/uploads/2017/10/round.jpg',
        name: 'Potion',
        description: 'standard fungible potion',
        balance: 1,
    },
    {
        image: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047?s=612x612',
        name: 'Customised Shield',
        description: 'wooden, red and white',
        balance: 1,
    },
]

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
            Customise: <Customise
                item={shield}
            />,
            Backpack: <Backpack
                backpack={backpack}
            />,
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
