import { useRef, useEffect } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewNote({ onAdd, onCancel, note, isEdit }) {
  const modal = useRef();

  const titleRef = useRef();
  const thoughtsRef = useRef();
  const dateRef = useRef();

  // Pre-fill form with note data if editing
  useEffect(() => {
    if (note && isEdit) {
      titleRef.current.value = note.title;
      thoughtsRef.current.value = note.thoughts;
      dateRef.current.value = note.date;
    }
  }, [note, isEdit]);

  function handleSave() {
    const enteredTitle = titleRef.current.value;
    const enteredThoughts = thoughtsRef.current.value;
    const enteredDate = dateRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredThoughts.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      // Show error modal
      modal.current.open();
      return;
    }

    const noteData = {
      title: enteredTitle,
      thoughts: enteredThoughts,
      date: enteredDate,
    };

    // If editing, include the existing id
    if (isEdit && note) {
      noteData.id = note.id;
    }

    onAdd(noteData);
  }

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">
          Hold on! Note Incomplete 📝
        </h2>
        <p className="mb-4 text-stone-600 text-sm">
          Every note deserves a Title, some Thoughts, and a Date to remember it
          by.
        </p>
        <p className="mb-4 text-stone-600 text-sm">
          Let's complete all fields before saving!
        </p>
      </Modal>

      <div className="w-[35rem] mt-16">
        <menu className="flex items-center gap-4 justify-end my-4">
          <button
            className="text-stone-700 cursor-pointer hover:text-stone-900 "
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-900 cursor-pointer"
            onClick={handleSave}
          >
            {isEdit ? 'Update' : 'Save'}
          </button>
        </menu>
        <div>
          <Input ref={titleRef} label="title" />
          <Input ref={thoughtsRef} label="Thoughts" textarea />
          <Input ref={dateRef} type="date" label="Date" />
        </div>
      </div>
    </>
  );
}
