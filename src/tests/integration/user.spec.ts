import { server } from '@src/config/apolloServer';
import {
  CreateUserResponse,
  DeleteUserResponse,
  ListUsersResponse,
  SingleGraphQLResponse,
  UpdateUserResponse,
} from './types';

describe('Given the user workflow and user data', () => {
  const userInput = {
    name: 'test user',
    email: 'user_tes10@email.com',
  };

  let userId: string;

  beforeAll(async () => {
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
  });

  describe('When an user tries to create account', () => {
    describe('And not exist an user with same email', () => {
      test('Then should create user and return the id', async () => {
        const response = (await server.instance.executeOperation({
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
        })) as SingleGraphQLResponse<CreateUserResponse>;

        const user = response.body.singleResult.data.v1CreateUser.user;

        userId = user._id;

        expect(user._id).toBeTruthy();
      });
    });

    describe('And already exist an user with same email', () => {
      test('Then should return "User already exists" message', async () => {
        const response = (await server.instance.executeOperation({
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
        })) as SingleGraphQLResponse<CreateUserResponse>;

        const errors = response?.body?.singleResult?.errors;
        const errorMessage = errors ? errors[0].message : '';

        expect(errorMessage).toEqual('User already exists');
      });
    });
  });

  describe('When an user tries to update account', () => {
    describe('And the user exists', () => {
      test('Then should return updated user', async () => {
        const response = (await server.instance.executeOperation({
          query: `mutation Mutation( $id: String! $name: String, $email: String) {
  v1UpdateUser(_id: $id, name: $name, email: $email) {
    user {
      _id
      email
      name
    }
  }
}`,
          variables: {
            ...userInput,
            id: userId,
          },
        })) as SingleGraphQLResponse<UpdateUserResponse>;

        const user = response.body.singleResult.data.v1UpdateUser.user;

        userId = user._id;

        expect(user._id).toBeTruthy();
      });
    });

    describe('And the user not exists', () => {
      test('Then should return "User not exists" message', async () => {
        const response = (await server.instance.executeOperation({
          query: `mutation Mutation( $id: String! $name: String, $email: String) {
  v1UpdateUser(_id: $id, name: $name, email: $email) {
    user {
      _id
      email
      name
    }
  }
}`,
          variables: {
            ...userInput,
            //fake id
            id: '65daaffbfb820bdece820448',
          },
        })) as SingleGraphQLResponse<UpdateUserResponse>;

        const errors = response?.body?.singleResult?.errors;
        const errorMessage = errors ? errors[0].message : '';

        expect(errorMessage).toEqual('User not exists');
      });
    });
  });

  describe('When users are listed', () => {
    test('Then should return users', async () => {
      const response = (await server.instance.executeOperation({
        query: `query Query {
  v1ListUsers {
    users {
      name
      email
      _id
    }
  }
}`,
        variables: { id: userId },
      })) as SingleGraphQLResponse<ListUsersResponse>;

      const users = response.body.singleResult.data.v1ListUsers.users;

      expect(Array.isArray(users)).toBe(true);
    });
  });

  describe('When an user tries to delete account', () => {
    describe('And the user exists', () => {
      test('Then should return the id of deleted user', async () => {
        const response = (await server.instance.executeOperation({
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
        })) as SingleGraphQLResponse<DeleteUserResponse>;

        const user = response.body.singleResult.data.v1DeleteUser.user;

        expect(user._id).toBeTruthy();
      });
    });

    describe('And the user not exists', () => {
      test('Then should return "User not exists" message', async () => {
        const response = (await server.instance.executeOperation({
          query: `mutation V1DeleteUser($id: String!) {
  v1DeleteUser(_id: $id) {
    user {
      _id
      email
      name
    }
  }
}`,
          variables: { id: '65daaffbfb820bdece820448' },
        })) as SingleGraphQLResponse<DeleteUserResponse>;

        const errors = response?.body?.singleResult?.errors;
        const errorMessage = errors ? errors[0].message : '';

        expect(errorMessage).toEqual('User not exists');
      });
    });
  });
});
