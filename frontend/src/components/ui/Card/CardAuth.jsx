import { Link } from "react-router-dom";
import Button from "../Button/Button";
import InputAuth from "../Input/InputAuth";

export default function CardAuth({ type }) {
  let card;
  if (type === "login") {
    card = (
      <>
        <form className="mb-4">
          <InputAuth type={"email"} placeholder={"Email address"} />
          <InputAuth type={"password"} placeholder={"Password"} />
        </form>
      </>
    );
  } else {
    card = (
      <>
        <form className="mb-4">
          <InputAuth type={"text"} placeholder={"Nama"} />
          <InputAuth type={"email"} placeholder={"Email"} />
          <InputAuth type={"password"} placeholder={"Password"} />
        </form>
      </>
    );
  }
  return (
    <div className="w-100 bg-white p-5 rounded-xl shadow-lg text-center">
      <h1 className="font-semibold mb-4 text-2xl">
        {type === "login" ? "Login" : "Register"}
      </h1>
      <div className="flex mb-4">
        <Link
          className={`px-3 py-2 flex-1 rounded-l-xl shadow-sm cursor-pointer hover:opacity-90 ${type === "login" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
          to={"/"}
        >
          Login
        </Link>
        <Link
          className={`px-3 py-2 flex-1 rounded-r-xl shadow-sm cursor-pointer hover:opacity-90 ${type !== "login" ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
          to={"/register"}
        >
          Register
        </Link>
      </div>
      {card}
      <Button
        text={type === "login" ? "Login" : "Register"}
        type={"button"}
        variant={"primary"}
        width={"full"}
      />
    </div>
  );
}
