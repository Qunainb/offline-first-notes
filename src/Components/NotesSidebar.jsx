import Button from "./Button";

export default function NotesSidebar() {
  return (
    <div className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 rounded-r-2xl md:w-72">
      <h2
        style={{ fontFamily: `"Pacifico", cursive` }}
        className="mb-8 font-bold uppercase tracking-wide md:text-base"
      >
        Your Notes
      </h2>
      <div>
        <Button>+ Add Note</Button>
      </div>
    </div>
  );
}
