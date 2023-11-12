import "./todoUpdate.css";
import React, { useEffect, useState } from "react";
import UpdateTodoInfo from "services/UpdateTodoInfo";
import selectTodoInfo from "services/SelectTodoInfo";
// import GetId from "utils/getId";

export default function TodoUpdate() {
  const [todoitem, setTodoItem] = useState<TodoInfoItem>({});
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // const ID = GetId();
  // console.log(ID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await selectTodoInfo(1);
        if (data.item) {
          setInputContent(data.item.content);
          setInputTitle(data.item.title);
          setIsChecked(data.item.isChecked);
          setTodoItem(data.item);
        }
      } catch (error) {
        console.error("Error fetching todo data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputContent(e.target.value);
  };
  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const input = {
    _id: todoitem._id,
    title: inputTitle,
    content: inputContent,
    done: isChecked,
  };
  console.log(input);
  const onclickupdateHandler = async () => {
    if (inputTitle === "" && todoitem.title) {
      setInputTitle(todoitem.title);
    }
    if (inputContent === "" && todoitem.content) {
      setInputContent(todoitem.content);
    } else {
      alert("할일을 수정하시겠습니까?");
      await UpdateTodoInfo({
        _id: todoitem._id,
        title: inputTitle,
        content: inputContent,
        done: isChecked,
      });
      alert("수정이 완료되었습니다.");
      // window.location.replace("/");
    }
  };

  const onclickCancelHandler = (e: React.FormEvent) => {
    window.history.back();
  };

  return (
    <div className="update">
      <div id="update-detail">
        <div className="updateDetail_container">
          <div className="title_container">
            <div className="title">할 일</div>
            <input
              type="checkbox"
              id="checkbox"
              name="checkbox"
              className="checkbox"
              defaultChecked={todoitem.done}
              onChange={handleCheckedChange}
            />
          </div>
          <input
            type="text"
            className="title-update"
            placeholder="할 일을 입력하세요."
            value={inputTitle}
            onChange={handleTitleChange}
          />
          <div className="content">상세 내용</div>
          <textarea
            className="content-update"
            placeholder="상세 내용을 입력하세요."
            value={inputContent}
            onChange={handleContentChange}
          />
        </div>

        <div className="btn_container">
          <button className="updateButton" onClick={onclickupdateHandler}>
            수정완료
          </button>
          <button className="cancel" onClick={onclickCancelHandler}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
