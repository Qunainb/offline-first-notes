import { useEffect, useState } from "react";
import NewNote from "./Components/NewNote";
import NoNoteSelected from "./Components/NoNoteSelected";
import NotesSidebar from "./Components/NotesSidebar";
import SelectedNotes from "./Components/SelectedNotes";

function App() {
  const [noteState, setNoteState] = useState(() => {
    const storedNotes = localStorage.getItem("notes");
    return {
      selectedNoteId: undefined,
      notes: storedNotes ? JSON.parse(storedNotes) : [],
    };
  });

  // Updating localStorage whenever notes changed
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteState.notes));
  }, [noteState.notes]);

  // Start Adding note when button is clicked
  function handleStartAddNote() {
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: null,
      };
    });
  }

  // Adding notes
  function handleAddNote(notesData) {
    const newNotes = {
      ...notesData,
      id: Math.random(),
    };
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: undefined,
        notes: [...prevState.notes, newNotes],
      };
    });
  }

  function handleCancel() {
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: undefined,
      };
    });
  }

  // Selecting project in sidebar
  function handleSelectNote(id) {
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: id,
      };
    });
  }

  // Deleting a note
  function handleDeleteNote() {
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: undefined,
        notes: prevState.notes.filter(
          (note) => note.id !== prevState.selectedNoteId
        ),
      };
    });
  }

  const selectedNote = noteState.notes.find(
    (note) => note.id === noteState.selectedNoteId
  );

  let content = (
    <SelectedNotes note={selectedNote} onDelete={handleDeleteNote} />
  );

  if (noteState.selectedNoteId === null) {
    content = <NewNote onAdd={handleAddNote} onCancel={handleCancel} />;
  } else if (noteState.selectedNoteId === undefined) {
    content = <NoNoteSelected onStartAddNote={handleStartAddNote} />;
  }

  return (
    <main className="min-h-screen flex gap-8">
      <NotesSidebar
        onStartAddNote={handleStartAddNote}
        notes={noteState.notes}
        onSelectAddNote={handleSelectNote}
      />
      {content}
    </main>
  );
}

export default App;
