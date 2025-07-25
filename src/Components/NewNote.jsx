import { useRef } from "react";
import Input from "./Input";

export default function NewNote({ onAdd }) {
  const titleRef = useRef();
  const thoughtsRef = useRef();
  const dateRef = useRef();

  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredThoughts = thoughtsRef.current.value;
    const enteredDate = dateRef.current.title;

    onAdd({
      title: enteredTitle,
      thoughts: enteredThoughts,
      date: enteredDate,
    });
  }

  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center gap-4 justify-end my-4">
        <button className="text-stone-700 cursor-pointer hover:text-stone-900 ">
          Cancel
        </button>

        <button
          className="px-6 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-900 cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
      </menu>
      <div>
        <Input ref={titleRef} label="title" />
        <Input ref={thoughtsRef} label="Thoughts" textarea />
        <Input ref={dateRef} type="date" label="Date" />
      </div>
    </div>
  );
}
