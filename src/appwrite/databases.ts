import { ID } from 'appwrite';
import { type Models } from 'appwrite';

import { env } from '@/config';

import { databases } from './config';
import { DocumentWithoutIndex, Note, Product } from './types';

const collections = {
  notes: {
    dbId: env.VITE_APPWRITE_DATABASE_ID,
    docType: {} as Note,
    id: env.VITE_APPWRITE_COLLECTION_ID_NOTES,
  },
  products: {
    dbId: env.VITE_APPWRITE_DATABASE_ID,
    docType: {} as Product,
    id: env.VITE_APPWRITE_COLLECTION_ID_NOTES,
  },
};

type CollectionConfig = typeof collections;
type CollectionName = keyof CollectionConfig;

type DbType = {
  [K in CollectionName]: {
    create: (
      payload: Omit<CollectionConfig[K]['docType'], keyof DocumentWithoutIndex>,
      permissions?: string[],
      id?: string,
    ) => Promise<CollectionConfig[K]['docType']>;
    delete: (id: string) => Promise<object>;
    get: (id: string) => Promise<CollectionConfig[K]['docType']>;
    list: (
      queries?: string[],
    ) => Promise<Models.DocumentList<CollectionConfig[K]['docType']>>;
    update: (
      id: string,
      payload: Partial<Omit<CollectionConfig[K]['docType'], keyof DocumentWithoutIndex>>,
      permissions?: string[],
    ) => Promise<CollectionConfig[K]['docType']>;
  };
};

const db = {} as DbType;

function createCollectionMethods<T extends keyof CollectionConfig>(name: T) {
  const { dbId, id: colId, docType } = collections[name];

  return {
    create: (
      payload: Omit<typeof docType, keyof DocumentWithoutIndex>,
      permissions: string[] = [],
      docId = ID.unique(),
    ) => {
      return databases.createDocument(dbId, colId, docId, payload, permissions);
    },
    delete: (docId: string) => databases.deleteDocument(dbId, colId, docId),
    get: (docId: string) => databases.getDocument<typeof docType>(dbId, colId, docId),
    list: (queries = []) => databases.listDocuments<typeof docType>(dbId, colId, queries),
    update: (
      docId: string,
      payload: Omit<typeof docType, keyof DocumentWithoutIndex>,
      permissions: string[] = [],
    ) => {
      return databases.updateDocument(dbId, colId, docId, payload, permissions);
    },
  };
}

(Object.keys(collections) as CollectionName[]).forEach((name) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  db[name] = createCollectionMethods(name);
});

export default db;
