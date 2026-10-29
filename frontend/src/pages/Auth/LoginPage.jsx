import { useState } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import InputAuth from "../../components/ui/Input/InputAuth";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  async function handelLogin(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email: value.email,
          password: value.password,
        },
      );

      console.log(response);
    } catch (error) {
      const pesan = error.response.data.message;
      toast.error(pesan);
    }
  }

  return (
    <CardAuth type={"Login"} onSubmit={handelLogin}>
      <InputAuth
        type={"email"}
        placeholder={"Masukkan email anda..."}
        value={value.email}
        required={true}
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
        required={true}
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
