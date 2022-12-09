import { contractAbi } from './abi';
import Web3 from 'web3';
const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;

const pk = '72bfc9cbee925de33cafec44da078dafad37d295e365b783050021ae16f43b97';

const BSC_FORK = Common.forCustomChain(
	'mainnet',
	{
		name: 'bnb',
		networkId: 97,
		chainId: 97,
		url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
	},
	'istanbul'
);

export const mint = async (receiver: string, amt: number) => {
	const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_PROVIDER!));
	const owner = await web3.eth.accounts.privateKeyToAccount(pk).address;

	//to remove transaction replacement error, I have added 1 to nonce with pending transactions.
	let nonce = (await web3.eth.getTransactionCount(owner, 'pending')) + 1;

	const amount = web3.utils.toHex(amt);
	const contract = new web3.eth.Contract(contractAbi, owner);
	const mintFunction = contract.methods.mint(receiver, amount).encodeABI();
	const NetworkId = await web3.eth.net.getId();

	/**
	 * Raw_transaction instance to specify all parameters for ethereumjs-tx Transation
	 */

	const curGasPrice = await web3.eth.getGasPrice();
	const gasPrice = web3.utils.toHex(curGasPrice);

	const rawTx = {
		from: owner,
		to: '0x67e9EE837eFbFDF2423F6B5CDE5b07803eb31CC8',
		data: mintFunction,
		nonce: nonce,
		value: web3.utils.toHex(10),
		gasLimit: web3.utils.toHex(210000),
		gasPrice,
		chainId: NetworkId,
	};

	/**
	 * @dev initiate transaction with Raw_trasansaction instance for ethereumjs-tx Transaction
	 */
	let transaction = new Tx(rawTx, { common: BSC_FORK });

	/**
	 * @dev sign the transaction with private key to change blockchain status
	 */
	transaction.sign(pk);

	/**
	 * @dev send the signed transaction to smart contract
	 */
	web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'), (err: any, hash: any) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Mint Transaction Hash : ' + hash);
			console.log('Token minting successful.');
			return hash;
		}
	});
};
