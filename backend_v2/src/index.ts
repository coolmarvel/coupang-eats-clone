import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDB } from './db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`coupang eats backend listening on port ${PORT}`);
});

connectToDB();
