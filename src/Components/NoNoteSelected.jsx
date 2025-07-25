import imageLogo from "../assets/logo.png";
import Button from "./Button";

export default function NoNoteSelected({ onStartAddNote }) {
  return (
    <div className="w-2/3 text-center mt-24">
      <img src={imageLogo} alt="image-logo" className="h-16 w-16 mx-auto" />
      <h2 className="text-xl font-bold my-4 text-stone-500 font-serif">
        No Note Selected
      </h2>
      <p
        style={{ fontFamily: `"Pacifico", cursive` }}
        className="text-stone-400 mb-4 tetx-base"
      >
        Select a note or get started with new one.
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddNote}>Create New Note</Button>
      </p>
    </div>
  );
}
