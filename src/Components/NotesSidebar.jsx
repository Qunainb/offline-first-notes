import Button from "./Button";

export default function NotesSidebar({ onStartAddNote, notes }) {
  return (
    <div className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 rounded-r-2xl md:w-72">
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
        {notes.map((note) => (
          <li key={note.id}>
            <button className="w-full text-left px-2 py-1 rounded-sm my-1 capitalize text-stone-400 hover:text-stone-200 hover:bg-stone-800 ">
              {note.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
