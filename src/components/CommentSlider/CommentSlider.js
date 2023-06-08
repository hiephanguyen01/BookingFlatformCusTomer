import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "./commentSlider.scss";
import "swiper/css";
import "swiper/css/navigation";
import { convertImage } from "../../utils/convertImage";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const CommentSlider = ({
  data = [],
  slidesPerView = 2.5,
  handleUpdateComment = () => {},
  id,
  PostId,
  BookingUserId,
}) => {
  const currentUser = useSelector(
    (state) => state.authenticateReducer.currentUser
  );
  const convertCategory = (category) => {
    switch (category) {
      case 1:
        return "studio";
      case 2:
        return "photographer";
      case 3:
        return "clothes";
      case 4:
        return "makeup";
      case 5:
        return "device";
      case 6:
        return "model";
      default:
        break;
    }
  };

  return (
    <div className="post_slider_container">
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={15}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="post_slider"
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
        }}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index} className="post_slider_item w-100">
            {currentUser?.id === BookingUserId && (
              <CloseCircleOutlined
                className="icon-close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateComment({
                    serviceId: item?.id,
                    PostId,
                    category: item?.category,
                    id,
                  });
                }}
              />
            )}
            <a
              href={`${window.location.origin}/home/${convertCategory(
                item.category
              )}/${item.id}`}
              className="h-100 w-100 wrapper"
            >
              <div className="d-flex h-100">
                <img
                  src={convertImage(item.Image[0])}
                  alt=""
                  className="me-12"
                  style={{
                    minWidth: "100px",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="py-5 ">
                  <div className="post_slider_item_name mb-5">{item.Name}</div>
                  <div className="post_slider_item_description">
                    {item.Description}
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommentSlider;
