import axios from "axios";

export default async function selectTodoInfo(ID: number) {
  try {
    const response = await axios.get(
      `http://localhost:33088/api/todolist/${ID}`,
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
