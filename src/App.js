import * as React from 'react';

import * as c from './contract/contract.mjs';
import Header from './header/Header';

import BasicGrid from './pages/BasicGrid';
import Login from './pages/Login';
import Customise from './pages/Customise';
import Backpack from './pages/Backpack';
import Listing from './pages/Listing';

import Connect from './metamask/Connect';
import Provider from './metamask/Provider';

const shield = {
    image: 'https://image.shutterstock.com/image-illustration/metal-shield-isolated-on-white-260nw-324051260.jpg',
    name: 'Shield',
    description: 'standard fungible shield',
    balance: 2,
};

const nft = {
    image: 'https://media.istockphoto.com/photos/wooden-medieval-shield-viking-shield-painted-red-and-white-picture-id1180956047?s=612x612',
    name: 'Customised Shield',
    description: 'wooden, red and white',
    owner: 'George',
    balance: 1,
};

const backpack = [
    shield, nft,
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
];

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: '',
            tokenTypes: [],
            accounts: [],
            page: 'Login',
            account: '',
        }
    }

    async componentDidMount() {
        const admin = await c.contract.methods.admin().call();
        const tokenTypes = await c.contract.methods.getTokenTypes().call();

        const accounts = await c.web3.eth.getAccounts();

        console.log(this.state.account);

        this.setState({ admin, tokenTypes, accounts });
    }

    setPage = page => this.setState({ page });
    setAccount = account => this.setState({ account });

    render() {
        const { page, accounts, account } = this.state;

        const pages = {
            Login: <Login
                accounts={accounts}
                account={account}
                setAccount={this.setAccount}
            />,
            Customise: <Customise
                getToken={c.getToken}
                getBalance={c.getBalance}
                account={account}
                contract={c.contract}                
            />,
            Listing: <Listing
                item={nft}
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
                    pages={Object.keys(pages)}
                    page={page}
                    setPage={this.setPage}
                />

                {
                    pages[page]
                }
            </div>
        );
    }
}
