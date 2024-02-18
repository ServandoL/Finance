import { GraphQLError } from 'graphql';
import * as config from './config.js';
import { client } from './mongo.js';
import { WithId } from 'mongodb';

export class DBDatasource {
  static create() {
    return new DBDatasource();
  }
  static async exec() {
    const ds = DBDatasource.create();
    try {
      return await ds.getInfo();
    } catch (error) {
      const errMessage = (error as Error).name + ' ' + (error as Error).message;
      console.error(errMessage);
      throw new GraphQLError(errMessage);
    }
  }
  public async getInfo(): Promise<WithId<config.Info>[]> {
    const coln = client.db(config.database).collection(config.coln);
    try {
      return (await coln.find({}).toArray()) as WithId<config.Info>[];
    } catch (error) {
      const errMessage = (error as Error).name + ' ' + (error as Error).message;
      console.error(errMessage);
      throw new GraphQLError(errMessage);
    }
  }
}
