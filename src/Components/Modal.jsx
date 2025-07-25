import { useImperativeHandle, useRef } from "react";
import Button from "./Button";

export default function Modal({ children, ref }) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });
  return (
    <dialog
      ref={dialogRef}
      className="backdrop:bg-stone-800/90 p-4 rounded-md shadow-md m-auto"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>Okay</Button>
      </form>
    </dialog>
  );
}
