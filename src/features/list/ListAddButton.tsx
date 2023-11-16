interface Props {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const ListAddButton = ({ setLimit }: Props) => {
  const getNextPage = () => {
    setLimit((limit) => {
      console.log(limit);
      return limit + 4;
    });
  };
  return <button onClick={getNextPage}>+</button>;
};

export default ListAddButton;
