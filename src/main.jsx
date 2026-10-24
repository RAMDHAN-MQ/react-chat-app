import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ChatLayout from "./components/layout/ChatLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./components/layout/AuthLayout.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/chat" element={<ChatLayout />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
