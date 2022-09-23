import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./slideAlbum.scss";

import modelImg from "../../../../assets/images/modelImg.png";

const Index = ({ title, style = {}, className = "" }) => {
  return (
    <>
      <div className={`list_item_album ${className}`} style={{ ...style }}>
        <div className="title">{title}</div>
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
            className="swiper_album"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <img src={modelImg} style={{ height: "100%" }} alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Index;
