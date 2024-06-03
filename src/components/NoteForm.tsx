import db from '@/appwrite/databases';
import { Note } from '@/appwrite/types';

function NoteForm({
  setNotes,
}: {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement &
      EventTarget & { body: HTMLInputElement; reset: () => void };

    const noteBody = target.body.value;

    if (noteBody === '') return;

    try {
      const payload = { body: noteBody, completed: false };
      const response = await db.notes.create(payload);

      setNotes((notes) => [response, ...notes]);
      target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    (async () => {
      await handleAdd(event);
    })();
  };

  return (
    <form onSubmit={onSubmit} id="todo-form">
      <input
        type="text"
        name="body"
        placeholder="🤔 What's on the agenda?"
        aria-label="Body"
        autoComplete=""
      />
    </form>
  );
}

export default NoteForm;
