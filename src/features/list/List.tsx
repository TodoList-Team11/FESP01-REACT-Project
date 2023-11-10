import "./list.css";
import useSelectTodoList from "services/useSelectTodoList";
import ListCard from "./ListCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const List = () => {
  const [notDoneList, setNotDoneList] = useState<TodoItem[]>([]);
  const [doneList, setDoneList] = useState<TodoItem[]>([]);
  const { todoList } = useSelectTodoList();

  useEffect(() => {
    setNotDoneList(
      todoList?.items.filter((todo: TodoItem) => todo.done === false) || []
    );
    setDoneList(
      todoList?.items.filter((todo: TodoItem) => todo.done === true) || []
    );
  }, [todoList]);

  return (
    <main className="list">
      <select></select>
      <Link to={`/regist`} className="regist-link">
        <button className="regist-btn">등록</button>
      </Link>
      <section id="content-not-done">
        <h2>TODO</h2>
        <p className="todo-count">해야 할 일: {notDoneList?.length}</p>
        {notDoneList?.map((todo) => (
          <ListCard
            key={todo._id}
            todo={todo}
            setNotDoneList={setNotDoneList}
            setDoneList={setDoneList}
          />
        ))}
      </section>
      <section id="content-done">
        <h2>DONE</h2>
        <p className="done-count">완료 한 일: {doneList?.length}</p>
        {doneList?.map((todo) => (
          <ListCard
            todo={todo}
            key={todo._id}
            setNotDoneList={setNotDoneList}
            setDoneList={setDoneList}
          />
        ))}
      </section>
    </main>
  );
};

export default List;
