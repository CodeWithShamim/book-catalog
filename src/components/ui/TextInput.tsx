import { ChangeEvent } from "react";

interface IProps {
  id: string;
  sideType: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function TextInput({
  id,
  sideType,
  type = "text",
  placeholder,
  onChange,
  value,
}: IProps) {
  return (
    <div className="flex items-center w-full justify-center">
      {sideType && (
        <span className="text-xl text-white font-semibold pr-2 w-28">
          {sideType}:
        </span>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="input input-bordered input-info w-full max-w-xl"
      />
    </div>
  );
}
