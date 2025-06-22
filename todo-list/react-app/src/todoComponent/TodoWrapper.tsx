import React, { useRef, useState, type FormEvent } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export type ToDoListType = string[];

function TodoWrapper() {
  const [todoData, setTodoData] = useState<ToDoListType>([]);
  const [todoName, setTodoName] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [prevName, setPrevName] = useState<string>("");
  const inptRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      setTodoData(
        todoData.map((name) => (name === prevName ? todoName : name))
      );
      setIsEditing(false);
      setPrevName("");
    } else {
      setTodoData([...todoData, todoName]);
    }
    setTodoName("");
  };

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;

    if (target.tagName === "BUTTON") {
      const currentName = target.name;
      const action = target.value;

      if (action === "delete") {
        setTodoData(todoData.filter((name) => name !== currentName));
      } else {
        setTodoName(currentName);
        setIsEditing(true);
        setPrevName(currentName);
        inptRef?.current?.focus();
      }
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm
        inptRef={inptRef}
        todoName={todoName}
        setTodoName={setTodoName}
        handleSubmit={handleSubmit}
      />
      <TodoList todoData={todoData} handleChange={handleChange} />
    </div>
  );
}

export default TodoWrapper;
