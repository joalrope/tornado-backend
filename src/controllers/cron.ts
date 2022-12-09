import nodeCron from 'node-cron';
import { sendBNB } from './ethers';
import { receivers } from './receivers';

export const cronController = (amount: number) => {
	nodeCron.schedule('0 0 * * * *', async () => {
		console.log(new Date().toLocaleString());

		let i = 1;
		const porcInc = 0.1;

		for (const address of receivers) {
			const fee = (amount / 17.53116706) * (1 + porcInc) ** i;

			console.log({ i, fee, address });

			const result = await sendBNB(
				'0x67e9EE837eFbFDF2423F6B5CDE5b07803eb31CC8',
				address,
				'72bfc9cbee925de33cafec44da078dafad37d295e365b783050021ae16f43b97',
				fee
			);

			console.log({ i, address, fee, result });
			i++;
		}
	});
};
