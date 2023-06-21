import React, { memo } from "react";
import { Autoplay, Lazy, Navigation, Pagination, Parallax } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerSkeleton from "../../../../components/Skeleton/BannerSkeleton";
import { convertImage } from "../../../../utils/convertImage";
import "./banner.scss";
import { Col, Grid, Row } from "antd";
const { useBreakpoint } = Grid;
const Banner = ({ banners }) => {
  const screens = useBreakpoint();
  return (
    <div className={`${screens.xs ? "Banner mobile" : "Banner"}`}>
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
                  <SwiperSlide key={banner.id} className="w-100">
                    <a href={banner.Description} className="h-100 w-100">
                      <Row
                        // data-swiper-parallax="-300"
                        className="banner h-100 w-100"
                        justify={"space-between"}
                      >
                        {banner.Image.map((item) => (
                          <Col
                            span={banner.Image.length > 1 ? 12 : 24}
                            className="w-100 h-100"
                          >
                            <img
                              // data-swiper-parallax="-300"
                              slot="container-start"
                              src={convertImage(item)}
                              alt={banner.id}
                              className={`bg swiper-lazy w-100 h-100`}
                            />
                          </Col>
                        ))}

                        {/* <div
                          className="contentBanner"
                          data-swiper-parallax="-200"
                        >
                          <h1 className="" data-swiper-parallax="-200">
                            {banner.name}
                          </h1>
                          <p data-swiper-parallax="w-100">
                            {banner.description}
                          </p>
                        </div> */}
                      </Row>
                      {/* <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div> */}
                    </a>
                  </SwiperSlide>
                )
            )}
        </Swiper>
      )}
    </div>
  );
};

export default memo(Banner);
