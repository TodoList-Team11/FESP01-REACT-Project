import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import handleDateForm from "utils/handleDateForm";

/**
 * @param parentContent todo list 가 append 될 section
 * @param todo todo의 data
 */
const ListCard = ({ todo }: { todo: TodoItem }) => {
  return (
    <Draggable>
      <div id={`${todo._id}`}>
        <input type="checkbox" id={`${todo._id}`} checked={todo.done} />
        <Link to={`/info/${todo._id}`}>{todo.title}</Link>
        <span>`(${handleDateForm(todo.createdAt)})`</span>
      </div>
    </Draggable>
  );
};

export default ListCard;
