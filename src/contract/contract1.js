// import Web3 from 'web3';
// import abi from './abi.json';
// import HDWalletProvider from 'truffle-hdwallet-provider';
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const fs = require('fs');

let rawdata = fs.readFileSync('abi.json');
const abi = JSON.parse(rawdata);

// const url = 'https://sandbox.truffleteams.com/8f7572d1-e253-420a-93bc-2ed8a6f051e6';
// const web3 = new Web3(url);
// const address = 

// WEB3 AND CONTRACT STUFF
const url = 'https://ropsten.infura.io/v3/02be7a3654c84c44a776f81558798c6b';
const apikey = '9dbeb2af8148cd6636570083e68b216a8322bfd2653b2b18a475ec65eeefc271';
const provider = new HDWalletProvider(apikey, url);
const web3 = new Web3(provider);
const address = '0x0a632692F9b491cA9e32ADb79deCebf98Fc34918';

const contract = new web3.eth.Contract(abi, address)
const ropsten = '0xc59E499d8E789986A08547ae5294D14C5dd91D9f';
web3.eth.defaultAccount = ropsten;

async function getAccounts() {
    const rtn = await web3.eth.getAccounts();
    console.log(rtn);
    return rtn;
}

getAccounts();
contract.methods.admin().call()
.then(console.log)
.catch(console.log)

async function getToken(id) {
    const rtn = await contract.methods.tokens(id).call();
    console.log(rtn);
    return rtn;
}

async function getBalance(from, id) {
    const rtn = await contract.methods.balanceOf(from, id).call();
    return rtn;
}

module.exports = {
  networks: {
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider(apikey, "https://ropsten.infura.io/"),
      network_id: '3',
    }
  }
};

