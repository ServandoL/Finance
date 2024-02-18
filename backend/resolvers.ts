import { GraphQLError } from 'graphql';
import { DBDatasource } from './datasource.js';

export const resolvers = {
  Query: {
    info: async () => {
      try {
        return await DBDatasource.exec();
      } catch (error) {
        const errMessage = (error as Error).name + ' ' + (error as Error).message;
        console.error(errMessage);
        throw new GraphQLError(errMessage);
      }
    },
  },
};
