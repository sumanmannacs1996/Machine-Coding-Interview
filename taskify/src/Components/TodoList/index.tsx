import React from "react";
import Todo, { todoType } from "../Todo/index.tsx";
import "../styles.css";
import { Droppable } from "react-beautiful-dnd";

type todoListProps = {
  todos: todoType[];
  dispatch: React.Dispatch<any>;
};

function TodoList({ todos, dispatch }: todoListProps) {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <>
            <div
              className="todos"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Acive Tasks</span>
              {todos.map((todo, index) => (
                <Todo todo={todo} dispatch={dispatch} index={index} />
              ))}
            </div>
            {provided.placeholder}
          </>
        )}
      </Droppable>
      <Droppable droppableId="TodoRemove">
        {(provided) => (
          <>
            <div
              className="todos remove"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Compleated Tasks</span>
              {[].map((todo, index) => (
                <Todo todo={todo} dispatch={dispatch} index={index} />
              ))}
            </div>
            {provided.placeholder}
          </>
        )}
      </Droppable>
    </div>
  );
}

export default TodoList;
