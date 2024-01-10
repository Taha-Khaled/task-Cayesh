import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { awardsApis } from "./services/apis/awardsApisSlice";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <ApiProvider api={awardsApis}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApiProvider>
);
