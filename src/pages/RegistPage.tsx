import React from 'react'
import {useRef} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const RegistPage = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  // const content = useRef('')
  const handleRegist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 등록하기
    if (title.current === null || title.current.value.trim() === "") {
      alert("제목을 입력하세요");
    }
    if (content.current === null|| content.current.value.trim() === "" ) {
      alert("상세 내용을 입력하세요");
    }
    else {
      const shouldRegister = window.confirm("할 일을 등록하시겠습니까?")  // axios post
      if (shouldRegister){
        try {
          await axios.post("http://localhost:33088/api/todolist", {
            title: title.current,
            content: content.current,
            done: false,
          });
          alert("할 일이 등록되었습니다.");
          //window.location.replace("/");
        } catch (err) {
          console.log(err);
        }
      }
      else {
        alert("등록을 취소하였습니다.");
      }
    };
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 홈으로 돌아가기
    const shouldCancel = window.confirm("할 일 등록을 취소하시겠습니까?")  
    if (shouldCancel){
      try {        
        // back to todolist 
        navigate('/')  
      } catch (err) {
        console.log(err);
      }
    }
    else {
      // 아무것도 하지 않음
    }
  }

  return (
  <>
    <h1>TODO Register</h1>
    <form>
      <div>할 일</div>
      <input 
        placeholder="할 일을 입력하세요"
        type = "text"
        ref = {title}
      />
      <div>상세내용</div>
      <textarea 
        placeholder="상세 내용을 입력하세요"        
        ref = {content}
      />
      <div> 
        <button onClick = {handleRegist}>등록</button>
        <button onClick = {handleCancel}>취소</button>
      </div>
    </form>
  </>);
};

export default RegistPage;
