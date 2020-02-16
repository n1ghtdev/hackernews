import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

const app = express();
app.use(bodyParser.json());

app.get('/api/test', (req, res) => res.json({ hello: 'world' }));

if (isProd) {
  const buildPath = path.resolve(__dirname, '../../client/build');
  const indexHtml = path.join(buildPath, 'index.html');

  app.use(express.static(buildPath));

  app.get('*', (req, res) => res.sendFile(indexHtml));
}

export { app };
