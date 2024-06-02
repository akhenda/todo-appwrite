import { type Models } from 'appwrite';

export type Note = Models.Document & {
  body: string;
  completed: boolean;
};
