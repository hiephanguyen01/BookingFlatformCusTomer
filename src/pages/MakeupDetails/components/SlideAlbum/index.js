import React from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "./slideAlbum.scss";
import { convertImage } from "../../../../utils/convertImage";
import { ModalImage } from "../../../../components/ModalImg";

const Index = ({ data, style = {}, className = "" }) => {
  const dispatch = useDispatch();
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
                <SwiperSlide
                  key={idx}
                  onClick={() =>
                    dispatch({
                      type: "SHOW_MODAL_LIST",
                      Component: (
                        <ModalImage title={data.Name} data={data?.Image} />
                      ),
                    })
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
    </>
  );
};

export default Index;
