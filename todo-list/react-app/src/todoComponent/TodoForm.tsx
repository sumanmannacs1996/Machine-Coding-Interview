import React, { type FormEvent } from "react";

export type ToDoFormPropsType = {
  todoName: string;
  setTodoName: (name: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inptRef: React.Ref<HTMLInputElement>;
};

function TodoForm({
  todoName,
  setTodoName,
  handleSubmit,
  inptRef,
}: ToDoFormPropsType) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        ref={inptRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TodoForm;
