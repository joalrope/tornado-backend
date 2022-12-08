"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBNB = void 0;
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
const sendBNB = (fromAddress, toAddress, pk, amountToSend) => __awaiter(void 0, void 0, void 0, function* () {
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_PROVIDER));
    const privateKey = Buffer.from(pk, 'hex');
    const count = yield web3.eth.getTransactionCount(fromAddress);
    /*var BSC_FORK = Common.forCustomChain(
        'mainnet',
        {
            name: 'Binance Smart Chain Mainnet',
            networkId: 56,
            chainId: 56,
            url: 'https://bsc-dataseed.binance.org/',
        },
        'istanbul'
        );*/
    const BSC_FORK = Common.forCustomChain('mainnet', {
        name: 'bnb',
        networkId: 97,
        chainId: 97,
        url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    }, 'istanbul');
    const curGasPrice = yield web3.eth.getGasPrice();
    console.log({ count, from: web3.eth.accounts.privateKeyToAccount(pk).address });
    const rawTransaction = {
        from: web3.eth.accounts.privateKeyToAccount(pk).address,
        gasPrice: web3.utils.toHex(curGasPrice),
        gasLimit: web3.utils.toHex(49000000),
        to: toAddress,
        value: web3.utils.toHex(amountToSend),
        nonce: 100, //web3.utils.toHex(count),
    };
    console.log('rawTransaction');
    const transaction = new Tx(rawTransaction, { common: BSC_FORK });
    transaction.sign(privateKey);
    const serial = '0x' + transaction.serialize().toString('hex');
    console.log('serial==========================');
    yield web3.eth.sendSignedTransaction(serial, (err, hash) => {
        if (!err) {
            console.log({ hash });
            return { hash, toAddress, amountToSend };
        }
        console.log(err);
        return err;
    });
});
exports.sendBNB = sendBNB;
