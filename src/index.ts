import database from './config/database';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schemas } from './modules';

async function start() {
  const server = new ApolloServer({ schema: schemas });

  await database.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`App running on url ${url}`);
}

start();
