import HDWalletProvider from 'truffle-hdwallet-provider';

const url = 'https://ropsten.infura.io/v3/02be7a3654c84c44a776f81558798c6b';
const apikey = '9dbeb2af8148cd6636570083e68b216a8322bfd2653b2b18a475ec65eeefc271';

const exports = {
    networks: {
        ropsten: {
            // must be a thunk, otherwise truffle commands may hang in CI
            provider: () =>
                new HDWalletProvider(apikey, url),
            network_id: '3',
        }
    }
};

export default exports;