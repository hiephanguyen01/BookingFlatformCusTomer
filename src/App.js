import { BackTop, Grid } from "antd";
import axios from "axios";
import React, { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { ReactComponent as BackTopIcon } from "./assets/BackToTop.svg";
import UpdateConfirm from "./components/ConfirmOrder";
import Success from "./components/Email/Success";
import { ModalCustom } from "./components/Modal";
import { ProtectedRouter } from "./pages/Auth/ProtectedRouter";
import { visitService } from "./services/VisitService";
import {
  getCurrentUser,
  setupSocket,
} from "./stores/actions/autheticateAction";
import { SET_USER } from "./stores/types/authType";
import SuspenseWrap from "./components/SuspenseWrap/SuspenseWrap";

const Dao = lazy(() => import("./pages/Dao"));
const DetectApp = lazy(() => import("./pages/DetectApp/DetectApp"));
const PageDevice = lazy(() => import("./pages/DeviceDetails/PageDevice"));
const FilterPage = lazy(() => import("./pages/FilterPage/FilterPage"));
const HelpCenterPage = lazy(() => import("./pages/HelpCenter/HelpCenterPage"));
const AuthPage = lazy(() => import("./pages/Auth/AuthPage"));
const BookStudio = lazy(() => import("./pages/BookStudio"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const PageClothes = lazy(() => import("./pages/ClothesDetails/PageClothes"));
const CustomerLayout = lazy(() => import("./pages/CustomerLayout"));
const Home = lazy(() => import("./pages/Home"));
const PageMakeup = lazy(() => import("./pages/MakeupDetails/PageMakeup"));
const PageModel = lazy(() => import("./pages/ModelDetails/PageModel"));
const PagePhotographer = lazy(() =>
  import("./pages/PhotographerDetail/PagePhotographer")
);
const PostDetail = lazy(() => import("./pages/PostDetail/PostDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const Refund = lazy(() => import("./pages/Refund/Refund"));
const PageStudio = lazy(() => import("./pages/StudioDetail/PageStudio"));
const TermsUse = lazy(() => import("./pages/TermsUse/TermsUse"));
const UserAccount = lazy(() => import("./pages/UserAccount"));
const Verify = lazy(() => import("./pages/Verify/Verify"));

const { useBreakpoint } = Grid;

function App() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(setupSocket());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch({ type: SET_USER, payload: { id: 1, Fullname: "Nguyen" } });
  // }, [dispatch]);
  /// count and sent time accesses
  const countAndSendTimeAcc = async () => {
    try {
      const { data } = await axios.get("https://geolocation-db.com/json/");
      localStorage.setItem(
        "@locate@vn@ipkd4couvnnter@ccesskdtime",
        JSON.stringify({ ...data, ts: Date.now() })
      );
      await visitService.count();
      if (new URLSearchParams(search).get("qs"))
        await visitService.affiliateAccessCount({
          AffiliateUserId: localStorage.getItem("qs"),
          IpAddress: data.IPv4,
        });
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
  return (
    <div className="App">
      <ModalCustom />
      <BackTop>
        <BackTopIcon style={{ height: "28px" }} />
      </BackTop>
      <Routes>
        <Route index path="*" element={<Navigate to="/home" />} />
        <Route
          path="/auth/*"
          element={
            <SuspenseWrap>
              <AuthPage />
            </SuspenseWrap>
          }
        ></Route>
        <Route
          path="/test"
          element={
            <SuspenseWrap>
              <Success />
            </SuspenseWrap>
          }
        ></Route>
        <Route
          path="/verify/:token"
          element={
            <CustomerLayout>
              <Verify />
            </CustomerLayout>
          }
        ></Route>
        <Route path="home" element={<CustomerLayout />}>
          <Route
            path="refund"
            element={
              <SuspenseWrap>
                <Refund />
              </SuspenseWrap>
            }
          ></Route>
          <Route
            index
            element={
              <SuspenseWrap>
                <Home />
              </SuspenseWrap>
            }
          ></Route>
          <Route
            path="user/*"
            element={
              <SuspenseWrap>
                <ProtectedRouter>
                  <UserAccount />
                </ProtectedRouter>
              </SuspenseWrap>
            }
          ></Route>
          <Route
            path="filter"
            element={
              <SuspenseWrap>
                <FilterPage />
              </SuspenseWrap>
            }
          ></Route>
          <Route
            path="dao"
            element={
              <SuspenseWrap>
                <Dao />
              </SuspenseWrap>
            }
          />
          <Route path="dao/posts/:postId" element={<PostDetail />} />
          <Route
            path="studio/book"
            element={
              <SuspenseWrap>
                <BookStudio />
              </SuspenseWrap>
            }
          />
          <Route
            path="cart/*"
            element={
              <SuspenseWrap>
                <CartPage />
              </SuspenseWrap>
            }
          />
          <Route path="helpCenter/*" element={<HelpCenterPage />}></Route>
          <Route
            path="studio/*"
            element={
              <SuspenseWrap>
                <PageStudio />
              </SuspenseWrap>
            }
          />
          <Route
            path="photographer/*"
            element={
              <SuspenseWrap>
                <PagePhotographer />
              </SuspenseWrap>
            }
          />
          <Route
            path="device/*"
            element={
              <SuspenseWrap>
                <PageDevice />
              </SuspenseWrap>
            }
          />
          <Route
            path="clothes/*"
            element={
              <SuspenseWrap>
                <PageClothes />
              </SuspenseWrap>
            }
          />
          <Route
            path="model/*"
            element={
              <SuspenseWrap>
                <PageModel />
              </SuspenseWrap>
            }
          />
          <Route
            path="makeup/*"
            element={
              <SuspenseWrap>
                <PageMakeup />
              </SuspenseWrap>
            }
          />
          <Route
            path="confirm-order/*"
            element={
              <SuspenseWrap>
                <UpdateConfirm />
              </SuspenseWrap>
            }
          />
          <Route
            path="privacy-policy/*"
            element={
              <SuspenseWrap>
                <PrivacyPolicy />
              </SuspenseWrap>
            }
          ></Route>
          <Route
            path="terms-use/*"
            element={
              <SuspenseWrap>
                <TermsUse />
              </SuspenseWrap>
            }
          ></Route>
          <Route
            path="detect-app"
            element={
              <SuspenseWrap>
                <DetectApp />
              </SuspenseWrap>
            }
          ></Route>
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
