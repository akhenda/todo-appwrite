import { useEffect, useState } from 'react';

import { databases } from '@/appwrite/config';
import { Note } from '@/appwrite/types';
import { env } from '@/config';

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const init = async () => {
    const response = await databases.listDocuments(
      env.VITE_APPWRITE_DATABASE_ID,
      env.VITE_APPWRITE_COLLECTION_ID_NOTES,
    );

    setNotes(response.documents as Note[]);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {notes.map((note) => (
        <div key={note.$id}>{note.body}</div>
      ))}
    </>
  );
}

export default Notes;
