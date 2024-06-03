/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/ban-types */
// https://stackoverflow.com/a/68261113

/* eslint-disable @typescript-eslint/no-namespace */
import 'appwrite';

declare module 'appwrite' {
  export declare namespace Models {
    // Utility type to filter out the index signature
    type RemoveIndex<T> = {
      [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
    };

    // New type without the index signature
    type DocumentWithoutIndex = RemoveIndex<Document>;

    // Extend the Document interface with the new type
    /**
     * Document (Modified)
     */
    interface Document extends DocumentWithoutIndex {}
  }
}

export {};
