import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Regist.css";

const Regist = () => {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  // const content = useRef('')
  const handleRegist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 등록하기
    if (title.current === null || title.current.value.trim() === "") {
      alert("제목을 입력하세요");
    } else if (
      content.current === null ||
      content.current.value.trim() === ""
    ) {
      alert("상세 내용을 입력하세요");
    } else {
      const shouldRegister = window.confirm("할 일을 등록하시겠습니까?"); // axios post
      if (shouldRegister) {
        try {
          await axios.post("http://localhost:33088/api/todolist", {
            title: title.current.value,
            content: content.current.value,
            done: false,
          });
          alert("할 일이 등록되었습니다.");
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("등록을 취소하였습니다.");
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 홈으로 돌아가기
    const shouldCancel = window.confirm("할 일 등록을 취소하시겠습니까?");
    if (shouldCancel) {
      try {
        // back to todolist
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      // 아무것도 하지 않음
    }
  };

  return (
    <>
      <div>
        <div className="regist">
          <form className="form">
            <div className="regist-detail">
              <div className="title-container">
                <div className="title">할 일</div>
                <input
                  className="title-regist"
                  placeholder="할 일을 입력하세요"
                  type="text"
                  ref={title}
                />
              </div>
              <div className="content">상세내용</div>
              <textarea
                className="content-regist"
                placeholder="상세 내용을 입력하세요"
                ref={content}
              />
              <div className="btn_container">
                <button className="submit" onClick={handleRegist}>
                  등록
                </button>
                <button className="cancel" onClick={handleCancel}>
                  취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Regist;
