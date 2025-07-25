import NoNoteSelected from "./Components/NoNoteSelected";
import NotesSidebar from "./Components/NotesSidebar";

function App() {
  return (
    <main className="min-h-screen flex gap-8">
      <NotesSidebar />
      <NoNoteSelected />
    </main>
  );
}

export default App;
