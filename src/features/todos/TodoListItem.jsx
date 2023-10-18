import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { availableColors, capitalize } from "../filters/colors";

const TodoListItem = ({ todoId }) => {
  const dispatch = useDispatch();

  const selectTodoById = (state, todoId) =>
    state.todos.entities.find((todo) => todo.id === todoId);

  const todo = useSelector((state) => selectTodoById(state, todoId));

  const onTodoColored = (e) => {
    const color = e.target.value;
    console.log(color);
    dispatch({
      type: "todos/todoColored",
      payload: {
        id: todo.id,
        color,
      },
    });
  };
  return (
    <li className="list-item">
      <p>Title: {todo.text}</p>
      <span>Status: {todo.completed ? "complete" : "open"}</span>
      <input
        id="status"
        type="checkbox"
        name="completed"
        checked={todo.complete}
        onChange={(e) =>
          dispatch({ type: "todos/todoToggled", payload: todo.id })
        }
      />
      <br />

      <select onChange={onTodoColored} name="colors" id="colors">
        <option value="">Choose a color tag:</option>
        {availableColors.map((color, i) => {
          return (
            <option key={i} value={color}>
              {capitalize(color)}
            </option>
          );
        })}
      </select>
    </li>
  );
};

export default TodoListItem;
// export default memo(TodoListItem);
