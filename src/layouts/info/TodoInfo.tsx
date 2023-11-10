import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import './TodoInfo.css';

interface TodoItem {
  _id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

const TodoInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<TodoItem | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`/api/todolist/${id}`);
      setItem(data.item);
    };
    fetchItem();
  }, [id]);

  const handleCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await axios.put(`/api/todolist/${id}`, { ...item, done: e.target.checked });
    setItem(prev => ({ ...prev!, done: e.target.checked }));
  };

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await axios.delete(`/api/todolist/${id}`);
      history.push('/');
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div id="page" className="info">
      <header>TODO App 상세 조회</header>
      <main>
        <section id="info-contents-section">
          <h2 id="info-todo-title">할 일 : {item.title}</h2>
          <h3>상세 내용</h3>
          <p id="info-todo-content">{item.content}</p>
          <p id="info-create-time">생성일 : {new Date(item.createdAt).toLocaleDateString()}</p>
          <p id="info-update-time">수정일 : {new Date(item.updatedAt).toLocaleDateString()}</p>
          <input id="checkbox" type="checkbox" checked={item.done} onChange={handleCheckbox} />
        </section>
        <section id="info-buttons-section">
          <button id="info-btn-modify" onClick={() => history.push(`/update/${id}`)}>수정</button>
          <button id="info-btn-delete" onClick={handleDelete}>삭제</button>
          <button id="info-btn-home" onClick={() => history.push('/')}>홈으로 이동</button>
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default TodoInfo;
