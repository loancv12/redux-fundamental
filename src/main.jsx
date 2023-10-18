import React from "react";
import "./index.css";
import App from "./App";
import "./api/server";
import store from "./store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { fetchTodos } from "./features/todos/todosSlice";
store.dispatch(fetchTodos());

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <App tab="home" />
  </Provider>
);
