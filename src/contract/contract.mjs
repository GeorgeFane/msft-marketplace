import Web3 from 'web3';
import abi from './abi.json';

const url = 'https://sandbox.truffleteams.com/8f7572d1-e253-420a-93bc-2ed8a6f051e6';
const web3 = new Web3(url);

const address = '0x68B1E8B23b5D22d693dAC051a02c7FC2B5875329';
const contract = new web3.eth.Contract(abi, address)

export async function getAccounts() {
    const rtn = await web3.eth.getAccounts();
    return rtn;
}

export async function getToken(id) {
    const rtn = await contract.methods.tokens(id).call();
    return rtn;
}

export async function getBalance(from, id) {
    const rtn = await contract.methods.balanceOf(from, id).call();
    return rtn;
}

export { web3, contract };
