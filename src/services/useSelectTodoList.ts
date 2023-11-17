import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
interface Props {
  limit: number;
  page?: number;
}
export default function useSelectTodoList({ page = 1, limit = 8 }: Props) {
  const [todoList, setTodoList] = useState<TodoListResponse>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axios("http://localhost:33088/api/todolist", {
          params: { page, limit },
        });
        setTodoList(response.data as TodoListResponse);
      } catch (err) {
        setError(err as AxiosError);
        console.error(err);
      }
    };

    fetchTodoList();
  }, [limit, page]); // 의존성 배열을 빈 배열로 설정하여 마운트될 때 한 번만 실행하도록 함

  return { todoList, error };
}
