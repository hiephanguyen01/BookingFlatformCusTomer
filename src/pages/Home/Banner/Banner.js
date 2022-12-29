import React, { useEffect, useState } from "react";
import { Autoplay, Lazy, Navigation, Pagination, Parallax } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerSkeleton from "../../../components/Skeleton/BannerSkeleton";
import { convertImage } from "../../../utils/convertImage";
import { REACT_APP_DB_BASE_URL_IMG } from "../../../utils/REACT_APP_DB_BASE_URL_IMG";
import "./banner.scss";
const Banner = ({ banners }) => {
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const a = setTimeout(() => {
      setFakeLoading(false);
    }, 3000);

    return () => {
      clearTimeout(a);
    };
  }, [banners]);
  return (
    <div className="Banner">
      {banners.length <= 0 ? (
        <BannerSkeleton />
      ) : (
        <Swiper
          pagination={{ clickable: true }}
          autoplay={true}
          loop={true}
          lazy={true}
          speed={600}
          modules={[Navigation, Pagination, Autoplay, Lazy, Parallax]}
          className="bannerSwiper"
        >
          {banners &&
            banners.map(
              (banner) =>
                banner.IsVisible && (
                  <SwiperSlide key={banner.id}>
                    <a href={banner.Description}>
                      <div data-swiper-parallax="-300" className="banner">
                        <img
                          data-swiper-parallax="-300"
                          slot="container-start"
                          src={convertImage(banner.Image)}
                          alt={banner.id}
                          className="bg swiper-lazy"
                        />
                        <div
                          className="contentBanner"
                          data-swiper-parallax="-200"
                        >
                          <h1 className="" data-swiper-parallax="-200">
                            {banner.name}
                          </h1>
                          <p data-swiper-parallax="-100">
                            {banner.description}
                          </p>
                        </div>
                      </div>
                      <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                    </a>
                  </SwiperSlide>
                )
            )}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;
