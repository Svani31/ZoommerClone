import { Button, Paper, TextField } from "@mui/material";
import { useReducer } from "react";

type InitialProps = {
  todos: TodoProps[];
  inputValue: string;
};

type TodoProps = {
  id: number;
  value: string;
};

const initialValue: InitialProps = { todos: [], inputValue: "" };

enum REDUCER_ACTION_TYPES {
  ADD_VALUE,
  ADD_TODO,
  REMOVE_TODO,
}

type REDUCER_ACTION_PROPS = {
  type: REDUCER_ACTION_TYPES;
  value?: any;
  id?: number;
};

const reducer = (state = initialValue, action: REDUCER_ACTION_PROPS) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_VALUE:
      return { ...state, inputValue: action.value || "" };
    case REDUCER_ACTION_TYPES.ADD_TODO:
      return { ...state, todos: [...state.todos, action.value] };
    case REDUCER_ACTION_TYPES.REMOVE_TODO:
      const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);
      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
};

const TodoAppUsingReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const addTodo = () => {
    const newTodo: TodoProps = {
      id: Date.now(),
      value: state.inputValue,
    };
    dispatch({ type: REDUCER_ACTION_TYPES.ADD_TODO, value: newTodo });
    dispatch({ type: REDUCER_ACTION_TYPES.ADD_VALUE, value: "" });
  };

  const removeTodo = (id: number) => {
    dispatch({ type: REDUCER_ACTION_TYPES.REMOVE_TODO, id });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>
        <strong>Todo App using Reducer</strong>
      </h1>
      <div>
        <Paper>
          <TextField
            value={state.inputValue}
            onChange={(e) =>
              dispatch({ type: REDUCER_ACTION_TYPES.ADD_VALUE, value: e.target.value })
            }
          />
          <h2 style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {state.todos.map((todoEl) => (
              <div key={todoEl.id}>
                <Button variant="contained" color="success">
                  Completed
                </Button>
                {todoEl.value}
                <Button
                  onClick={() => removeTodo(todoEl.id)}
                  variant="contained"
                  color="error"
                >
                  Remove
                </Button>
              </div>
            ))}
          </h2>
        </Paper>
      </div>
      <Button
        onClick={addTodo}
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoAppUsingReducer;
