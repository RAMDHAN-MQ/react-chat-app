import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputAuth({ type, placeholder, value, onChange }) {
  const [isShow, setIsShow] = useState(false);

  let tipe;
  if (type === "password") {
    tipe = isShow ? "text" : "password";
  } else {
    tipe = type;
  }

  return (
    <div className="relative w-full">
      <input
        type={tipe}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border-2 border-gray-200 rounded-xl mb-2 focus:outline-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      {type === "password" && (
        <button
          className="absolute right-3 top-6 -translate-y-2.5 text-gray-500 hover:text-gray-800"
          type="button"
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      )}
    </div>
  );
}
