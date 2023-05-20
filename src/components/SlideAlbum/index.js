import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./slideAlbum.scss";
import { convertImage } from "../../utils/convertImage";
import { ModalImage } from "../../components/ModalImg";
import { studioPostService } from "../../services/StudioPostService";
import { useLocation, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../utils/category";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Grid } from "antd";
const { useBreakpoint } = Grid;
const Index = ({ data, style = {}, className = "" }) => {
  const screens = useBreakpoint();
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { pathname } = useLocation();
  const onClickShowModal = async (data) => {
    dispatch({
      type: "SHOW_MODAL_LIST",
      Component: <ModalImage title={data.Name} data={data?.Image} />,
    });
    await studioPostService.updateView({
      Id: data.id,
      Category: CATEGORIES.filter((item) => pathname.includes(item.linkTo))[0]
        .id,
    });
  };
  return (
    <>
      <div className={`list_item_album ${className}`} style={{ ...style }}>
        <div className="title">
          {data?.Name} (
          {data?.View > 1 ? data?.View + " views" : data?.View + " view"})
        </div>
        <div>
          <Swiper
            slidesPerView={4}
            spaceBetween={8}
            pagination={{
              clickable: true,
            }}
            autoplay={true}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation]}
            className="swiperMakeup"
          >
            {data?.Image?.map((item, idx) => {
              return (
                <SwiperSlide
                  key={idx}
                  onClick={() =>
                    screens?.xs ? setOpenModal(true) : onClickShowModal(data)
                  }
                >
                  <img
                    src={convertImage(item)}
                    style={{ height: "100%" }}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {openModal && (
        <div className="modal-view-album">
          <div className="nav-back">
            <ArrowLeftOutlined
              style={{ fontSize: "16px" }}
              onClick={() => {
                setOpenModal(false);
                setSlideIndex(1);
              }}
            />
            <div className="ms-10" style={{ fontSize: "16px" }}>
              {slideIndex}/{data?.Image?.length}
            </div>
          </div>
          <Swiper onSlideChange={(e) => setSlideIndex(e.activeIndex + 1)}>
            {data?.Image?.map((item, idx) => {
              return (
                <SwiperSlide key={idx} onClick={() => {}}>
                  <img
                    src={convertImage(item)}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Index;
