import { ArrowUpOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { ModalCustom } from "./components/Modal";
import { AuthPage } from "./pages/Auth/AuthPage";
import BookStudio from "./pages/BookStudio";
import Cart from "./pages/Cart";
import PageClothes from "./pages/ClothesDetails/PageClothes";
import { CustomerLayout } from "./pages/CustomerLayout";
import Dao from "./pages/Dao";
import PageDevice from "./pages/DeviceDetails/PageDevice";
import FilterPage from "./pages/FilterPage/FilterPage";
import { Home } from "./pages/Home";
import PageMakeup from "./pages/MakeupDetails/PageMakeup";
import PageModel from "./pages/ModelDetails/PageModel";
import PagePhotographer from "./pages/PhotographerDetail/PagePhotographer";
import PageStudio from "./pages/StudioDetail/PageStudio";
import UserAccount from "./pages/UserAccount";
import UpdateConfirm from "./components/ConfirmOrder";
import { ProtectedRouter } from "./pages/Auth/ProtectedRouter";
import PostDetail from "./pages/PostDetail/PostDetail";
import { getCurrentUser } from "./stores/actions/autheticateAction";
import { ReactComponent as BackTopIcon } from "./assets/BackToTop.svg";
import Support from "./pages/UserAccount/components/support/Support";
import HelpCenterPage from "./pages/HelpCenter/HelpCenterPage";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsUse from "./pages/TermsUse/TermsUse";
import Success from "./components/Email/Success";
import { VerifyOtp } from "./components/Modal/verifyOtp/VerifyOtp";
import DetectApp from "./pages/DetectApp/DetectApp";
import Verify from "./pages/Verify/Verify";

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
        {/* <ArrowUpOutlined style={style} /> */}
        {/* <BackTopIcon /> */}
        <BackTopIcon />
      </BackTop>
      <Routes>
        <Route index path="*" element={<Navigate to="/home" />} />
        <Route path="/auth/*" element={<AuthPage></AuthPage>}></Route>
        <Route path="/test" element={<Success />}></Route>
        <Route
          path="/verify/:token"
          element={
            <CustomerLayout>
              <Verify />
            </CustomerLayout>
          }
        ></Route>
        <Route path="home" element={<CustomerLayout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="user/*"
            element={
              <ProtectedRouter>
                <UserAccount />
              </ProtectedRouter>
            }
          ></Route>
          <Route path="filter" element={<FilterPage />}></Route>
          <Route path="dao" element={<Dao />} />
          <Route path="dao/posts/:postId" element={<PostDetail />} />
          <Route path="studio/book" element={<BookStudio />} />
          <Route path="cart" element={<Cart />} />
          <Route path="helpCenter/*" element={<HelpCenterPage />}></Route>
          <Route path="studio/*" element={<PageStudio />} />
          <Route path="photographer/*" element={<PagePhotographer />} />
          <Route path="device/*" element={<PageDevice />} />
          <Route path="clothes/*" element={<PageClothes />} />
          <Route path="model/*" element={<PageModel />} />
          <Route path="makeup/*" element={<PageMakeup />} />
          <Route path="confirm-order/*" element={<UpdateConfirm />} />
          <Route path="privacy-policy/*" element={<PrivacyPolicy />}></Route>
          <Route path="terms-use/*" element={<TermsUse />}></Route>
          <Route path="detect-app" element={<DetectApp />}></Route>
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
