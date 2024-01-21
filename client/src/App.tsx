import React, { useContext, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ConversationsPage } from "./pages/conversation/ConversationsPage";
import { ConversationChanelPage } from "./pages/conversation/ConversationChanelPage";
import { ConversationPanel } from "./components/conversation/ConversationPanel";
import { PrivateRoute } from "./components/common/PrivateRoute";
import { SocketContext } from "./utils/context/socket.context";

function App() {
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connection success");
    });
  }, [socket]);
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/conversations"
          element={
            <PrivateRoute>
              <ConversationsPage />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <ConversationPanel />
              </PrivateRoute>
            }
          />
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <ConversationChanelPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
