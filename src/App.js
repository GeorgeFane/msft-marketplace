import * as React from 'react';
import Web3 from 'web3';
import { useWeb3React } from "@web3-react/core"

// import * as c from './contract/contract.mjs';
import Header from './header/Header';

import Trades from './pages/Trades';
import Login from './pages/Login';
import Item from './pages/Item';
import Backpack from './pages/Backpack';
import Listing from './pages/Listing';

import Connect from './metamask/Connect';
import Provider from './metamask/Provider';
import abi from './contract/abi.json';

const contractAddress = '0xe052Df81992Dd4C55d135A6221cAD0a55721A09b';

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

            web3: '',
            contract: '',
        }
    }

    async componentDidMount() {
        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(abi, contractAddress);

        const admin = await contract.methods.admin().call();
        const tokenTypes = await contract.methods.getTokenTypes().call();
        const account = web3.currentProvider.selectedAddress;

        const accounts = await web3.eth.getAccounts();

        console.log(accounts);

        this.setState({ account, admin, tokenTypes, accounts, web3, contract });
    }

    setPage = page => this.setState({ page });
    setAccount = (account, web3, contract) => this.setState({ account, web3, contract });

    render() {
        const { page, accounts, account, contract } = this.state;

        async function getToken(id) {
            const rtn = await contract.methods.tokens(id).call();
            console.log(rtn);
            return rtn;
        }
        
        async function getBalance(from, id) {
            const rtn = await contract.methods.balanceOf(from, id).call();
            return rtn;
        }
        
        async function getRoyaltys(id) {
            const rtn = await contract.methods.getRoyaltys(id).call();
            return rtn;
        }

        const pages = {
            Login: <Login
                setAccount={this.setAccount}
            />,
            Item: <Item
                getToken={getToken}
                getBalance={getBalance}
                getRoyaltys={getRoyaltys}
                account={account}
                contract={contract}                
            />,
            Trades: <Trades
                getToken={getToken}
                backpack={backpack}
            />,
        }

        return (
            <div>
                <Header
                    pages={Object.keys(pages)}
                    page={page}
                    setPage={this.setPage}
                    account={account}
                />

                {
                    pages[page]
                }
            </div>
        );
    }
}
