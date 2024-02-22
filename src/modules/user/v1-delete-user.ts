import { UserTC } from '@src/graphql/types';
import { schemaComposer } from 'graphql-compose';
import { UserModel } from './user.model';

const input = {
  _id: 'String!',
};

const output = schemaComposer.createObjectTC({
  name: 'v1DeleteUserOutput',
  fields: {
    user: UserTC,
  },
});

export const v1DeleteUser = schemaComposer.createResolver({
  name: 'v1DeleteUser',
  args: input,
  type: output,
  resolve: async ({ args }) => {
    const { _id } = args;
    const userExists = await UserModel.exists({ _id });
    if (!userExists) throw new Error('User not exists');

    const user = await UserModel.findOneAndDelete({ _id });

    return { user };
  },
});
