import Button from "./Button";

export default function NotesSidebar({
  onStartAddNote,
  notes,
  onSelectAddNote,
  selectedNoteId,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div className="w-1/3 px-8 py-11 bg-stone-900 text-stone-50 rounded-r-2xl md:w-72">
      <input
        type="text"
        className="my-8 h-12 px-4 py-2 text-sm capitalize bg-stone-800 text-stone-100 rounded-md outline-none"
        placeholder="Find a note..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <h2
        style={{ fontFamily: `"Pacifico", cursive` }}
        className="mb-8 font-bold uppercase tracking-wide md:text-base"
      >
        Your Notes
      </h2>
      <div>
        <Button onClick={onStartAddNote}>+ Add Note</Button>
      </div>
      <ul className="mt-8">
        {notes.map((note) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 capitalize cursor-pointer hover:text-stone-200 hover:bg-stone-800";

          if (note.id === selectedNoteId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }
          return (
            <li key={note.id}>
              <button
                className={cssClasses}
                onClick={() => onSelectAddNote(note.id)}
              >
                {note.title}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
