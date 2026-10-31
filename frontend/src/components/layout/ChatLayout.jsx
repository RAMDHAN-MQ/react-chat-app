import { Outlet, useOutletContext } from "react-router-dom";

export default function ChatLayout() {
  const { user } = useOutletContext();
  console.log(user);
  return (
    <>
      <Outlet />
    </>
  );
}
