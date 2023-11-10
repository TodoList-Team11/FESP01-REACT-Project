import Update from "features/update/UpDate";
import Header from "layouts/Header";
import Footer from "layouts/Footer";

const UpdatePage = () => {
  return (
    <div>
      <Header title={"todo 수정"} />
      <Update />
      <Footer />
    </div>
  );
};

export default UpdatePage;
