export default function Button({ type, variant, text, width, to }) {
  let warna;
  switch (variant) {
    case "primary":
      warna = "bg-blue-500 text-white";
      break;
    default:
      warna = "";
      break;
  }

  if (to) {
    return (
      <a
        type={type}
        className={`${warna} ${width === "full" && "w-full"} px-3 py-2 rounded-xl cursor-pointer hover:opacity-90 text-center`}
        href={to}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`${warna} ${width === "full" && "w-full"} px-3 py-2 rounded-xl cursor-pointer hover:opacity-90`}
    >
      {text}
    </button>
  );
}
