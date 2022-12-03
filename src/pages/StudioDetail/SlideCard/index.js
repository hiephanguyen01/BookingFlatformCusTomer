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
import { Navigation, Autoplay } from "swiper";
import { useEffect, useState } from "react";
import CarSkeleton from "../../../components/Skeleton/CarSkeleton";
const cx = classNames.bind(styles);

export const SlideCard = ({ title, data, category }) => {
  // const [fakeLoading, setFakeLoading] = useState(true);

  // useEffect(() => {
  //   const a = setTimeout(() => {
  //     setFakeLoading(false);
  //   }, 3000);

  //   return () => {
  //     clearTimeout(a);
  //   };
  // }, [data]);

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
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 3500,
              // disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Autoplay]}
          >
            {data?.length <= 0
              ? Array(5)
                  .fill(0)
                  .map((val, idx) => (
                    <>
                      <SwiperSlide key={idx}>
                        <CarSkeleton />
                      </SwiperSlide>
                    </>
                  ))
              : data.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <Card category={category} value={item} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};
