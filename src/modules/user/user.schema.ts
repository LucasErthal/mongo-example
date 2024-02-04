import { schemaComposer } from 'graphql-compose';
import { v1CreateUser } from './v1-create-user';
import { v1ListUsers } from './v1-list-users';

schemaComposer.Query.addFields({
  v1ListUsers,
});

schemaComposer.Mutation.addFields({
  v1CreateUser,
});

const UserGraphqlSchema = schemaComposer.buildSchema();

export default UserGraphqlSchema;
