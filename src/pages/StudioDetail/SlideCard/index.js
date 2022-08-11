import React from "react";
import classNames from "classnames/bind";
import styles from "../../Home/ListCard/ListCard.module.scss";
import "./styles.scss";
import { Card } from "../../../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { Navigation } from "swiper";
const cx = classNames.bind(styles);

export const SlideCard = ({ title }) => {
  return (
    <>
      <div className={cx("ListItem")}>
        <div className={cx("title")}>
          <h3>{title}</h3>
        </div>
        <div>
          <Swiper
            className="slideDetail"
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
          >
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
