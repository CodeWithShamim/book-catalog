interface IProps {
  message: string;
  fn: () => unknown;
}

export default function Modal({ message, fn }: IProps) {
  return (
    <dialog id="confirmModal" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Warning!</h3>
        <p className="py-4">{message}</p>

        <div className="modal-action">
          <button onClick={() => fn()} className="btn btn-error">
            Delete
          </button>
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}
