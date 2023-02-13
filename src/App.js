import { BackTop } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { ReactComponent as BackTopIcon } from "./assets/BackToTop.svg";
import UpdateConfirm from "./components/ConfirmOrder";
import Success from "./components/Email/Success";
import { ModalCustom } from "./components/Modal";
import { AuthPage } from "./pages/Auth/AuthPage";
import { ProtectedRouter } from "./pages/Auth/ProtectedRouter";
import BookStudio from "./pages/BookStudio";
import Cart from "./pages/Cart";
import PageClothes from "./pages/ClothesDetails/PageClothes";
import { CustomerLayout } from "./pages/CustomerLayout";
import Dao from "./pages/Dao";
import DetectApp from "./pages/DetectApp/DetectApp";
import PageDevice from "./pages/DeviceDetails/PageDevice";
import FilterPage from "./pages/FilterPage/FilterPage";
import HelpCenterPage from "./pages/HelpCenter/HelpCenterPage";
import { Home } from "./pages/Home";
import PageMakeup from "./pages/MakeupDetails/PageMakeup";
import PageModel from "./pages/ModelDetails/PageModel";
import PagePhotographer from "./pages/PhotographerDetail/PagePhotographer";
import PostDetail from "./pages/PostDetail/PostDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import PageStudio from "./pages/StudioDetail/PageStudio";
import TermsUse from "./pages/TermsUse/TermsUse";
import UserAccount from "./pages/UserAccount";
import Verify from "./pages/Verify/Verify";
import { visitService } from "./services/VisitService";
import { getCurrentUser } from "./stores/actions/autheticateAction";

function App() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  console.log("localca", new URLSearchParams(search).get("qs"));
  console.log("dhjsabdhjksaghdgshja", localStorage.getItem("qs"));
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  /// count and sent time accesses
  const countAndSendTimeAcc = async () => {
    try {
      const { data } = await axios.get("https://geolocation-db.com/json/");
      localStorage.setItem(
        "@locate@vn@ipkd4couvnnter@ccesskdtime",
        JSON.stringify({ ...data, ts: Date.now() })
      );
      await visitService.count();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("@locate@vn@ipkd4couvnnter@ccesskdtime")) {
        await countAndSendTimeAcc();
      } else {
        try {
          const { data } = await axios.get("https://geolocation-db.com/json/");
          const raw = localStorage.getItem(
            "@locate@vn@ipkd4couvnnter@ccesskdtime"
          );
          const { IPv4, ts } = JSON.parse(raw);
          if (data.IPv4 === IPv4 && Date.now() - ts > 120000) {
            localStorage.removeItem("@locate@vn@ipkd4couvnnter@ccesskdtime");
            await countAndSendTimeAcc();
          }
          if (data.IPv4 !== IPv4) {
            localStorage.removeItem("@locate@vn@ipkd4couvnnter@ccesskdtime");
            await countAndSendTimeAcc();
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
    if (new URLSearchParams(search).get("qs") !== "") {
      localStorage.setItem("qs", new URLSearchParams(search).get("qs"));
      localStorage.setItem(
        "category",
        new URLSearchParams(search).get("category")
      );
      localStorage.setItem("id", new URLSearchParams(search).get("id"));
    }
  }, []);
  console.log(localStorage.getItem("qs"), localStorage.getItem("category"));
  return (
    <div className="App">
      <ModalCustom />
      <BackTop>
        <BackTopIcon />
      </BackTop>
      <Routes>
        <Route index path="*" element={<Navigate to="/home" />} />
        <Route path="/auth/*" element={<AuthPage />}></Route>
        <Route path="/test" element={<Success />}></Route>
        <Route
          path="/verify/:token"
          element={
            <CustomerLayout>
              <Verify />
            </CustomerLayout>
          }></Route>
        <Route path="home" element={<CustomerLayout />}>
          <Route index element={<Home />}></Route>
          <Route
            path="user/*"
            element={
              <ProtectedRouter>
                <UserAccount />
              </ProtectedRouter>
            }></Route>
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
