import { Schema } from 'mongoose';

const accountSchema = new Schema({
  compoundId: { type: String, required: true },
  userId: { type: String, required: true },
  providerType: { type: String, required: true },
  providerId: { type: String, required: true },
});
