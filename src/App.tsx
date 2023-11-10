import "./App.css";
import { Route, Routes } from "react-router-dom";
import ListPage from "pages/ListPage";
import InfoPage from "pages/InfoPage";
import RegistPage from "pages/RegistPage";
import UpdatePage from "pages/UpdatePage";
import Layout from "layouts/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/regist" element={<RegistPage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Route>
    </Routes>
  );
}

export default App;
