import React, { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";
import "../styles.css";
import { Draggable } from "react-beautiful-dnd";

export type todoType = {
  id: string;
  name: string;
  isDone: boolean;
};

type todoPropType = {
  todo: todoType;
  dispatch: React.Dispatch<any>;
  index: number;
};

function Todo({ todo, dispatch, index }: { todoPropType }) {
  const { id, name, isDone } = todo;
  const [isEditModeOn, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "RENAME_TODO", payload: { newName: editInput, id: id } });
    setEditMode(false);
  };
  useEffect(() => {
    editInputRef.current?.focus();
  }, [isEditModeOn]);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <form
          className="todo__single"
          onSubmit={handleSubmit}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {isEditModeOn ? (
            <input
              ref={editInputRef}
              className="todo__single--text"
              type="text"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
            />
          ) : isDone ? (
            <s className="todo__single--text">{name}</s>
          ) : (
            <span className="todo__single--text">{name}</span>
          )}
          <div>
            <span
              className="icon"
              onClick={() => {
                setEditMode(true);
                setEditInput(name);
              }}
            >
              <MdEdit />
            </span>
            <span
              className="icon"
              onClick={() => dispatch({ type: "DELETE_TODO", payload: id })}
            >
              <MdDelete />
            </span>
            <span
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE_TODO", payload: id })}
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
}

export default Todo;
