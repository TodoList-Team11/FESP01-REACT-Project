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
  }

  return items.sort((a, b): number => {
    if (order === "asc") {
      console.log("asc");
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    } else if (order === "desc") {
      console.log("desc");
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
    }
    return 0;
  });
};

const ListSelectBox = ({ setNotDoneList, setDoneList }: Props) => {
  //최신순, 오래된순 정렬 함수
  const sortTodoList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.currentTarget.value === "createdAt_desc") {
      setNotDoneList((list) => [...sortItems({ items: list, order: "desc" })]);
      setDoneList((list) => [...sortItems({ items: list, order: "desc" })]);
    } else {
      setNotDoneList((list) => [...sortItems({ items: list, order: "asc" })]);
      setDoneList((list) => [...sortItems({ items: list, order: "asc" })]);
    }
  };

  return (
    <select onChange={sortTodoList}>
      <option value="createdAt_desc">오래된순</option>
      <option value="createdAt_asc">최신순</option>
    </select>
  );
};
export default ListSelectBox;
