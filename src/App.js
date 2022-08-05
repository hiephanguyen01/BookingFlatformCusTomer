import "./App.scss";
import { AuthPage } from "./pages/Auth/AuthPage";
import { Routes, Route, Navigate } from "react-router-dom";
import UserAccount from "./pages/UserAccount";
import BookStudio from "./pages/BookStudio";
import FilterPage from "./pages/FilterPage/FilterPage";
import Cart from "./pages/Cart";
import Dao from "./pages/Dao";
import { CustomerLayout } from "./pages/CustomerLayout";
import { Home } from "./pages/Home";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import {  ModalCustom } from "./components/Modal";

import { AuthContextProvider } from "./pages/Auth/AuthContext/AuthContext";

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
  // Warning  Add <ProtectedRouter></ProtectedRouter> when create Route //
  return (
    <div className="App">
      <ModalCustom />
      <BackTop>
        <ArrowUpOutlined style={style} />
      </BackTop>
      <AuthContextProvider>
        <Routes>
          <Route index path="*" element={<Navigate to="/auth/sign-up" />} />
          <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
          <Route path="home" element={<CustomerLayout />}>
            <Route path="user/:id/*" element={<UserAccount />}></Route>
            <Route path="filter" element={<FilterPage />}></Route>
            <Route path="dao" element={<Dao />} />
            <Route path="studio/book" element={<BookStudio />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}
// Warning  Add <ProtectedRouter> <YourElement/> </ProtectedRouter> when create Route //
export default App;
