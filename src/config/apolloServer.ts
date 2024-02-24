require('dotenv').config();
import { database } from './database';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schemas } from '@modules/index';

const instance = new ApolloServer({ schema: schemas });

export const server = {
  instance,
  async start() {
    await database.connect();

    const { url } = await startStandaloneServer(instance, {
      listen: { port: 3000 },
    });

    console.log(`App running on url ${url}`);
  },

  async stop() {
    await instance.stop();
    await database.disconnect();
  },
};
