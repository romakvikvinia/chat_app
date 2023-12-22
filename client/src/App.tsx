import React from "react";

import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ConversationsPage } from "./pages/conversation/ConversationsPage";
import { ConversationChanelPage } from "./pages/conversation/ConversationChanelPage";
import { ConversationPanel } from "./components/conversation/ConversationPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/conversations" element={<ConversationsPage />}>
          <Route index element={<ConversationPanel />} />
          <Route path=":id" element={<ConversationChanelPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
