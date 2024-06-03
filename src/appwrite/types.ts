import { type Models } from 'appwrite';

// Utility type to filter out the index signature
type RemoveIndex<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
};

// New type without the index signature
export type DocumentWithoutIndex = RemoveIndex<Models.Document>;

export type CollectionConfig<T> = {
  dbId: string;
  docType: T;
  id: string;
  name: string;
};

export type Note = DocumentWithoutIndex & {
  body: string;
  completed: boolean;
};

export type Product = DocumentWithoutIndex & {
  title: string;
  price: number;
};
