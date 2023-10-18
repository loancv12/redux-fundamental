import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "../todos/todosSlice";

const Header = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    // Create and dispatch the thunk function itself
    setStatus("loading");
    // Wait for the promise returned by saveNewTodo
    await dispatch(saveNewTodo(trimmedText));

    setText("");
    setStatus("idle");
  };

  let isLoading = status === "loading";
  let placeholder = isLoading ? "" : "What needs to be done?";
  let loader = isLoading ? <div className="loader">Loading</div> : null;
  return (
    <header className="header">
      <form action="" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder={placeholder}
          value={text}
          required
          disabled={isLoading}
          onChange={handleChange}
        />
        {loader}
        <button type="submit">Summit</button>
      </form>
    </header>
  );
};

export default Header;
