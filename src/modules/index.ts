import { mergeSchemas } from '@graphql-tools/schema';
import UserGraphqlSchema from './user/user.schema';

export const schemas = mergeSchemas({ schemas: [UserGraphqlSchema] });
