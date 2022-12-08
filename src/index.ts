import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';
//import { dbConnection } from './database/config';
//import { dbConnectionSatus } from './middlewares/dbConectionStatus';
import { userRouter } from './routes/auth';
import { cronRouter } from './routes/cron';
import { sendBNB } from './controllers/ethers';
import { cronController } from './controllers/cron';

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

cronController(263);

app.listen(port, () => {
	console.log(`⚡️[server]: Servidor corriendo en https://localhost:${port}`);
});
