import React, { useReducer, useState } from "react";
import "./App.css";
import InputField from "./Components/InputField/index.tsx";
import { todoType } from "./Components/Todo/index.tsx";
import TodoList from "./Components/TodoList/index.tsx";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const reducer = (state: todoType[], action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TODO":
      return [
        ...state,
        { name: payload, id: Math.random().toString(), isDone: false },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === payload ? { ...todo, isDone: !todo.isDone } : todo
      );
    case "RENAME_TODO":
      return state.map((todo) =>
        todo.id === payload.id
          ? { ...todo, isDone: false, name: payload.newName }
          : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== payload);
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField input={input} setInput={setInput} dispatch={dispatch} />
        <TodoList todos={todos} dispatch={dispatch} />
      </div>
    </DragDropContext>
  );
};

export default App;
