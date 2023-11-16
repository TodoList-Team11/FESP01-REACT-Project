import "./list.css";
import useSelectTodoList from "services/useSelectTodoList";
import ListCard from "./ListCard";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import updateTodoInfoDone from "services/useUpdateTodoInfoDone";
import ListSelectBox from "./ListSelectBox";

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

  //Drag & Drop
  type DropTodo = {
    e: React.DragEvent;
    isDone: boolean;
  };
  /**
   * 드롭 이벤트 발생 시 done 상태변경 값을 서버로 전송
   * @param e dropdown event
   * @param isDone done true/false
   */
  const onDropTodo = async ({ e, isDone }: DropTodo) => {
    e.preventDefault();
    if (e !== null) {
      const selectedTodo = e.dataTransfer!.getData("todo");
      const todo = JSON.parse(selectedTodo);
      await updateTodoInfoDone({ _id: parseInt(todo._id), isDone });
      console.log("todo>>>", todo);
      if (todo.done) {
        setNotDoneList((todos) => [...todos, { ...todo, done: false }]);
        setDoneList((todos) => todos.filter((el) => el._id !== todo._id));
      } else if (!todo.done) {
        setDoneList((todos) => [...todos, { ...todo, done: true }]);
        setNotDoneList((todos) => todos.filter((el) => el._id !== todo._id));
      }
    }
  };

  return (
    <main className="list">
      <ListSelectBox
        setNotDoneList={setNotDoneList}
        setDoneList={setDoneList}
      />
      <Link to={`/regist`} className="regist-link">
        <button className="regist-btn">등록</button>
      </Link>
      <section
        id="content-not-done"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e: React.DragEvent) => onDropTodo({ e: e, isDone: false })}
      >
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
      <section
        id="content-done"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e: React.DragEvent) => onDropTodo({ e: e, isDone: true })}
      >
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
