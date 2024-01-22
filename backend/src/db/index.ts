import mongoose, { set } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error('Invalid missing environment variable: "MONGO_URI"');

export const connectToDB = async () => {
  await mongoose.connect(MONGO_URI);

  console.log(`Connected to database at ${MONGO_URI}`);
};

if (process.env.TS_NODE_DEV) set('debug', true);
