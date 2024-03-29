import React, { memo, useEffect, useState } from "react";
import "./ModalImage.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper";
import { HIDE_MODAL } from "../../stores/types/modalTypes";
import { convertImage } from "../../utils/convertImage";
import { Grid } from "antd";
const { useBreakpoint } = Grid;
const ModalImage = ({
  title = "",
  data,
  setOpenModal = () => {},
  index = 0,
}) => {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [swiper, setSwiper] = useState(null);
  console.log(swiper);
  useEffect(() => {
    const keydownHandler = (e) => {
      if (swiper && e.keyCode == 39) {
        e.preventDefault();
        swiper.slideNext();
      } else if (swiper && e.keyCode == 37) {
        e.preventDefault();
        swiper.slidePrev();
      }
    };

    document.addEventListener("keydown", keydownHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, [swiper]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <h3>{title}</h3>
      <div onClick={() => setOpenModal(false)} className={"close"}>
        <CloseOutlined
          style={{ fontSize: "22px" }}
          onClick={() => dispatch({ type: HIDE_MODAL })}
        />
      </div>
      {screens?.xs ? (
        <></>
      ) : (
        <>
          <div style={{ marginTop: "20px" }}>
            <Swiper
              onSwiper={setSwiper}
              initialSlide={index}
              style={{
                width: "758px",
                height: "448px",
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              pagination={{
                type: "fraction",
              }}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Pagination, Thumbs]}
              className="swiperModalImg"
            >
              {data?.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <img src={convertImage(item)} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div
            style={{
              width: "100%",
              height: "108px",
              paddingRight: "40px",
              paddingLeft: "40px",
              marginTop: "30px",
            }}
          >
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiperThumb"
              // onActiveIndexChange={()}
            >
              {data?.map((item, idx) => {
                return (
                  <SwiperSlide
                    key={idx}
                    className="slide-item"
                    style={{ width: "187px", height: "108px" }}
                  >
                    <img
                      style={{
                        width: "187px",
                        height: "108px",
                        objectFit: "cover",
                      }}
                      src={convertImage(item)}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ModalImage);
