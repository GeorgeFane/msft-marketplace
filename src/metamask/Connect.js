import { Button, Typography } from '@mui/material';

import abi from '../contract/abi.json';

import Web3 from 'web3';

import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from '@web3-react/injected-connector'
export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
})

const url = 'https://ropsten.infura.io/v3/02be7a3654c84c44a776f81558798c6b';
const contractAddress = '0x0a632692F9b491cA9e32ADb79deCebf98Fc34918';

export default function Home({ setAccount }) {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    async function connect() {
        try {
            await activate(injected)
            // const web3 = new Web3(Web3.givenProvider);

            // const contract = new web3.eth.Contract(abi, contractAddress);
            // const admin = await contract.methods.admin().call();
            // console.log(admin, web3.currentProvider.selectedAddress);

            // const address = web3.currentProvider.selectedAddress;
            // setAccount(address, web3, contract);
        } catch (ex) {
            console.log(ex)
        }
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

    const string = active ? 'Connected with ' + account
        : 'Not Connected';

    return (
        <div>
            <Button
                onClick={() => {
                    connect();
                    setAccount(account);
                }}
                variant='contained'
            >
                Connect to MetaMask
            </Button>

            <Typography>
                {string}
            </Typography>

            <Button
                onClick={disconnect}
                variant='contained'
                color='error'
            >
                Disconnect
            </Button>
        </div>
    )
}