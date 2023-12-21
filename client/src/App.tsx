import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/conversations"
          element={
            <div>
              Conversations
              <Outlet />
            </div>
          }
        >
          {/* <Route path="/:id" element={<div>Conversations Id</div>} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
