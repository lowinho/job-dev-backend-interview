import express, {RequestHandler} from 'express';

import { routes } from "./routes";
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests

export const app = express();
app.use(limiter)
app.use(cors());
app.use('/images/restaurant', express.static(resolve(__dirname, 'uploads', 'images', 'restaurant')))
app.use('/images/product', express.static(resolve(__dirname, 'uploads', 'images', 'product')))

app.use(helmet());
app.use(express.json());
// app.use(express.json() as RequestHandler);
app.use(routes);