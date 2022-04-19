import express, {RequestHandler} from 'express';

import { routes } from "./routes";
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';

export const app = express();
app.use(cors());
app.use('/images/restaurant', express.static(resolve(__dirname, 'uploads', 'images', 'restaurant')))
app.use('/images/product', express.static(resolve(__dirname, 'uploads', 'images', 'product')))

app.use(helmet());
app.use(express.json());
// app.use(express.json() as RequestHandler);
app.use(routes);