const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const INITIAL_MESSAGE = 'First Rinkeby Contract by nestor';

const provider = new HDWalletProvider(
    'PUT YOUR OWN :P',
    'USE YOUR OWN KEY'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting deployment using account', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
        .send({gas: '1000000', from: accounts[0]});
    console.log('Contract deployed to address:', result.options.address);
};

deploy();