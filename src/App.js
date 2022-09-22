import React, { useEffect } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
import { BackTop, Modal } from "antd";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ModalCustom } from "./components/Modal";
import { AuthPage } from "./pages/Auth/AuthPage";
import BookStudio from "./pages/BookStudio";
import { CustomerLayout } from "./pages/CustomerLayout";
import Dao from "./pages/Dao";
import FilterPage from "./pages/FilterPage/FilterPage";
import UserAccount from "./pages/UserAccount";
import { getCurrentUser } from "./stores/actions/autheticateAction";
import Cart from "./pages/Cart";
import { Home } from "./pages/Home";
import PageClothes from "./pages/ClothesDetails/PageClothes";
import PagePhotographer from "./pages/PhotographerDetail/PagePhotographer";
import PageDevice from "./pages/DeviceDetails/PageDevice";
import PageModel from "./pages/ModelDetails/PageModel";
import PageMakeup from "./pages/MakeupDetails/PageMakeup";
import PageStudio from "./pages/StudioDetail/PageStudio";
import UpdateConfirm from "./pages/UserAccount/components/OrderStatus/conponents/UpdateConfirm/index";

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
    dispatch(getCurrentUser());
  }, []);
  // Warning  Add <ProtectedRouter></ProtectedRouter> when create Route //
  return (
    <div className="App">
      <ModalCustom />
      <BackTop>
        <ArrowUpOutlined style={style} />
      </BackTop>
      <Routes>
        <Route index path="*" element={<Navigate to="/home" />} />
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
        <Route path="home" element={<CustomerLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="user/:id/*" element={<UserAccount />} />
          <Route path="filter" element={<FilterPage />}></Route>
          <Route path="dao" element={<Dao />} />
          <Route path="studio/book" element={<BookStudio />} />
          <Route path="cart" element={<Cart />} />
          <Route path="studio/*" element={<PageStudio />} />
          <Route path="photographer/*" element={<PagePhotographer />} />
          <Route path="device/*" element={<PageDevice />} />
          <Route path="clothes/*" element={<PageClothes />} />
          <Route path="model/*" element={<PageModel />} />
          <Route path="makeup/*" element={<PageMakeup />} />
          <Route path="confirm-order/*" element={<UpdateConfirm />} />
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
