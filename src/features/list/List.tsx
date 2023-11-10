import useSelectTodoList from "services/useSelectTodoList";
import ListCard from "./ListCard";
import { useEffect, useState } from "react";

const List = () => {
  const [notDoneList, setNotDoneList] = useState<TodoItem[]>();
  const [doneList, setDoneList] = useState<TodoItem[]>();
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
    <main>
      <div>
        {notDoneList?.map((todo) => (
          <ListCard todo={todo} />
        ))}
      </div>
      <div>
        {doneList?.map((todo) => (
          <ListCard todo={todo} />
        ))}
      </div>
    </main>
  );
};

export default List;
