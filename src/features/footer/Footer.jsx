import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusFilter from "../../components/StatusFilter";
import ColorsFilter from "../../components/ColorsFilter";
import { colorFilterChanged } from "../filters/filtersSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const todosRemaining = useSelector((state) => {
    const unCompletedTodos = state.todos.entities.map(
      (todo) => !todo.completed
    );
    return unCompletedTodos.length;
  });

  const onChangeStatus = (status) => {
    dispatch({ type: "filters/statusFilterChanged", payload: status });
  };
  const onChangeColor = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType));
  };

  return (
    <footer>
      <div className="actions">
        <h2>Actions</h2>
        <button className="button">Mark All Completed</button>
        <button className="button">Clear Completed</button>
      </div>
      <div className="status">
        <h2>Remain Items</h2>

        <span>Have {todosRemaining} items</span>
      </div>
      <div className="filter">
        <h2>Filter</h2>

        <StatusFilter onChangeStatus={onChangeStatus} />

        <ColorsFilter onChangeColor={onChangeColor} />
      </div>
    </footer>
  );
};

export default Footer;
