import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import Connect from './Connect';

function getLibrary(provider) {
    return new Web3(provider)
}

function MyApp({ Component, pageProps }) {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Connect {...pageProps} />
        </Web3ReactProvider>
    )
}

export default MyApp