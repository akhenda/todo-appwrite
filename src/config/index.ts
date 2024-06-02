import { cleanEnv, str } from 'envalid';

const env = cleanEnv(import.meta.env, {
  VITE_APPWRITE_COLLECTION_ID_NOTES: str({ desc: 'The ID of the tasks collection' }),
  VITE_APPWRITE_DATABASE_ID: str({ desc: 'The Appwrite DB ID' }),
  VITE_APPWRITE_ENDPOINT: str({
    default: 'https://cloud.appwrite.io/v1',
    desc: 'The Appwrite endpoint',
  }),
  VITE_APPWRITE_PROJECT_ID: str({ desc: 'Our Appwrite project ID' }),
});

export { env };
