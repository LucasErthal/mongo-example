import { GraphQLFormattedError } from 'graphql';

export type SingleGraphQLResponse<ResponseData> = {
  body: {
    kind: 'single';
    singleResult: {
      data: ResponseData;
      errors: readonly GraphQLFormattedError[] | undefined;
    };
  };
};

export type User = {
  _id: string;
  email: string;
  name: string;
};

export type CreateUserResponse = {
  v1CreateUser: {
    user: User;
  };
};

export type UpdateUserResponse = {
  v1UpdateUser: {
    user: User;
  };
};

export type DeleteUserResponse = {
  v1DeleteUser: {
    user: User;
  };
};

export type ListUsersResponse = {
  v1ListUsers: {
    users: User[];
  };
};
