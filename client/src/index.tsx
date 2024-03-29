import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { ApiProvider } from "@reduxjs/toolkit/query/react";
// In your application's entrypoint

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { chatAppApi } from "./api/chat.api";
import { SocketContext, socket } from "./utils/context/socket.context";
import { Provider } from "react-redux";
import { store } from "./package/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={chatAppApi}> */}
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext.Provider>
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
