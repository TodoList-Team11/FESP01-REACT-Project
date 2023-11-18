import { useRef, useState } from "react";
import "./searchModal.css";
import ListCard from "../ListCard";
interface Props {
  todoList: TodoItem[];
  setNotDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchModal = ({
  todoList,
  setNotDoneList,
  setDoneList,
  setIsShow,
}: Props) => {
  const searchEl = useRef<HTMLInputElement>(null);
  const [searchList, setSearchList] = useState<TodoItem[]>([]);
  const [hasList, setHasList] = useState<boolean>(true);
  const clickedSearch = () => {
    searchEl.current?.focus();
    const keyword = searchEl.current?.value || "";
    if (keyword) {
      setSearchList([
        ...todoList?.filter((todo) => todo.title.includes(keyword)),
      ]);
    }
    setHasList(!!keyword);
  };
  return (
    <div className="search">
      <div className="modal">
        <div className="modal-content">
          <div>
            <input
              ref={searchEl}
              type="text"
              placeholder="할 일의 제목을 입력해주세요"
            />
            <button onClick={clickedSearch}>검색</button>
          </div>
          <div className="search-list">
            <ul className="search-ul">
              {searchList?.map((todo) => (
                <ListCard
                  key={`search_${todo._id}`}
                  todo={todo}
                  setNotDoneList={setNotDoneList}
                  setDoneList={setDoneList}
                />
              ))}
            </ul>
            {!hasList && <p>검색 결과가 없습니다.</p>}
          </div>
          <button className="close-modal-btn" onClick={() => setIsShow(false)}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
