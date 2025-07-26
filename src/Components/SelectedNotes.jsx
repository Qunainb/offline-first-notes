export default function SelectedNotes({ note, onDelete, onEdit }) {
  const formattedDate = new Date(note.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 border-b-2 border-stone-300">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-3xl text-stone-600 mb-2 capitalize">
            {note.title}
          </h1>
          <div>
            <button
              className="mr-4 text-stone-600 hover:text-stone-950 cursor-pointer"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="text-stone-600 hover:text-stone-950 cursor-pointer"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{note.thoughts}</p>
      </header>
    </div>
  );
}
