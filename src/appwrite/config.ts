import { Account, Client, Databases, ID } from 'appwrite';

import { env } from '@/config';

const client = new Client();

client.setEndpoint(env.VITE_APPWRITE_ENDPOINT).setProject(env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { account, client, databases, ID };
