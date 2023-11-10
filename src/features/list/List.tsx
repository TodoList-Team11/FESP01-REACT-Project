import { JSXElement } from "@babel/types";
import ListCard from "./ListCard";

const List = () => {
  return (
    <ListCard
      todo={{
        _id: 1,
        title: "string",
        content: "string",
        done: true,
        createdAt: "string",
        updatedAt: "string",
      }}
    />
  );
};

export default List;
