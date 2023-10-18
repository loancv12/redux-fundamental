import { client } from "../../api/client";
import { createSelector } from "reselect";
import { StatusFilters } from "../filters/filtersSlice";
const initialState = {
  status: "idle",
  entities: [],
};

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "todos/todosLoading": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "todos/todosLoaded": {
      // Replace the existing state entirely by returning the new value
      return {
        ...state,
        status: "idle",
        entities: action.payload,
      };
    }
    case "todos/todoAdded": {
      return {
        ...state,
        status: "idle",
        entities: [...state.entities, action.payload],
      };
    }
    case "todos/todoToggled": {
      return {
        ...state,
        entities: state.entities.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    }
    case "todos/todoColored": {
      return [
        ...state.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            color: action.payload.color,
          };
        }),
      ];
    }

    default:
      return state;
  }
}

// action creator func
export const todosLoading = (todos) => {
  return { type: "todos/todosLoading", payload: "" };
};

export const todosLoaded = (todos) => {
  return { type: "todos/todosLoaded", payload: todos };
};

export const todoAdded = (todo) => {
  return { type: "todos/todoAdded", payload: todo };
};

// Thunk func
export function fetchTodos() {
  return async function fetchTodosThunk(dispatch, getState) {
    dispatch(todosLoading());
    const res = await client.get("/fakeApi/todos");
    console.log("before fetch", getState());
    dispatch(todosLoaded(res.todos));
    console.log("after fetch", getState());
  };
}

// Write a synchronous outer function that receives the `text` parameter:
export function saveNewTodo(text) {
  // And then creates and returns the async thunk function:
  return async function saveNewTodoThunk(dispatch, getState) {
    // ✅ Now we can use the text value and send it to the server
    const initialTodo = { text };
    const response = await client.post("/fakeApi/todos", { todo: initialTodo });
    dispatch(todoAdded(response.todo));
  };
}

export const selectTodos = (state) => state.todos.entities;

export const selectTodoById = (state, todoId) => {
  return selectTodos(state.find((todo) => todo.id === todoId));
};

// memoried selector
export const selectTodoIds = createSelector(
  (state) => state.todos.entities,
  (todos) => todos.map((todo) => todo.id)
);

export const selectFilteredTodos = createSelector(
  // input selectors
  selectTodos,
  (state) => state.filters,

  // output selectoer
  (todos, filters) => {
    const { status, colors } = filters;

    // status all and no color
    const showAllTodos = status === StatusFilters.All;
    if (showAllTodos && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    return todos.filter((todo) => {
      const statusMatches = showAllTodos || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);
