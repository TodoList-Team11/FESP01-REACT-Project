import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './todoInfo.css';

interface TodoItem {
  _id: string;
  title: string;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

const InfoSection = ({ title, content }: { title: string, content: string }) => (
  <section>
    <h2>{title}</h2>
    <p>{content}</p>
  </section>
);

const TodoInfo = () => {
  const { todoId } = useParams();
  const [item, setItem] = useState<TodoItem | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`http://localhost:33088/api/todoList/${todoId}`);
      setItem(data.item);
    };
    fetchItem();
  }, [todoId]);

  const handleCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await axios.put(`http://localhost:33088/api/todoList/${todoId}`, { ...item, done: e.target.checked });
    setItem(prev => ({ ...prev!, done: e.target.checked }));
  };

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await axios.delete(`http://localhost:33088/api/todoList/${todoId}`);
      navigate('/');
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div id="page" className="info">
      <header></header>
      <main>
        <InfoSection title="할 일" content={item.title} />
        <InfoSection title="상세 내용" content={item.content} />
        <InfoSection title="생성일" content={new Date(item.createdAt).toLocaleDateString()} />
        <InfoSection title="수정일" content={new Date(item.updatedAt).toLocaleDateString()} />
        <input id="checkbox" type="checkbox" checked={item.done} onChange={handleCheckbox} />
        <section id="info-buttons-section">
          <button id="info-btn-modify" onClick={() => navigate(`/update/${todoId}`)}>수정</button>
          <button id="info-btn-delete" onClick={handleDelete}>삭제</button>
          <button id="info-btn-home" onClick={() => navigate('/')}>홈으로 이동</button>
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default TodoInfo;
