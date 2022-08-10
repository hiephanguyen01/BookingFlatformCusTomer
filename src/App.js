import { ArrowUpOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ModalCustom } from "./components/Modal";
import { AuthPage } from "./pages/Auth/AuthPage";
import { ProtectedRouter } from "./pages/Auth/ProtectedRouter";
import BookStudio from "./pages/BookStudio";
import { CustomerLayout } from "./pages/CustomerLayout";
import PhotographerDetail from "./pages/PhotographerDetail";
import Dao from "./pages/Dao";
import FilterPage from "./pages/FilterPage/FilterPage";
import UserAccount from "./pages/UserAccount";
import { getCurrentUser } from "./stores/actions/autheticateAction";
import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import PageCostume from "./pages/CostumeDetails/PageCostume";
import PageDevice from "./pages/DeviceDetails/PageDevice";
import PageModel from "./pages/ModelDetails/PageModel";
import PageMakeup from "./pages/MakeupDetails/PageMakeup";

function App() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getCurrentUser(token));
  }, []);
  // Warning  Add <ProtectedRouter></ProtectedRouter> when create Route //
  return (
    <div className="App">
      <ModalCustom />
      <BackTop>
        <ArrowUpOutlined style={style} />
      </BackTop>
      <Routes>
        <Route index path="*" element={<Navigate to="/auth/sign-up" />} />
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
        <Route path="home" element={<CustomerLayout />}>
          <Route path="user/:id/*" element={<UserAccount />}></Route>
          <Route path="filter" element={<FilterPage />}></Route>
          {/* <Route path="dao" element={<Dao />} /> */}
          <Route
            path="photographer/:photographerId"
            element={<PhotographerDetail />}
          />

          <Route
            path="dao"
            element={
              <ProtectedRouter>
                <Dao />
              </ProtectedRouter>
            }
          />
          <Route path="studio/book" element={<BookStudio />} />
          <Route path="cart" element={<Cart />} />
          <Route path="home" element={<Home />} />
          <Route path="costumeDetails/*" element={<PageCostume />} />
          <Route path="deviceDetails/*" element={<PageDevice />} />
          <Route path="modelDetails/*" element={<PageModel />} />
          <Route path="makeupDetails/*" element={<PageMakeup />} />
          {/* <Route
              path="costumeDetails/detailCostumeShop"
              element={<DetailCostumeShop />}
            /> */}
          {/* <Route path="costumeDetails/order" element={<OrderCostume />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
