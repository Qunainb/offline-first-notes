export default function Input({ label, textarea, ...props }) {
  const classes =
    "w-full p-1 border-b-2 border-stone-300 bg-stone-200 text-stone-600 rounded-sm focus:outline-none focus:border-stone-600";
  return (
    <div className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500 font-mono tracking-wide">
        {label}
      </label>
      {textarea ? (
        <textarea {...props} className={classes} textarea />
      ) : (
        <input {...props} className={classes} />
      )}
    </div>
  );
}
