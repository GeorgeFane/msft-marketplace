import Web3 from 'web3';
import abi from './abi.json';

const url = 'https://sandbox.truffleteams.com/8f7572d1-e253-420a-93bc-2ed8a6f051e6';
const web3 = new Web3(url);

const address = '0x2474B048D916C141B0E2F0027BA121506563212c';
const contract = new web3.eth.Contract(abi, address)

export async function getAccounts() {
    const rtn = await web3.eth.getAccounts();
    return rtn;
}

export { web3, contract };
