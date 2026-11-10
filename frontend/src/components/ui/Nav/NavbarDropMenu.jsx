export default function NavbarDropMenu({
  variant = "primary",
  children,
  onClick,
}) {
  let warna;
  switch (variant) {
    case "primary":
      warna = "hover:bg-gray-300";
      break;
    case "danger":
      warna = "bg-red-500 text-white hover:bg-red-700";
      break;
  }
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 ${warna} cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
