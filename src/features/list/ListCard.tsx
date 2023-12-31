import React from "react";
import "./listCard.css";
// import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import updateTodoInfoDone from "services/useUpdateTodoInfoDone";
import handleDateForm from "utils/handleDateForm";

interface Props {
  todo: TodoItem;
  setNotDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

type HandleCheckboxClick = {
  _id: number;
  isDone: boolean;
};
export const handleCheckboxClick = ({ _id, isDone }: HandleCheckboxClick) => {
  updateTodoInfoDone({ _id, isDone });
};

type ChangeDoneList = {
  todo: TodoItem;
  setNotDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
};
export const changeDoneList = ({
  todo,
  setNotDoneList,
  setDoneList,
}: ChangeDoneList) => {
  if (todo.done) {
    setNotDoneList((todos) => [...todos, { ...todo, done: false }]);
    setDoneList((todos) => todos.filter((el) => el._id !== todo._id));
  } else if (!todo.done) {
    setDoneList((todos) => [...todos, { ...todo, done: true }]);
    setNotDoneList((todos) => todos.filter((el) => el._id !== todo._id));
  }
};

const ListCard = ({ todo, setNotDoneList, setDoneList }: Props) => {
  const handleDragStart = ({
    e,
    todo,
  }: {
    e: React.DragEvent;
    todo: TodoItem;
  }) => {
    e.dataTransfer.setData("todo", JSON.stringify(todo));
  };
  return (
    // <Draggable>
    <div
      id={`${todo._id}`}
      className="list-card"
      draggable="true"
      onDragStart={(e: React.DragEvent) => handleDragStart({ e, todo })}
    >
      <input
        type="checkbox"
        id={`${todo._id}`}
        defaultChecked={todo.done}
        onClick={(e) => {
          handleCheckboxClick({ _id: todo._id, isDone: !todo.done });
          changeDoneList({ todo, setNotDoneList, setDoneList });
        }}
      />
      <Link to={`/info/${todo._id}`} id={`${todo._id}`}>
        {todo.title}
      </Link>
      <span className="create-time">{handleDateForm(todo.createdAt)}</span>
    </div>
    // </Draggable>
  );
};

export default ListCard;
