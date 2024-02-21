import { ApolloServer, BaseContext } from '@apollo/server';
import { start } from '@src/config/apolloServer';
import { SingleGraphQLResponse } from '@src/graphql/types';

type CreateUsersResponse = {
  v1CreateUser: {
    user: {
      _id: string;
      email: string;
      name: string;
    };
  };
};

describe('Given the user workflow and user data', () => {
  let server: ApolloServer<BaseContext>;

  const userInput = {
    name: 'test user',
    email: 'user_test3@email.com',
  };

  beforeAll(async () => {
    server = await start();
  });

  test('When an user tries to create account', async () => {
    const response = (await server.executeOperation({
      query: `mutation Mutation($name: String!, $email: String!) {
  v1CreateUser(name: $name, email: $email) {
    user {
      _id
      email
      name
    }
  }
}`,
      variables: userInput,
    })) as SingleGraphQLResponse<CreateUsersResponse>;

    const user = response.body.singleResult.data.v1CreateUser.user;

    console.log('Id:', user._id);
    expect(user._id).toBeTruthy();
  });
});
