export default function Button({ type, variant, text, width }) {
  let warna;
  switch (variant) {
    case "primary":
      warna = "bg-blue-500 text-white";
      break;
    default:
      warna = "";
      break;
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
