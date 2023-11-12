import axios from "axios";

interface Props {
  _id: string;
  title: string;
  content: string;
  done: boolean;
}
export default async function useUpdateTodoInfo({ _id, title, content, done }:Props) {
  
  try {
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      title,
      content,
      done,
    });
  } catch (err) {
    console.log(err);
  }
}
