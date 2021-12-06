import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import Connect from './Connect';

function getLibrary(provider) {
    return new Web3(provider)
}

function MyApp({ Component, pageProps, setAccount }) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Connect
                {...pageProps}
                setAccount={setAccount}
            />
        </Web3ReactProvider>
    )
}

export default MyApp