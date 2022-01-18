import { Schema, model, connect } from 'mongoose';

export const atlasUrl = `mongodb+srv://admin:admin_password@cluster0.dpvjf.mongodb.net/logs_database?retryWrites=true&w=majority`;
export const logSchema = new Schema({
  timestamp: Date,
  url: String,
  method: String,
  body: Object,
});
export const logModel = model('logs', logSchema);
