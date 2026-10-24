export default function InputAuth({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-2 border-2 border-gray-200 rounded-xl mb-2 focus:outline-blue-500"
    />
  );
}
