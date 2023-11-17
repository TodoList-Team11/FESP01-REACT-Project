interface Props {
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

const ListAddButton = ({ setLimit }: Props) => {
  const getNextPage = () => {
    setLimit((limit) => {
      console.log(limit);
      return limit + 10;
    });
  };
  return (
    <button className="add-btn" onClick={getNextPage}>
      더보기 +
    </button>
  );
};

export default ListAddButton;
