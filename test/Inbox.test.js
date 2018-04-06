const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');
const INITIAL_MESSAGE = 'Welcome to Smart Contracts';
const SECOND_MESSAGE = 'Blockchain and Ethereum!';

let accounts;
let inbox

beforeEach(async () => {
    //Getting accounts
    accounts = await web3.eth.getAccounts();
    //Use an account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
        .send({from: accounts[0], gas: '1000000'});
    inbox.setProvider(provider);
});

describe('Inbox Contract', () => {
    it('deploying contract', () => {
        assert.ok(inbox.options.address);
    });

    it('contract has the default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MESSAGE);
    });

    it('contract is able to change the message', async () => {
        await inbox.methods.setMessage(SECOND_MESSAGE).send({from: accounts[1]});
        const message = await inbox.methods.message().call();
        assert.equal(message, SECOND_MESSAGE);
    });
});