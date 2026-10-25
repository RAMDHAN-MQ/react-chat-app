import { useEffect } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import axios from "axios";

export default function LoginPage() {
  useEffect(() => {
    axios
      .get("http://localhost:5001/")
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  },[]);
  return <CardAuth type={"login"} />;
}
