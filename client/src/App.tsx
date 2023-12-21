import React from "react";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
