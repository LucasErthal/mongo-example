require('dotenv').config();
import database from './database';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schemas } from '@modules/index';

export async function start() {
  const server = new ApolloServer({ schema: schemas });
  await database.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`App running on url ${url}`);

  return server;
}
