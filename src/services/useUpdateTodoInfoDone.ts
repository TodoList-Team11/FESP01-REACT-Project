import axios from "axios";

interface Props {
  _id: number;
  isDone: boolean;
}

export default async function updateTodoInfoDone({ _id, isDone }: Props) {
  try {
    await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
      done: !isDone,
    });
  } catch (err) {
    console.log(err);
  }
}
