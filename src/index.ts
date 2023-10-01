import database from "./config/database";
import _graphqlSchema from "./modules/kittens/kitty.model";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

async function start() {
  const server = new ApolloServer({ schema: _graphqlSchema });

  await database.connect();

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });

  console.log(`App running on url ${url}`);
}

start();
