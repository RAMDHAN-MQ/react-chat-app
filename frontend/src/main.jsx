import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import ChatPage from "./pages/Chat/ChatPage.jsx";
import App from "./App.jsx";
import NotFound from "./pages/NotFound.jsx";
import ChatRoom from "./components/ui/Chat/ChatRoom.jsx";
import OptionPage from "./pages/Option/OptionPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="/chat" element={<ChatPage />}>
            <Route path=":conversationID" element={ChatRoom} />
          </Route>

          <Route path="/option" element={<OptionPage />} />
          <Route path="/Profile" element={<ProfilePage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
