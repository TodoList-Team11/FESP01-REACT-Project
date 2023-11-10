import React from 'react'
import {useRef} from 'react';

const RegistPage = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  // const content = useRef('')

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
        <button>등록</button>
        <button>취소</button>
      </div>
    </form>
  </>);
};

export default RegistPage;
