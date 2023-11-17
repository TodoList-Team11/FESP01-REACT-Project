import { useState } from "react";
import SearchModal from "./SearchModal";
interface Props {
  todoList: TodoItem[];
  setNotDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}
const SearchButton = ({ todoList, setNotDoneList, setDoneList }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <button
        className="search-btn"
        onClick={() => setIsShow((isShow) => !isShow)}
      >
        검색
      </button>
      {isShow ? (
        <SearchModal
          todoList={todoList}
          setNotDoneList={setNotDoneList}
          setDoneList={setDoneList}
          setIsShow={setIsShow}
        />
      ) : null}
    </>
  );
};

export default SearchButton;
