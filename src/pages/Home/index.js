import { AutoComplete } from "antd";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../src/assets/img/Logo1.png";
import images from "../../assets/images";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { studioPostService } from "../../services/StudioPostService";
import { getFilterStudioPost } from "../../stores/actions/studioPostAction";
import {
  getTop10OrderClothesAction,
  getTop10OrderDeviceAction,
  getTop10OrderMakeupAction,
  getTop10OrderModelAction,
  getTop10OrderPhotographerAction,
  getTop10OrderStudioPostAction,
} from "../../stores/actions/TopOrderCategoryAction";
import { SlideCard } from "../StudioDetail/SlideCard";
import styles from "./home.module.scss";
import { ListItem } from "./ListCard";

const cx = classNames.bind(styles);
const { Option } = AutoComplete;

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

const CATEGORIES = [
  {
    id: 1,
    label: "Studio",
    img: images.studio1,
    linkTo: "studio",
  },
  {
    id: 2,
    label: "Nhiếp ảnh",
    img: images.cameraman,
    linkTo: "photographer",
  },
  {
    id: 6,
    label: "Thiết bị",
    img: images.camera,
    linkTo: "device",
  },
  {
    id: 3,
    label: "Trang phục",
    img: images.clothes,
    linkTo: "clothes",
  },
  {
    id: 4,
    label: "Make up",
    img: images.makeup,
    linkTo: "makeup",
  },
  {
    id: 5,
    label: "Người mẫu",
    img: images.model,
    linkTo: "model",
  },
];

export const Home = () => {
  // const category = useSelector((state) => state.listByCategoryReducer.category);
  // const linkTo = useSelector((state) => state.listByCategoryReducer.linkTo);
  const { filter, laoding } = useSelector((state) => state.studioPostReducer);

  const dispatch = useDispatch();
  const [chooseCate, setChooseCate] = useState();
  const [visible, setVisible] = useState(false);
  const [provinces, setProvinces] = useState([]);

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
    (async () => {
      const res = await studioPostService.getAllProvince();
      setProvinces(res.data);
    })();
    dispatch(getTop10OrderStudioPostAction());
    dispatch(getTop10OrderClothesAction());
    dispatch(getTop10OrderDeviceAction());
    dispatch(getTop10OrderMakeupAction());
    dispatch(getTop10OrderModelAction());
    dispatch(getTop10OrderPhotographerAction());
  }, []);

  const handleClickCategory = (categoryId) => {
    const newFilter = {
      ...filter,
      category: categoryId,
    };
    dispatch(getFilterStudioPost(5, 1, newFilter));
    navigate("/home/filter");
  };

  const handleChange = (value) => {};

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
              className={cx("box", `${chooseCate === item.id && "active"}`)}
              onClick={() => {
                setChooseCate(item.id);
                handleClickCategory(item.id);
              }}
            >
              <img src={item.img} alt="a" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className={cx("banner")}>
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
                  }}
                >
                  ART STUDIO{" "}
                </h3>
                <img src={images.special} />
                <h5
                  style={{
                    fontSize: "30px",
                    color: "#E22828",
                    fontWeight: "600",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  -1.000.000 vnd{" "}
                </h5>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#616161",
                    marginTop: "28px",
                  }}
                >
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
        </div>

        {/* <ListItem title="Được đặt nhiều nhất" />
        <ListItem title="Đã xem gần đây" /> */}
        <SlideCard
          data={listOustandingStudioPost}
          title="Top 10 Most Booked Studios"
        />
        <SlideCard data={listOustandingModelPost} title="Top 10 Most Models" />
        <SlideCard
          data={listOustandingClothesPost}
          title="Top 10 Most Clothes"
        />
        <SlideCard
          data={listOustandingPhotographerPost}
          title="Top 10 Most Photographer"
        />
        <SlideCard
          data={listOustandingDevicePost}
          title="Top 10 Most Devices"
        />
        <SlideCard
          data={listOustandingMakeupPost}
          title="Top 10 Most Makeups"
        />
      </div>
    </div>
  );
};
