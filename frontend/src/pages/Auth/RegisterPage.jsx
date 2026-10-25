import { useState } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import InputAuth from "../../components/ui/Input/InputAuth";
import axios from "axios";

export default function RegisterPage() {
  const [value, setValue] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  async function handleDataBaru(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          nama: value.nama,
          email: value.email,
          password: value.password,
        },
      );

      console.log(response);
      setErrorMessage("");
    } catch (error) {
      const pesan = error.response.data.message;
      console.error(`Terjadi Error : ${pesan}`);
      setErrorMessage(pesan);
    }
  }
  return (
    <CardAuth type={"Register"} onSubmit={handleDataBaru}>
      {errorMessage.length >= 0 && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
      <InputAuth
        type={"text"}
        placeholder={"Masukkan nama anda..."}
        value={value.nama}
        onChange={(e) =>
          setValue({
            ...value,
            nama: e.target.value,
          })
        }
      />
      <InputAuth
        type={"email"}
        placeholder={"Masukkan email anda..."}
        value={value.email}
        onChange={(e) =>
          setValue({
            ...value,
            email: e.target.value,
          })
        }
      />
      <InputAuth
        type={"password"}
        placeholder={"Masukkan password anda..."}
        value={value.password}
        onChange={(e) =>
          setValue({
            ...value,
            password: e.target.value,
          })
        }
      />
    </CardAuth>
  );
}
