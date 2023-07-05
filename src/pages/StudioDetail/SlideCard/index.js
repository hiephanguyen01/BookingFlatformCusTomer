import "./styles.scss";
import { Card } from "../../../components/Card";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.scss";

// import required modules
import { Navigation, Autoplay } from "swiper";
import CarSkeleton from "../../../components/Skeleton/CarSkeleton";
import { memo } from "react";

const SlideCard = ({ title, data, category, loading = false }) => {
  return (
    <>
      <div className={"ListItem"}>
        <div className={"title"}>
          <h3>{title}</h3>
        </div>
        <div className="wrap-slide" key={title}>
          <Swiper
            key={title}
            className="slideDetail"
            slidesPerView={1}
            spaceBetween={8}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 3500,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              560: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              740: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              860: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1050: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1250: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation, Autoplay]}>
            {data?.length <= 0
              ? Array(5)
                  .fill(0)
                  .map((val, idx) => (
                    <SwiperSlide key={idx}>
                      <CarSkeleton />
                    </SwiperSlide>
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

export default memo(SlideCard);
