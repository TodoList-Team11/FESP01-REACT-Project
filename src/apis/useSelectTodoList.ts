import axios from "axios";
interface Props {
  page: number;
  limit: number;
}

type TodoInfo = {
  _id: number;
  title: string;
  content: string;
  done: boolean | true | false;
  createdAt: string;
  updatedAt: string;
};

type TodoList = {
  ok: number;
  items: TodoInfo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export default async function useSelectTodoList({
  page = 1,
  limit = 1,
}: Props) {
  try {
    const response = await axios(`http://localhost:33088/api/todolist`, {
      params: { page: page, limit: limit },
    });
    return response.data as TodoList;
  } catch (err) {
    console.error(err);
  }
}

export type { TodoInfo, TodoList };
