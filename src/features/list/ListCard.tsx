import "./listCard.css";
// import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import updateTodoInfoDone from "services/useUpdateTodoInfoDone";
import handleDateForm from "utils/handleDateForm";

export const handleCheckboxClick = ({
  _id,
  isDone,
}: {
  _id: number;
  isDone: boolean;
}) => {
  updateTodoInfoDone({ _id, isDone });
};

/**
 * @param parentContent todo list 가 append 될 section
 * @param todo todo의 data
 */
const ListCard = ({ todo }: { todo: TodoItem }) => {
  return (
    // <Draggable>
    <div id={`${todo._id}`} className="list-card">
      <input
        type="checkbox"
        id={`${todo._id}`}
        defaultChecked={todo.done}
        onClick={(e) =>
          handleCheckboxClick({ _id: todo._id, isDone: todo.done })
        }
      />
      <Link to={`/info/${todo._id}`}>{todo.title}</Link>
      <span className="create-time">{handleDateForm(todo.createdAt)}</span>
    </div>
    // </Draggable>
  );
};

export default ListCard;
