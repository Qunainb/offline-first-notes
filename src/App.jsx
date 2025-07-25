import { useState } from "react";
import NewNote from "./Components/NewNote";
import NoNoteSelected from "./Components/NoNoteSelected";
import NotesSidebar from "./Components/NotesSidebar";

function App() {
  const [noteState, setNoteState] = useState({
    selectedNoteId: undefined,
    notes: [],
  });

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
        notes: [...prevState.notes, newNotes],
      };
    });
  }

  let content;

  if (noteState.selectedNoteId === null) {
    content = <NewNote onAdd={handleAddNote} />;
  } else if (noteState.selectedNoteId === undefined) {
    content = <NoNoteSelected onStartAddNote={handleStartAddNote} />;
  }

  return (
    <main className="min-h-screen flex gap-8">
      <NotesSidebar onStartAddNote={handleStartAddNote} />
      {content}
    </main>
  );
}

export default App;
