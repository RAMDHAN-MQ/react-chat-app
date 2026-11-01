export default function Input({
  type = "text",
  placeholder,
  className,
  value,
  onChange,
  required = false,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`bg-white w-full h-full rounded-xl outline-none border-2 border-gray-300 focus:border-blue-500 ${className}`}
    />
  );
}
