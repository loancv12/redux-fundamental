import React from "react";
import { useSelector } from "react-redux";
import { StatusFilters } from "../features/filters/filtersSlice";

const StatusFilter = ({ onChangeStatus }) => {
  const filterStatus = useSelector((state) => {
    return state.filters.status;
  });
  return (
    <div className="filter--status">
      {Object.values(StatusFilters).map((filter, i) => {
        return (
          <div key={i}>
            <input
              onChange={(e) => onChangeStatus(e.target.value)}
              value={filter}
              type="checkbox"
              name="status"
              id={`status--${filter}`}
              checked={filterStatus === filter}
            />
            <label htmlFor={`status--${filter}`}>{filter}</label>
          </div>
        );
      })}
    </div>
  );
};

export default StatusFilter;
