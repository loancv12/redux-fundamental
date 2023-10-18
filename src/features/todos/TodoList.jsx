import React from "react";
import TodoListItem from "./TodoListItem";
import { useSelector, shallowEqual } from "react-redux";
import { selectFilteredTodoIds, selectTodoIds } from "./todosSlice";

const TodoList = () => {
  const todoIds = useSelector(selectFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader">Loading</div>
      </div>
    );
  }
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} todoId={todoId} />;
  });
  if (!renderedListItems?.length) {
    return <p>No todo</p>;
  }

  return (
    <>
      <h2>To do list</h2>
      <ul className="todo-list">{renderedListItems}</ul>
    </>
  );
};

export default TodoList;
