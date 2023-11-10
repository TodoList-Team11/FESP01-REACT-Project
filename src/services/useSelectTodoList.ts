import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export default function useSelectTodoList() {
  const [todoList, setTodoList] = useState<TodoListResponse>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axios("http://localhost:33088/api/todolist");
        setTodoList(response.data as TodoListResponse);
      } catch (err) {
        setError(err as AxiosError);
        console.error(err);
      }
    };

    fetchTodoList();
  }, []); // 의존성 배열을 빈 배열로 설정하여 마운트될 때 한 번만 실행하도록 함

  return { todoList, error };
}
