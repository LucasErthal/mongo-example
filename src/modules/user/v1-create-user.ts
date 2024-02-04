import { schemaComposer } from 'graphql-compose';
import { UserModel } from './user.model';

const input = {
  name: 'String!',
  email: 'String!',
};

const output = schemaComposer.createObjectTC({
  name: 'v1CreateUserOutput',
  fields: {
    _id: 'String',
    name: 'String',
    email: 'String',
  },
});

export const v1CreateUser = schemaComposer.createResolver({
  name: 'v1CreateUser',
  args: input,
  type: output,
  resolve: async ({ args }) => {
    const userAlreadyExists = await UserModel.exists({ email: args.email });
    if (userAlreadyExists) throw new Error('User already exists');

    const user = await UserModel.create(args);

    return user;
  },
});
