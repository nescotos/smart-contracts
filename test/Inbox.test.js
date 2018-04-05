const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = Web3(ganache.provider());

let accounts;

beforeEach(async () => {
    //Getting accounts
    accounts = await web3.eth.getAccounts();
    //Use an account to deploy the contract
});

describe('Inbox Contract', () => {
    it('deploying contract', () => {
        console.log(accounts);
    });
});