import { MongoClient } from 'mongodb';
import { connectionString } from './config.js';

export let client: MongoClient;
export async function mongoStart() {
  client = new MongoClient(connectionString);
  await client.connect();
  client
    .on('connectionReady', () => {
      console.log('Mongo db connected.');
    })
    .on('close', () => {
      console.log('Mongo db connection closed.');
    })
    .on('error', (ev) => {
      console.log('Mongo Error:', ev.name, ev.message);
    });
}
