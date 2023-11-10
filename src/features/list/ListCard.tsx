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
export const handleCheckboxClick = ({
  _id,
  isDone,
}: {
  _id: number;
  isDone: boolean;
}) => {
  updateTodoInfoDone({ _id, isDone });
};

const ListCard = ({ todo, setNotDoneList, setDoneList }: Props) => {
  return (
    // <Draggable>
    <div id={`${todo._id}`} className="list-card">
      <input
        type="checkbox"
        id={`${todo._id}`}
        defaultChecked={todo.done}
        onClick={(e) => {
          handleCheckboxClick({ _id: todo._id, isDone: todo.done });
          if (todo.done) {
            setNotDoneList((todos) => [...todos, { ...todo, done: false }]);
            setDoneList((todos) => todos.filter((el) => el._id !== todo._id));
          } else if (!todo.done) {
            setDoneList((todos) => [...todos, { ...todo, done: true }]);
            setNotDoneList((todos) =>
              todos.filter((el) => el._id !== todo._id)
            );
          }
        }}
      />
      <Link to={`/info/${todo._id}`}>{todo.title}</Link>
      <span className="create-time">{handleDateForm(todo.createdAt)}</span>
    </div>
    // </Draggable>
  );
};

export default ListCard;
