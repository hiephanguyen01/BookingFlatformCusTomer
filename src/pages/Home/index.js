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
import {
  getTop10OrderClothesAction,
  getTop10OrderDeviceAction,
  getTop10OrderMakeupAction,
  getTop10OrderModelAction,
  getTop10OrderPhotographerAction,
  getTop10OrderStudioPostAction,
} from "../../stores/actions/TopOrderCategoryAction";

import { CATEGORIES } from "../../utils/category";
import { SlideCard } from "../StudioDetail/SlideCard";
import Banner from "./Banner/Banner";
import styles from "./home.module.scss";

const cx = classNames.bind(styles);

// ----------------------đừng xoá nhé ---------------------------------
// export const Home = () => {
//   const dispatch = useDispatch();
//   const { selectSearch } = useSelector((state) => state.postDaoReducer);
//   console.log(selectSearch);
//   return (
//     <>
//       <Modal
//         style={{ borderRadius: "6px" }}
//         visible={true}
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

export const Home = () => {
  const { filter } = useSelector((state) => state.studioPostReducer);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  // const [chooseCate, setChooseCate] = useState();
  // const [provinces, setProvinces] = useState([]);

  const navigate = useNavigate();
  const {
    listOustandingStudioPost,
    listOustandingModelPost,
    listOustandingDevicePost,
    listOustandingClothesPost,
    listOustandingMakeupPost,
    listOustandingPhotographerPost,
  } = useSelector((state) => state.topOrderCategoryReducer);

  useEffect(() => {
    // (async () => {
    //   const res = await studioPostService.getAllProvince();
    //   setProvinces(res.data);
    // })();
    dispatch(getTop10OrderStudioPostAction(1));
    dispatch(getTop10OrderPhotographerAction(2));
    dispatch(getTop10OrderClothesAction(3));
    dispatch(getTop10OrderMakeupAction(4));
    dispatch(getTop10OrderDeviceAction(5));
    dispatch(getTop10OrderModelAction(6));
  }, [dispatch]);

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
    <div className={cx("home_container")}>
      <MetaDecorator
        title="Trang chủ Booking Studio"
        description="Chuyên cung cấp các loại dịch vụ"
        imgUrl={logoImg}
        type="article"
        imgAlt="Booking Studio"
      />
      <div className={cx("home")}>
        <div className={cx("filter")}>
          {CATEGORIES.map((item) => (
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
        {/* Banner */}
        {/* <div className={cx("banner")}>
          <div className={cx("box-container")}>
            <div className={cx("box")}>
              <img src={images.banner1} alt="sa" />
              <div className={cx("content")}>
                <h3
                  style={{
                    fontSize: "26px",
                    color: "#616161",
                    padding: "0",
                    margin: "0",
                  }}>
                  ART STUDIO{" "}
                </h3>
                <img src={images.special} alt="bannẻ" />
                <h5
                  style={{
                    fontSize: "30px",
                    color: "#E22828",
                    fontWeight: "600",
                    padding: "0",
                    margin: "0",
                  }}>
                  -1.000.000 vnd{" "}
                </h5>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#616161",
                    marginTop: "28px",
                  }}>
                  Khi đăng ký trước 1 tháng{" "}
                </p>
              </div>
            </div>
            <div className={cx("box2", { box: "box" })}>
              <img src={images.banner2} alt="" />
              <div className={cx("content")}>
                <h4>CITI’ S BEST </h4>
                <h4 style={{ color: "#E22828" }}>PROFESSIONAL </h4>
                <h4>PHOTOGRAPHY</h4>
                <h4>STUDIO</h4>
              </div>
            </div>
          </div>
        </div> */}
        <Banner banners={banners} />
        {/* <ListItem title="Được đặt nhiều nhất" />
      <ListItem title="Đã xem gần đây" /> */}
        <SlideCard
          category={{ name: "studio", id: 1 }}
          data={listOustandingStudioPost}
          title="Top 10 Most Booked Studios"
        />
        <SlideCard
          data={listOustandingModelPost}
          category={{ name: "model", id: 6 }}
          title="Top 10 Most Models"
        />
        <SlideCard
          data={listOustandingClothesPost}
          category={{ name: "clothes", id: 3 }}
          title="Top 10 Most Clothes"
        />
        <SlideCard
          data={listOustandingPhotographerPost}
          category={{ name: "photographer", id: 2 }}
          title="Top 10 Most Photographer"
        />
        <SlideCard
          data={listOustandingDevicePost}
          category={{ name: "device", id: 5 }}
          title="Top 10 Most Devices"
        />
        <SlideCard
          category={{ name: "makeup", id: 4 }}
          data={listOustandingMakeupPost}
          title="Top 10 Most Makeups"
        />
      </div>
    </div>
  );
};
