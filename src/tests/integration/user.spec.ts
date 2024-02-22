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

type DeleteUsersResponse = {
  v1DeleteUser: {
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
    email: 'user_tes10@email.com',
  };

  let userId: string;

  beforeAll(async () => {
    server = await start();
  });

  afterAll(async () => {
    server.stop();
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

    userId = user._id;

    expect(user._id).toBeTruthy();
  });

  test('When an user tries to create account', async () => {
    const response = (await server.executeOperation({
      query: `mutation V1DeleteUser($id: String!) {
  v1DeleteUser(_id: $id) {
    user {
      _id
      email
      name
    }
  }
}`,
      variables: { id: userId },
    })) as SingleGraphQLResponse<DeleteUsersResponse>;

    const user = response.body.singleResult.data.v1DeleteUser.user;

    expect(user._id).toBeTruthy();
  });
});
