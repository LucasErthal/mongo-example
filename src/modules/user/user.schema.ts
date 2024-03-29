import { schemaComposer } from 'graphql-compose';
import { v1CreateUser } from './v1-create-user';
import { v1ListUsers } from './v1-list-users';
import { v1DeleteUser } from './v1-delete-user';
import { v1UpdateUser } from './v1-update-user';

schemaComposer.Query.addFields({
  v1ListUsers,
});

schemaComposer.Mutation.addFields({
  v1CreateUser,
  v1DeleteUser,
  v1UpdateUser,
});

const UserGraphqlSchema = schemaComposer.buildSchema();

export default UserGraphqlSchema;
