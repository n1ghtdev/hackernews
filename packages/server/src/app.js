import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';

import { news } from './api/news';
import { auth } from './api/auth';
import { notFound, errorHandler } from './middlewares';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const app = express();

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TODO: express.json()
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/news', news);
app.use('/api/auth', auth);

if (isProd) {
  const buildPath = path.resolve(__dirname, '../../client/build');
  const indexHtml = path.join(buildPath, 'index.html');

  app.use(express.static(buildPath));

  app.get('*', (req, res) => res.sendFile(indexHtml));
}

app.use(notFound);
app.use(errorHandler);

export { app };
