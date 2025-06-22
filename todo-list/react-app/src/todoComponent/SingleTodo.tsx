import React from "react";

function SingleTodo({ name }: { name: string }) {
  return (
    <div key={name}>
      <button name={name} value="edit">
        ✏️
      </button>
      <span>{name}</span>
      <button name={name} value="delete">
        ❌
      </button>
    </div>
  );
}

export default SingleTodo;
