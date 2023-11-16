interface Props {
  setNotDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  setDoneList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

interface ISortItems {
  items: TodoItem[];
  order: string;
}

export const sortItems = ({ items, order }: ISortItems): TodoItem[] => {
  if (items.length === 0) {
    return items;
  } else {
    return items.sort((a, b) => {
      if (order === "asc") {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      } else {
        return (
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        );
      }
    });
  }
};

const ListSelectBox = ({ setNotDoneList, setDoneList }: Props) => {
  //최신순, 오래된순 정렬 함수
  const sortTodoList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === "createdAt_desc") {
      setNotDoneList((list) => sortItems({ items: list, order: "desc" }));
      setDoneList((list) => sortItems({ items: list, order: "desc" }));
    } else {
      setNotDoneList((list) => sortItems({ items: list, order: "asc" }));
      setDoneList((list) => sortItems({ items: list, order: "asc" }));
    }

    // // 기존 view에 있던 목록 삭제
    // const parentNotDone = document.getElementById(
    //   "content-not-done-ul"
    // ) as HTMLInputElement;
    // const parentDone = document.getElementById(
    //   "content-done-ul"
    // ) as HTMLInputElement;
    // parentNotDone.innerHTML = "";
    // parentDone.innerHTML = "";

    // // 정렬된 todo 목록 append
    // notDoneList?.forEach((todo) => {
    //   appendTodo({ parentContent: contentNotDoneUl, todo: todo });
    // });

    // // 정렬된 done 목록 append
    // doneList?.forEach((todo) => {
    //   appendTodo({ parentContent: contentDoneUl, todo: todo });
    // });
  };

  return (
    <select onChange={sortTodoList}>
      <option value="createdAt_desc">오래된순</option>
      <option value="createdAt_asc">최신순</option>
    </select>
  );
};
export default ListSelectBox;
