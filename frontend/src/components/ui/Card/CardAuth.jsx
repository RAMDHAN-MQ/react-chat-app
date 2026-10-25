import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function CardAuth({ type, children, onSubmit }) {
  return (
    <div className="w-100 bg-white p-5 rounded-xl shadow-lg text-center">
      <h1 className="font-semibold mb-4 text-2xl">{type}</h1>
      <div className="flex mb-4">
        <Link
          className={`px-3 py-2 flex-1 rounded-l-xl shadow-sm cursor-pointer hover:opacity-90 ${type === "Login" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
          to={"/"}
        >
          Login
        </Link>
        <Link
          className={`px-3 py-2 flex-1 rounded-r-xl shadow-sm cursor-pointer hover:opacity-90 ${type !== "Login" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
          to={"/register"}
        >
          Register
        </Link>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        {children}
        <Button
          text={type}
          type={"submit"}
          variant={"primary"}
          width={"full"}
        />
      </form>
    </div>
  );
}
