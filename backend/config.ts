import * as dotenv from 'dotenv';
dotenv.config();
export const connectionString = process.env['connectionString'] ?? '';
export const database = process.env['db'] ?? '';
export const coln = process.env['coln'] ?? '';
export const introspection = process.env['introspection'] === 'true';

export interface Info {
  key: string;
  id: string;
}
