import { schemaComposer } from 'graphql-compose';
import { UserModel } from './user.model';
import { UserTC } from '../../graphql/types';

const output = schemaComposer.createObjectTC({
  name: 'v1ListUsersOutput',
  fields: {
    users: [UserTC],
  },
});

export const v1ListUsers = schemaComposer.createResolver({
  name: 'v1ListUsers',
  type: output,
  resolve: async () => {
    const users = await UserModel.find();

    return { users };
  },
});
