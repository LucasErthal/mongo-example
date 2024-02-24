import { schemaComposer } from 'graphql-compose';
import { UserModel } from './user.model';
import { UserTC } from '@graphql/types';

const input = {
  _id: 'String!',
  name: 'String',
  email: 'String',
};

const output = schemaComposer.createObjectTC({
  name: 'v1UpdateUserOutput',
  fields: {
    user: UserTC,
  },
});

export const v1UpdateUser = schemaComposer.createResolver({
  name: 'v1UpdateUser',
  args: input,
  type: output,
  resolve: async ({ args }) => {
    const userExists = await UserModel.exists({ _id: args._id });
    if (!userExists) throw new Error('User not exists');

    const user = await UserModel.findByIdAndUpdate(args).lean();

    return { user };
  },
});
