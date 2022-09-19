import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./slideAlbum.scss";
import { REACT_APP_DB_BASE_URL_IMG } from "../../../../utils/REACT_APP_DB_BASE_URL_IMG";

const Index = ({ data, style = {}, className = "" }) => {
  return (
    <>
      <div className={`list_item_album ${className}`} style={{ ...style }}>
        <div className="title">{data?.Name}</div>
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
                <SwiperSlide key={idx}>
                  <img
                    src={`${
                      item.includes("https://drive.google.com/")
                        ? item
                        : REACT_APP_DB_BASE_URL_IMG + "/" + item
                    }`}
                    style={{ height: "100%" }}
                  />
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
