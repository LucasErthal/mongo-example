import Mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const UserSchema = new Mongoose.Schema({
  name: String,
  email: String,
});

export const UserModel = Mongoose.model('User', UserSchema);

export const UserTC = composeWithMongoose(UserModel);
