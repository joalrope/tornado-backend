import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
//import { dbConnection } from './database/config';
//import { dbConnectionSatus } from './middlewares/dbConectionStatus';
import { userRouter } from './routes/auth';
import { cronRouter } from './routes/cron';
//import { sendBNB } from './controllers/ethers';
//import { cronController } from './controllers/cron';
//import nodeCron from 'node-cron';
//import { receivers } from './controllers/receivers';
//import { sendBNB } from './controllers/ethers';
import { mint } from './controllers/mint';

/*const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;
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

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NETWORK_PROVIDER));*/
config();

const app: Express = express();

//dbConnection();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));
app.use(express.json());

//app.use(dbConnectionSatus);
app.use('/api/cipher', cronRouter);
app.use('/api/auth', userRouter);

const port = process.env.PORT;

/*const amount = 263;
const fromAddress = '0x67e9EE837eFbFDF2423F6B5CDE5b07803eb31CC8';
const pk = '72bfc9cbee925de33cafec44da078dafad37d295e365b783050021ae16f43b97';
const porcInc = 0.1;*/

//nodeCron.schedule('0 */1 * * * *', async () => {

/*const task = async () => {
	console.log(new Date().toLocaleString());
	const privateKey = Buffer.from(pk, 'hex');
	//const count = await web3.eth.getTransactionCount(fromAddress);
	const curGasPrice = await web3.eth.getGasPrice();
	const from = await web3.eth.accounts.privateKeyToAccount(pk).address;
	const gasPrice = web3.utils.toHex(curGasPrice);
	const gasLimit = web3.utils.toHex(49000000);
	const to = '';
	const value = web3.utils.toHex(0);
	const nonce = web3.utils.toHex(100); //web3.utils.toHex(count),

	console.log({ curGasPrice });

	const rawTransaction = { from, gasPrice, gasLimit, to, value, nonce };

	//console.log({ count, from: web3.eth.accounts.privateKeyToAccount(pk).address });

	//console.log({ rawTransaction });
	let i = 1;

	for (const address of receivers) {
		const fee = (amount / 17.53116706) * (1 + porcInc) ** i;

		rawTransaction.to = address;
		rawTransaction.value = web3.utils.toHex(1000); //fee
		rawTransaction.nonce = web3.utils.toHex(100 * i);
		i++;

		/*const result = await sendBNB(
			'0x67e9EE837eFbFDF2423F6B5CDE5b07803eb31CC8',
			address,
			'72bfc9cbee925de33cafec44da078dafad37d295e365b783050021ae16f43b97',
			fee
			);*/

/*console.log({ rawTransaction });
		const transaction = new Tx(rawTransaction, { common: BSC_FORK });
		transaction.sign(privateKey);

		const serial = '0x' + transaction.serialize().toString('hex');
		console.log({ serial });
		const result = await web3.eth
			.sendSignedTransaction(serial, (err: {}, hash: any) => {
				if (!err) {
					console.log({ hash });
					return { hash, address, fee };
				}

				console.log(`error sendSignedTransaction ===>: ${err}`);
				return err;
			})
			.then((res: any) => {
				console.log(res);
				return res;
			});

		console.log({ i: i - 1, address, fee, result });
		return result;
	}
};*/
//});
mint('0x080b7e4e297c134b616bda47006dfc236b24ba40', 10);

app.listen(port, () => {
	console.log(`⚡️[server]: Servidor corriendo en https://localhost:${port}`);
});
