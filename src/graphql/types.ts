import { composeWithMongoose } from 'graphql-compose-mongoose';
import { UserModel } from '@modules/user/user.model';

export const UserTC = composeWithMongoose(UserModel);

export type SingleGraphQLResponse<ResponseData> = {
  body: {
    kind: 'single';
    singleResult: {
      data: ResponseData;
    };
  };
};
