import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./info.css";

interface TodoItem {
  _id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

const InfoSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => (
  <section>
    <h2>{title}</h2>
    <p id="info-todo-content">{content}</p>
  </section>
);

const TodoInfo = () => {
  const { todoId } = useParams();
  const [item, setItem] = useState<TodoItem | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(
        `http://localhost:33088/api/todoList/${todoId}`
      );
      setItem(data.item);
    };
    fetchItem();
  }, [todoId]);

  const handleCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await axios.put(`http://localhost:33088/api/todoList/${todoId}`, {
      ...item,
      done: e.target.checked,
    });
    setItem((prev) => ({ ...prev!, done: e.target.checked }));
  };

  const handleDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      await axios.delete(`http://localhost:33088/api/todoList/${todoId}`);
      navigate("/");
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div id="page" className="info">
      <header></header>
      <main>
        <section id="info-contents-section">
          <h2 id="info-todo-title">할 일 : {item.title}</h2>
          <InfoSection title="상세 내용" content={item.content} />
          <p id="info-create-time">
            생성일 : {new Date(item.createdAt).toLocaleDateString()}
          </p>
          <p id="info-update-time">
            수정일 : {new Date(item.updatedAt).toLocaleDateString()}
          </p>
          <input
            id="checkbox"
            type="checkbox"
            checked={item.done}
            onChange={handleCheckbox}
          />
        </section>
        <section id="info-buttons-section">
          <button
            id="info-btn-modify"
            onClick={() => navigate(`/update/${item._id}`)}
          >
            수정
          </button>
          <button id="info-btn-delete" onClick={handleDelete}>
            삭제
          </button>
          <button id="info-btn-home" onClick={() => navigate("/")}>
            홈으로 이동
          </button>
        </section>
      </main>
    </div>
  );
};

export default TodoInfo;
