import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { setHealthRoutes } from '../infrastructure/routes/health.routes';
import { setChatRoutes } from '../infrastructure/routes/chat.routes';
import { appConfig } from '../shared/config/app.config';

const app = express();
const apiRouter = express.Router();

app.use(cors());
app.use(express.json());

setHealthRoutes(apiRouter);
setChatRoutes(apiRouter);

app.use('/api', apiRouter);

app.listen(appConfig.port, () =>
  console.log(`Server is running on http://localhost:${appConfig.port} 🚀`)
);
