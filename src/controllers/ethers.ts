const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;

export const sendBNB = async (fromAddress: string, toAddress: string, pk: string, amountToSend: number) => {
	const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_PROVIDER));
	const privateKey = Buffer.from(pk, 'hex');
	const count = await web3.eth.getTransactionCount(fromAddress);

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

	const curGasPrice = await web3.eth.getGasPrice();

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

	await web3.eth.sendSignedTransaction(serial, (err: any, hash: any) => {
		if (!err) {
			console.log({ hash });
			return { hash, toAddress, amountToSend };
		}

		console.log(err);
		return err;
	});
};
