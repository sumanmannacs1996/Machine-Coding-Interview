import React from "react";
import SingleTodo from "./SingleTodo";
import type { ToDoListType } from "./TodoWrapper";

export type TodoListProps = {
  todoData: ToDoListType;
  handleChange: (e: any) => void;
};

function TodoList({ todoData, handleChange }: TodoListProps) {
  return (
    <div onClick={handleChange}>
      {todoData.map((name) => (
        <SingleTodo key={name} name={name} />
      ))}
    </div>
  );
}

export default TodoList;
