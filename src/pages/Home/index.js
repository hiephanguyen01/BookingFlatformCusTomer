import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../src/assets/img/Logo1.png";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { bannerService } from "../../services/Banner";
import {
  getAllStudioLikedAction1,
  getAllStudioLikedAction2,
  getAllStudioLikedAction3,
  getAllStudioLikedAction4,
  getAllStudioLikedAction5,
  getAllStudioLikedAction6,
  getFilterStudioPost,
} from "../../stores/actions/studioPostAction";

import { CATEGORIES } from "../../utils/category";
// import { SlideCard } from "../StudioDetail/SlideCard";
import Banner from "./components/Banner/Banner";
import styles from "./home.module.scss";
import { Col, Grid } from "antd";
import Header from "../../components/Header/Header";
import { lazy } from "react";
import { Suspense } from "react";

const cx = classNames.bind(styles);
const Top10Studio = lazy(() => import("./components/Top10Studio/Top10Studio"));
const Top10Makeup = lazy(() => import("./components/Top10Makeup/Top10Makeup"));
const Top10Photographer = lazy(() =>
  import("./components/Top10Photographer/Top10Photographer")
);
const Top10Model = lazy(() => import("./components/Top10Model/Top10Model"));
const Top10Clothes = lazy(() =>
  import("./components/Top10Clothes/Top10Clothes")
);
const Top10Device = lazy(() => import("./components/Top10Device/Top10Device"));

// ----------------------đừng xoá nhé ---------------------------------
// export const Home = () => {
//   const dispatch = useDispatch();
//   const { selectSearch } = useSelector((state) => state.postDaoReducer);
//   return (
//     <>
//       <Modal
//         style={{ borderRadius: "6px" }}
//         open={true}
//         closable={false}
//         width="700px"
//         footer={null}
//       >
//         <div className={cx("search-studio")}>
//           <div>
//             <Input
//               size="large"
//               placeholder="Tìm studio, người mẫu,..."
//               spellCheck={false}
//               prefix={<SearchOutlined />}
//             />
//             <p className={cx("number-select")}>
//               {selectSearch.length} bài đăng được chọn
//             </p>
//             <div className={cx("result-filter")}>
//               {selectSearch.map((item) => {
//                 return (
//                   <div className={cx("result-item")}>
//                     <span>{item?.title}</span>
//                     <CloseOutlined
//                       onClick={() =>
//                         dispatch({ type: REMOVE_RESULT, payLoad: item })
//                       }
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//             <div className={cx("search-result")}>
//               {dataSearch.map((item) => {
//                 return (
//                   <div className={cx("item")}>
//                     <div className={cx("left")}>
//                       <img src={item.img} alt="sa" />
//                       <div className={cx("content")}>
//                         <h5>{item.title}</h5>
//                         <p>500.000đ / giờ </p>
//                         <div>
//                           <div className={cx("rate")}>
//                             <StarOutlined color="#616161" />
//                             <span>{item.rate}</span>
//                             <span
//                               className={cx("number-order")}
//                               style={{ fontSize: "15px" }}
//                             >
//                               {item.order}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className={cx("right")}>
//                       <Checkbox
//                         checked={
//                           selectSearch.findIndex(
//                             (item1) => item1.id === item.id
//                           ) !== -1
//                             ? true
//                             : false
//                         }
//                         onClick={() =>
//                           dispatch({
//                             type: SELECT_RESULT,
//                             payload: item,
//                           })
//                         }
//                         style={{ fontSize: "16px" }}
//                       />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               justifyContent: "flex-end",
//               marginTop: "auto",
//             }}
//           >
//             <button
//               // onClick={() => dispatch({ type: HIDE_MODAL })}
//               style={{
//                 padding: "14px 36px",
//                 background: "#E7E7E7",
//                 borderRadius: "8px",
//                 border: 0,
//                 cursor: "pointer",
//               }}
//             >
//               Huỷ
//             </button>
//             <button
//               style={{
//                 padding: "14px 36px",
//                 background: "#E22828",
//                 borderRadius: "8px",
//                 color: "#fff",
//                 border: 0,
//                 cursor: "pointer",
//               }}
//             >
//               Xong
//             </button>
//           </div>
//         </div>
//       </Modal>

const { useBreakpoint } = Grid;

const Home = () => {
  const { filter } = useSelector((state) => state.studioPostReducer);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  // const [chooseCate, setChooseCate] = useState();
  // const [provinces, setProvinces] = useState([]);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(getAllStudioLikedAction1(1));
      dispatch(getAllStudioLikedAction2(2));
      dispatch(getAllStudioLikedAction3(3));
      dispatch(getAllStudioLikedAction4(4));
      dispatch(getAllStudioLikedAction5(5));
      dispatch(getAllStudioLikedAction6(6));
    }
  }, [currentUser, dispatch]);

  const handleClickCategory = (categoryId) => {
    const newFilter = {
      ...filter,
      category: categoryId,
      keyString: "",
    };
    dispatch(getFilterStudioPost(5, 1, newFilter, currentUser, navigate));
  };
  const [banners, setBannerList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await bannerService.getAllBanner();
      setBannerList(data.data);
    })();
  }, []);

  return (
    <>
      {screens.xs && <Header />}
      <div className={cx("home_container")}>
        <MetaDecorator
          title="Trang chủ Booking Studio"
          description="Chuyên cung cấp các loại dịch vụ"
          imgUrl={logoImg}
          type="article"
          imgAlt="Booking Studio"
        />
        <div className={cx("container")}>
          <div
            className={cx(screens?.xs ? "filter-mobile" : "filter")}
            style={
              screens.xs
                ? {
                    backgroundColor: "",
                    padding: 12,
                  }
                : {
                    padding: 29,
                    backgroundColor: "#ffff",
                  }
            }>
            {screens.xs
              ? CATEGORIES.map((item) => (
                  <Col span={24} style={{ textAlign: "center" }}>
                    <div
                      key={item.id}
                      className={cx("box", "shadow", "mb-5")}
                      onClick={() => {
                        handleClickCategory(item.id);
                      }}
                      style={{
                        backgroundColor: "#ffff",
                        border: "none",
                      }}>
                      <img src={item.img} alt="a" />
                    </div>
                    <p style={{ fontSize: 16 }}>{item.label}</p>
                  </Col>
                ))
              : CATEGORIES.map((item) => (
                  <div
                    key={item.id}
                    className={cx("box")}
                    onClick={() => {
                      handleClickCategory(item.id);
                    }}>
                    <img src={item.img} alt="a" />
                    <span>{item.label}</span>
                  </div>
                ))}
          </div>
          <Banner banners={banners} />
          <Suspense fallback={<div>Loading...</div>}>
            <Top10Studio />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Top10Model />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Top10Clothes />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Top10Photographer />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Top10Device />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Top10Makeup />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Home;
