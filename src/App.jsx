import { useEffect, useState } from "react";
import NewNote from "./Components/NewNote";
import NoNoteSelected from "./Components/NoNoteSelected";
import NotesSidebar from "./Components/NotesSidebar";
import SelectedNotes from "./Components/SelectedNotes";
import {
  getAllNotes,
  addOrUpdateNote,
  deleteNote as deleteNoteFromDB,
} from "./utils/notesDB";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [noteState, setNoteState] = useState({
    selectedNoteId: undefined,
    notes: [],
  });

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Load notes from IndexedDB when app starts
  useEffect(() => {
    async function fetchNotes() {
      try {
        const notes = await getAllNotes();
        setNoteState((prev) => ({
          ...prev,
          notes: notes || [],
        }));
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    }
    fetchNotes();
  }, []);

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
  async function handleAddNote(notesData) {
    const newNote = {
      ...notesData,
      id: Math.random(),
    };

    try {
      await addOrUpdateNote(newNote); // Save to IndexedDB
      setNoteState((prevState) => {
        return {
          ...prevState,
          selectedNoteId: undefined,
          notes: [...prevState.notes, newNote],
        };
      });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  function handleCancel() {
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: undefined,
      };
    });
    setIsEditing(false);
  }

  // Selecting project in sidebar
  function handleSelectNote(id) {
    setNoteState((prevState) => {
      return {
        ...prevState,
        selectedNoteId: id,
      };
    });
    setIsEditing(false);
  }

  // Start editing a note
  function handleStartEditNote() {
    setIsEditing(true);
  }

  // Edit a note
  async function handleEditNote(updatedNote) {
    try {
      await addOrUpdateNote(updatedNote); // Save to IndexedDB
      setNoteState((prevState) => {
        const updatedNotes = prevState.notes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        );
        return {
          ...prevState,
          notes: updatedNotes,
          selectedNoteId: updatedNote.id,
        };
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  // Deleting a note
  async function handleDeleteNote() {
    try {
      await deleteNoteFromDB(noteState.selectedNoteId); // Remove from IndexedDB
      setNoteState((prevState) => {
        return {
          ...prevState,
          selectedNoteId: undefined,
          notes: prevState.notes.filter(
            (note) => note.id !== prevState.selectedNoteId
          ),
        };
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  const selectedNote = noteState.notes.find(
    (note) => note.id === noteState.selectedNoteId
  );

  const filteredNotes = noteState.notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let content;
  if (noteState.selectedNoteId === null) {
    content = <NewNote onAdd={handleAddNote} onCancel={handleCancel} />;
  } else if (noteState.selectedNoteId === undefined) {
    content = <NoNoteSelected onStartAddNote={handleStartAddNote} />;
  } else if (isEditing && selectedNote) {
    // Show edit form (reuse NewNote, but pass note data and an onEdit handler)
    content = (
      <NewNote
        note={selectedNote}
        onAdd={handleEditNote}
        onCancel={() => setIsEditing(false)}
        isEdit
      />
    );
  } else if (selectedNote) {
    content = (
      <SelectedNotes
        note={selectedNote}
        onDelete={handleDeleteNote}
        onEdit={handleStartEditNote}
      />
    );
  }

  return (
    <>
      {/* Online/Offline Status Indicator */}
      <div
        className={`fixed top-4 right-4 px-4 py-2 rounded-md text-sm font-medium z-50 ${
          isOnline ? "text-green-400" : "text-red-500"
        }`}
      >
        {isOnline ? "🟢 Online" : "🔴 Offline"}
      </div>

      <main className="min-h-screen flex gap-8">
        <NotesSidebar
          onStartAddNote={handleStartAddNote}
          notes={filteredNotes}
          onSelectAddNote={handleSelectNote}
          selectedNoteId={noteState.selectedNoteId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        {content}
      </main>
    </>
  );
}

export default App;
