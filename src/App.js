import "./App.scss";

import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import FilterPage from "./pages/FilterPage/FilterPage";
import Dao from "./pages/Dao";
import { CustomerLayout } from "./pages/CustomerLayout";
import { Home } from "./pages/Home";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import {  ModalCustom } from "./components/Modal";
function App() {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: "50%",
    backgroundColor: "#E22828",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  };
  return (
    <div className="App">
      <ModalCustom />
      <BackTop>
        <ArrowUpOutlined style={style} />
      </BackTop>
      <Routes>
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>

        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="/user/:id/*" element={<UserAccount />}></Route>
          <Route path="/filter" element={<FilterPage />}></Route>
          <Route path="/dao" element={<Dao />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
