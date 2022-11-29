import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "../Card";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./slideCard.scss";

// import required modules
import { Navigation } from "swiper";

const Index = ({ title, style = {}, className = "" }) => {
  return (
    <>
      <div className={`listItem ${className}`} style={{ ...style }}>
        <div className="title">
          <h3>{title}</h3>
        </div>
        <div>
          <Swiper
            slidesPerView={1}
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
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation]}
            className="swiper_card">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <Card />
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
