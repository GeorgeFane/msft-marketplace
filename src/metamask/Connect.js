import { Button, Typography } from '@mui/material';

import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from '@web3-react/injected-connector'
export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
})

export default function Home() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    async function connect() {
        try {
            await activate(injected)
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
                onClick={connect}
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