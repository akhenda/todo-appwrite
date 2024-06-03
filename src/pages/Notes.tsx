import { useEffect, useState } from 'react';
import { Query } from 'appwrite';

import db from '@/appwrite/databases';
import { Note as TNote } from '@/appwrite/types';
import Note from '@/components/Note';
import NoteForm from '@/components/NoteForm';

function Notes() {
  const [notes, setNotes] = useState<TNote[]>([]);

  const init = async () => {
    const response = await db.notes.list([Query.orderDesc('$createdAt')]);

    setNotes(response.documents as TNote[]);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div className="header">
        <h1>
          <span role="img" aria-label="memo">
            ✍🏾
          </span>{' '}
          My Todo List
        </h1>
      </div>
      <NoteForm setNotes={setNotes} />
      {notes.map((note) => (
        <Note key={note.$id} note={note} setNotes={setNotes} />
      ))}
    </>
  );
}

export default Notes;
