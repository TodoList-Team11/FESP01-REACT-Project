import { useState, useEffect } from "react";
import axios from "axios";

export default function useSelectTodoList() {
  const [data, setData] = useState<TodoListResponse>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await axios("http://localhost:33088/api/todolist");
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error(err);
      }
    };

    fetchTodoList();
  }, []); // 의존성 배열을 빈 배열로 설정하여 마운트될 때 한 번만 실행하도록 함

  return { data, error };
}
