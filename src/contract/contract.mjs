import Web3 from 'web3';
import abi from './abi.json';
// import c from './contract/ropsten.mjs';
import HDWalletProvider from 'truffle-hdwallet-provider';

const url = 'https://ropsten.infura.io/v3/02be7a3654c84c44a776f81558798c6b';
const apikey = '9dbeb2af8148cd6636570083e68b216a8322bfd2653b2b18a475ec65eeefc271';

function provider() {
    return new HDWalletProvider(apikey, url);
}
const web3 = new Web3(provider);

const contractAddress = '0x0a632692F9b491cA9e32ADb79deCebf98Fc34918';
const address = '0xc59E499d8E789986A08547ae5294D14C5dd91D9f';

const contract = new web3.eth.Contract(abi, contractAddress)

export async function getAccounts() {
    const rtn = await web3.eth.getAccounts();
    console.log(rtn);
    return rtn;
}

getAccounts();

export async function getToken(id) {
    const rtn = await contract.methods.tokens(id).call();
    return rtn;
}

export async function getBalance(from, id) {
    const rtn = await contract.methods.balanceOf(from, id).call();
    return rtn;
}

export { web3, contract };
