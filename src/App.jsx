import NewNote from "./Components/NewNote";
import NoNoteSelected from "./Components/NoNoteSelected";
import NotesSidebar from "./Components/NotesSidebar";

function App() {
  return (
    <main className="min-h-screen flex gap-8">
      <NotesSidebar />
      {/* <NoNoteSelected /> */}
      <NewNote />
    </main>
  );
}

export default App;
