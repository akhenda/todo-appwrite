import { Client, Databases } from 'appwrite';

import { env } from '@/config';

const client = new Client();

client.setEndpoint(env.VITE_APPWRITE_ENDPOINT).setProject(env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export { client, databases };
