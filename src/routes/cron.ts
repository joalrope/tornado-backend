import { Router } from 'express';
import { cronController } from '../controllers/cron';

export const cronRouter = Router();

cronRouter.post('/cron', [], cronController);
