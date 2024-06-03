import { useState } from 'react';

import db from '@/appwrite/databases';
import { Note as TNote } from '@/appwrite/types';
import DeleteIcon from '@/assets/DeleteIcon';

function NoteBody({ note }: { note: TNote }) {
  if (note.completed) return <del>{note.body}</del>;

  return <>{note.body}</>;
}

function Note({
  note,
  setNotes,
}: {
  note: TNote;
  setNotes: React.Dispatch<React.SetStateAction<TNote[]>>;
}) {
  const [data, setData] = useState(note);

  const handleUpdate = () => {
    (async () => {
      const completed = !note.completed;

      await db.notes.update(note.$id, { completed });

      setData({ ...data, completed });
    })();
  };

  const handleDelete = () => {
    (async () => {
      await db.notes.delete(note.$id);

      setNotes((notes) => notes.filter((_note) => _note.$id !== note.$id));
    })();
  };

  return (
    <div className="note-wrapper">
      <span
        className="note-body"
        onClick={handleUpdate}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') handleUpdate();
        }}
      >
        <NoteBody note={data} />
      </span>
      <div
        className="delete"
        onClick={handleDelete}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') handleUpdate();
        }}
      >
        <DeleteIcon />
      </div>
    </div>
  );
}

export default Note;
