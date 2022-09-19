import React, { createRef, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { LightBox } from "react-lightbox-pack"; // <--- Importing LightBox Pack
import "react-lightbox-pack/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircleOutlined,
  HeartOutlined,
  MoreOutlined,
  PlayCircleOutlined,
  StarFilled,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Pagination, Popover, Table } from "antd";
import { Helmet } from "react-helmet";
import images from "../../assets/images";
import { Rate } from "antd";
import Content from "../../components/ReadMore";
import { ListItem } from "../Home/ListCard";
import { SlideCard } from "./SlideCard";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { Report } from "./Report";
import { Voucher } from "./Voucher";
import { ModalImage } from "./ModalImg";
import { useLocation, useParams } from "react-router-dom";
import {
  getAllStudioPost,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { getDetailRoomAction } from "../../stores/actions/roomAction";
import { SET_SELECT_ROOM } from "../../stores/types/RoomType";

const cx = classNames.bind(styles);

const dataImg = [
  {
    id: 1,
    image: `${images.detail1}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
  {
    id: 2,
    image: `${images.detail2}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
  {
    id: 3,
    image: `${images.detail3}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
  {
    id: 4,
    image: `${images.detail4}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
  {
    id: 5,
    image: `${images.detail1}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
  {
    id: 5,
    image: `${images.detail1}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
  {
    id: 5,
    image: `${images.detail1}`,
    title: "Lorem Ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda, velit explicabo non at consequuntur accusamus hic optio alias error nisi sunt sint veniam aperiam similique dolor fugit itaque minima!",
  },
];

export const StudioDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  // State
  const [activeId, setActiveId] = useState(5);
  const dispatch = useDispatch();
  const { studioDetail, studioNear, studioPostList } = useSelector(
    (state) => state.studioPostReducer
  );
  const { roomDetail, roomSelect } = useSelector((state) => state.roomReducer);
  console.log("studioDetail", studioDetail);
  console.log("roomDetail", roomDetail);
  console.log("studioNear", studioNear);
  console.log("studioPostList", studioPostList);
  // Handler
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: SHOW_MODAL, Component: <Voucher /> });
    }, 5000);
  }, []);
  useEffect(() => {
    dispatch(studioDetailAction(id));
    dispatch(getDetailRoomAction(id));
    dispatch(getAllStudioPost(10, 1, 1));
  }, [id]);
  const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const handleReport = () => {
    dispatch({ type: SHOW_MODAL, Component: <Report /> });
  };
  const columns = [
    {
      title: "Loại phòng",
      width: "30%",
      render: (text) => {
        console.log("text", text);
        return (
          <div style={{ textAlign: "center" }}>
            <img
              alt="as"
              style={{ width: "100%", height: "100px", borderRadius: " 6px" }}
              src={`${text.Image[0]}`}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  color: "#616161",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Phòng
              </span>
              <span
                style={{
                  color: "#3F3F3F",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {text.Name}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  color: "#616161",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Diện tích
              </span>
              <span
                style={{
                  color: "#3F3F3F",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {text.Area}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span
                style={{
                  color: "#616161",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Phong cách
              </span>
              <span
                style={{
                  color: "#3F3F3F",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {text.Style}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "Description",
      key: "Description",
      render: (text) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Giá cho thời gian bạn đã chọn ",
      render: (text) => {
        return (
          <div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span
                style={{
                  color: "#E22828",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {text.PriceByDate.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <span
                style={{
                  color: "#828282",
                  textDecoration: "line-through",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                {text.PriceByHour.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <p
              style={{ color: "#828282", fontSize: "14px", fontWeight: "400" }}
            >
              {text.PriceNote}
            </p>
            <button
              style={{
                padding: "3px 21px",
                background: "#E22828",
                color: "#ffff",
                border: " 1px solid #E22828",
                borderRadius: " 8px",
              }}
            >
              Giảm 50%{" "}
            </button>
          </div>
        );
      },
    },
    {
      title: "Chọn phòng",
      key: "action",
      width: "17%",
      render: (text) => (
        <div style={{ textAlign: "center" }}>
          {roomSelect?.findIndex((item1) => item1.id === text.id) !== -1 ? (
            <button
              style={{
                padding: "15px 30px",
                background: "#E7E7E7",
                color: "#3F3F3F",
                border: " 1px solid transparent",
                borderRadius: " 8px",
              }}
              onClick={() => dispatch({ type: SET_SELECT_ROOM, data: text })}
            >
              Bỏ chọn
            </button>
          ) : (
            <button
              style={{
                padding: "15px 30px",
                background: "#fff",
                color: "#E22828",
                border: " 1px solid #E22828",
                borderRadius: " 8px",
              }}
              onClick={() => dispatch({ type: SET_SELECT_ROOM, data: text })}
            >
              Chọn
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{studioDetail?.Name}</title>
        <meta name="description" content={studioDetail?.Description}></meta>
        <meta
          property="og:url"
          itemprop="url"
          content={`${process.env.REACT_APP_DB_BASE_URL}${pathname}`}
        ></meta>
        <meta
          property="og:description"
          content={studioDetail?.Description}
        ></meta>
        <meta
          content={studioDetail?.Image?.slice(0, 1)}
          property="og:image"
          itemprop="thumbnailUrl"
        ></meta>
        <meta property="og:image:width" content="740"></meta>
        <meta property="og:image:height" content="555"></meta>
        <meta property="og:locale" content="vi_VN"></meta>
        <meta property="og:site_name" content="Booking Studio"></meta>
        <meta
          property="og:title"
          itemprop="name"
          content={studioDetail?.Name}
        ></meta>
      </Helmet>
      <div className={cx("wrapper")}>
        <div className={cx("studioDetail")}>
          <div className={cx("box1")}>
            <div className={cx("top")}>
              <div className={cx("title")}>
                <h3>{studioDetail?.Name} </h3>
                <CheckCircleOutlined
                  style={{ fontSize: "20px", color: "#03AC84" }}
                />
              </div>
              <div className={cx("icons")}>
                <HeartOutlined className={cx("item")} />
                <Popover
                  placement="bottomRight"
                  content={
                    <div
                      onClick={() => handleReport()}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <WarningOutlined style={{ fontSize: "20px" }} />
                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                          Báo cáo
                        </span>
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <MoreOutlined className={cx("item")} />
                </Popover>
              </div>
            </div>

            <div className={cx("address")}>
              <img src={images.address} alt="sa" />
              <span>{studioDetail?.Address}</span>
            </div>
            <div className={cx("rate")}>
              <Rate allowHalf value={5}></Rate>
              <span>5</span>
              <span className={cx("number-order")} style={{ fontSize: "15px" }}>
                60 đã đặt{" "}
              </span>
            </div>
            <div className={cx("container")}>
              {studioDetail?.Image?.slice(0, 5).map((item, index) => {
                return index !== 4 ? (
                  <div
                    key={index}
                    onClick={() =>
                      dispatch({
                        type: "SHOW_MODAL_LIST",
                        Component: <ModalImage data={studioDetail?.Image} />,
                        width: "1169px",
                      })
                    }
                    className={cx("item")}
                  >
                    <img alt="sa" src={`${item}`} />
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      dispatch({
                        type: SHOW_MODAL,
                        Component: <ModalImage data={studioDetail?.Image} />,
                        width: "1169px",
                      })
                    }
                    key={index}
                    className={cx("item")}
                  >
                    <img src={`${item}`} alt="as" />
                    <div className={cx("number")}>
                      {studioDetail?.Image.length - 5}+
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cx("box2")}>
            <div className={cx("left")}>
              <div className={cx("description")}>
                <h3>Mô tả</h3>
                <Content data={studioDetail?.Description} />
              </div>
              <div className={cx("sale")}>
                <h3>4 Mã khuyến mãi</h3>
                <div className={cx("listSale")}>
                  <span>GIẢM 50K</span>
                  <span>GIẢM 500K</span>
                </div>
              </div>
              <div className={cx("table")}>
                <Table
                  className={cx("table-ant")}
                  columns={columns}
                  dataSource={roomDetail ?? roomDetail}
                  pagination={{
                    defaultPageSize: 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["1", "5", "10"],
                    style: { marginTop: "16px!important" },
                    className: cx("paginate"),
                  }}
                />
              </div>

              <div className={cx("rating")}>
                <h3>Đánh giá</h3>
                <div className={cx("rate")}>
                  <Rate allowHalf value={5} style={{ fontSize: "10px" }}></Rate>
                  <span>5 ( 30 đánh giá)</span>
                </div>
                <div className={cx("listRates")}>
                  {/* <div className={cx("active")}>
                  <span>5</span>
                  <StarFilled style={{ color: "#F8D93A" }} />
                  <span>(24)</span>
                </div> */}
                  {values.reverse().map((item) => {
                    return (
                      <div
                        onClick={() => setActiveId(item.id)}
                        key={item.id}
                        className={cx(
                          `${activeId === item.id ? "active" : ""}`
                        )}
                      >
                        <span>{item.id}</span>
                        <StarFilled style={{ color: "#F8D93A" }} />
                        <span>(24)</span>
                      </div>
                    );
                  })}
                </div>
                <div className={cx("descriptionRate")}>
                  <div className={cx("info-user")}>
                    <img src={images.banner2} />
                    <div className={cx("info")}>
                      <h3>Mai Anh</h3>
                      <Rate allowHalf value={5}></Rate>
                    </div>
                  </div>
                  <div className={cx("description")}>
                    Studio rất đẹp, phục vụ nhiệt tình. Giá cả cũng hợp lý. Mình
                    và chồng đều hài lòng. Chỉ có điều vị trí hơi khó tìm một
                    chút, vì studio nằm trong hẻm khá sâu nên hơi khó tìm. Còn
                    lại mọi thứ đều ổn.
                  </div>
                  <p style={{ color: "#828282" }}>Phòng : Wisteria Premium </p>
                </div>
                <div className={cx("descriptionRate")}>
                  <div className={cx("info-user")}>
                    <img src={images.banner2} />
                    <div className={cx("info")}>
                      <h3>Mai Anh</h3>
                      <Rate allowHalf value={5}></Rate>
                    </div>
                  </div>
                  <div className={cx("description")}>
                    Studio rất đẹp, phục vụ nhiệt tình. Giá cả cũng hợp lý. Mình
                    và chồng đều hài lòng. Chỉ có điều vị trí hơi khó tìm một
                    chút, vì studio nằm trong hẻm khá sâu nên hơi khó tìm. Còn
                    lại mọi thứ đều ổn.
                  </div>
                  <div className={cx("listImages")}>
                    <div className={cx("item-video")}>
                      <img src={images.detail1} />
                      <PlayCircleOutlined className={cx("play")} />
                    </div>
                    <div className={cx("item-image")}>
                      <img src={images.detail1} />
                    </div>
                    <div className={cx("item-image")}>
                      <img src={images.detail1} />
                    </div>
                  </div>
                  <p style={{ color: "#828282" }}>Phòng : Wisteria Premium </p>
                </div>
                <div className={cx("pagination-ds")}>
                  <Pagination
                    className={cx("pagination-ds")}
                    defaultCurrent={1}
                    total={50}
                  />
                </div>
              </div>
            </div>
            <div className={cx("right")}>
              <div className={cx("map")}>
                <h3>Xem trên bản đồ</h3>
                <div className={cx("address")}>
                  <img src={images.address} alt="" />
                  <span>{studioDetail?.Address}</span>
                </div>
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      className="gmap_iframe"
                      width="100%"
                      frameBorder={0}
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={`https://www.google.com/maps?q=${studioDetail?.Latitude},${studioDetail?.Longtitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                    />
                    <a href="https://embedmapgenerator.com/">
                      embed google maps in website
                    </a>
                  </div>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".mapouter{position:relative;text-align:right;width:100%;height:255px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:255px;}.gmap_iframe {height:255px!important;}",
                    }}
                  />
                </div>
              </div>
              <div className={cx("order")}>
                <h3>Đã chọn 1 phòng</h3>
                <div className={cx("item")}>
                  <span>Giá gốc</span>
                  <span
                    style={{
                      textDecoration: "line-through",
                      fontSize: " 16px",
                      color: "#828282",
                    }}
                  >
                    1.800.000đ
                  </span>
                </div>
                <div className={cx("item")}>
                  <span>Bao gồm 50.000đ thuế và phí </span>
                  <span
                    style={{
                      color: "#E22828",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    1.500.000đ{" "}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <button
                    style={{
                      flex: "2.5",
                      padding: "14px 36px",
                      background: "#E7E7E7",
                      borderRadius: "8px",
                      border: 0,
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    style={{
                      flex: "1",
                      padding: "14px 36px",
                      background: "#E22828",
                      borderRadius: "8px",
                      color: "#fff",
                      border: 0,
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                  >
                    Đặt ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
          <SlideCard
            data={
              studioPostList ?? studioPostList.filter((item) => item.id !== id)
            }
            title="Studio tương tự"
          />
          <SlideCard data={studioNear ?? studioNear} title="Gần bạn" />
          <SlideCard data={[1, 2, 3, 4, 5, 6, 7]} title="Bạn vừa mới xem" />
        </div>
      </div>
    </>
  );
};
