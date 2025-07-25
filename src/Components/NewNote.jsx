import Input from "./Input";

export default function NewNote() {
  return (
    <div className="w-[35rem] mt-16">
      <menu className="flex items-center gap-4 justify-end my-4">
        <button className="text-stone-700 cursor-pointer hover:text-stone-900 ">
          Cancel
        </button>

        <button className="px-6 py-2 bg-stone-800 text-stone-50 rounded-md hover:bg-stone-900 cursor-pointer">
          Save
        </button>
      </menu>
      <div>
        <Input label="title" />
        <Input label="Thoughts" textarea />
        <Input type="date" label="Date" />
      </div>
    </div>
  );
}
