import Mongoose from 'mongoose';

const UserSchema = new Mongoose.Schema({
  name: String,
  email: String,
});

export const UserModel = Mongoose.model('User', UserSchema);
