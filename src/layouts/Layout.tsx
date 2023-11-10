import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header title={"Todo List"} />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
