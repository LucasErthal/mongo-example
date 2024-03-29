import mongoose from 'mongoose';

mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.');
});

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.');
});

export const database = {
  async connect() {
    await mongoose.connect(
      `mongodb://${process.env.DB_LOCATION}:27017/testdb`,
      {
        authSource: 'admin',
        user: 'root',
        pass: 'example',
      }
    );
  },

  async disconnect() {
    await mongoose.disconnect();
  },
};
