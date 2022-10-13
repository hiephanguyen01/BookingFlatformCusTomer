import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Popover } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import {
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

import "./postDetail.scss";
import "swiper/css";
import "swiper/css/navigation";

import { convertImage } from "../../utils/convertImage";
import imgSwiper1 from "../../assets/dao/Frame 163.jpg";
import img1 from "../../assets/dao/Frame 180.png";
import { ReactComponent as Comments } from "../../assets/dao/comments.svg";
import {
  getPostDaoByIdAction,
  likePost,
} from "../../stores/actions/PostDaoAction";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import ReportPost from "../../components/ReportPostDao";
import { convertTime } from "../../utils/convert";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const { postDetail, likePostList } = useSelector(
    (state) => state.postDaoReducer
  );
  const [mouseOverHeart, setMouseOverHeart] = useState(false);
  const [mouseClickHeart, setMouseClickHeart] = useState(false);
  const [isModalOptionDetail, setIsModalOptionDetail] = useState(false);
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);
  const [commentsClick, setCommentsClick] = useState(false);

  console.log(postDetail);
  useEffect(() => {
    dispatch(getPostDaoByIdAction(postId));
    
    return () => {
      dispatch({ type: "DELETE_DETAIL_POST", data: {} });
    };
  }, []);

  const checkLikePost = () =>
    likePostList?.filter((itm) => itm.PostId === postId).length > 0;

  //   const moreOptionOnEachPost = [
  //     { icon: <Info />, title: "Báo cáo bài viết", id: 1 },
  //     { icon: <Bell />, title: "Bật thông báo về bài viết này ", id: 2 },
  //     { icon: <LinkCopy />, title: "Sao chép liên kết", id: 3 },
  //     {
  //       icon: <PostSave />,
  //       title: type === "post" ? "Lưu bài viết" : "Hủy lưu",
  //       id: 4,
  //     },
  //   ];
  return (
    <div className="postDetail">
      <MetaDecorator
        // title={`${postDetail?.Tags?.split(",").join(" - ").toUpperCase()}`}
        title={`${postDetail.Fullname} - ${postDetail?.Tags?.split(",")
          .join(",")
          .toUpperCase()}`}
        description={postDetail.Description}
        imgUrl={
          REACT_APP_DB_BASE_URL_IMG + `/${postDetail?.Image?.slice(0, 1)}`
        }
      />
      <Row>
        <Col span={16} style={{ backgroundColor: "#1D2226", height: "100%" }}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            // pagination={{
            //   clickable: true,
            // }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="swiperPostDetail"
          >
            {postDetail?.Image?.map((img, index) => (
              <SwiperSlide
                key={index}
                style={{ background: "#1D2226", padding: "90px 0" }}
              >
                <img
                  src={convertImage(img)}
                  className="w-100 h-100"
                  style={{ objectFit: "contain" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col span={8} className="px-23 py-30 col-right">
          <header className="post__main__info d-flex justify-content-between align-posts-center">
            <div className="d-flex justify-content-between align-posts-center">
              <img src={convertImage(postDetail?.Avatar)} alt="" />
              <div className="post__main__info__nametime">
                <p className="post__main__info__nametime__name">
                  {postDetail?.Fullname}
                </p>
                <p>{convertTime(postDetail?.CreationTime)}</p>
              </div>
            </div>
            <div>
              <Popover
                placement="leftTop"
                content={
                  <div className="more-option-modal">
                    {/* {moreOptionOnEachPost.map((itm, idx) => (
                      <li onClick={handleMoreOptionClick} key={idx}>
                        <div className="container d-flex">
                          <div>{itm.icon}</div>
                          <p>{itm.title}</p>
                        </div>
                      </li>
                    ))} */}
                  </div>
                }
                trigger="click"
                visible={isModalOptionDetail}
                onVisibleChange={(newVisible) =>
                  setIsModalOptionDetail(newVisible)
                }
              >
                <MoreOutlined style={{ fontSize: "24px" }} />
              </Popover>
              <ReportPost
                isReportPostModalVisible={isReportPostModalVisible}
                setIsReportPostModalVisible={setIsReportPostModalVisible}
              />
            </div>
          </header>
          <div className="post__main__content__tags d-flex align-posts-center">
            {postDetail?.Tags?.split(",").map((post, idx) => (
              <li key={idx}>#{post}</li>
            ))}
          </div>
          <div className="post__main__content__description">
            <p>{postDetail?.Description}</p>
          </div>
          <div
            className="post__main__content__like-comment d-flex align-posts-center pb-17 mb-25"
            style={{ borderBottom: "1px solid #E7E7E7" }}
          >
            <div className="post__main__content__like-comment__likes d-flex">
              <PopUpSignIn
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {mouseOverHeart || checkLikePost() || mouseClickHeart ? (
                  <HeartFilled
                    onClick={likePost}
                    style={{
                      fontSize: "20px",
                      color: "#E22828",
                      marginBottom: "2px",
                    }}
                    onMouseLeave={() => setMouseOverHeart(false)}
                  />
                ) : (
                  <HeartOutlined
                    style={{
                      color: "#828282",
                      fontSize: "20px",
                      cursor: "pointer",
                      marginBottom: "2px",
                    }}
                    onMouseOver={() => setMouseOverHeart(true)}
                  />
                )}
              </PopUpSignIn>

              <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                {postDetail?.TotalLikes}
              </p>
            </div>
            <div className="post__main__content__like-comment__comments d-flex">
              <PopUpSignIn
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Comments className="active" style={{ color: "#E22828" }} />
              </PopUpSignIn>
              <p className={`${commentsClick ? "active" : ""}`}>
                {postDetail?.TotalComments}
              </p>
            </div>
          </div>
          <section className="post__middle">
            <div className="d-flex">
              <img src={img1} alt="" />
              <div className="post__middle__right-side">
                <ul className="d-flex align-posts-center">
                  <li>Bên mình có nhé</li>
                  <li>Vào trang mình xem thử nhé</li>
                  <li>Bên mình đang khuyến mãi luôn ạ</li>
                </ul>
                <div className="post__middle__right-side__choose-service d-flex justify-content-center align-posts-center">
                  <PlusOutlined
                    style={{ color: "#03AC84", fontSize: "14px" }}
                  />
                  <p>Chọn dịch vụ liên quan</p>
                </div>
              </div>
            </div>
          </section>
          <div className="comment_post">
            <header className="post__main__info d-flex justify-content-between align-posts-center mt-18">
              <div className="d-flex justify-content-between align-posts-center">
                <img src={convertImage(postDetail?.Avatar)} alt="" />
                <div className="post__main__info__nametime">
                  <p className="post__main__info__nametime__name">
                    {postDetail?.Fullname}
                  </p>
                  <p>2 giờ</p>
                </div>
              </div>
            </header>
            <div className="post_slider_container">
              <Swiper
                slidesPerView={"1.4"}
                spaceBetween={15}
                // pagination={{
                //   clickable: true,
                // }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="post_slider"
              >
                {[0, 1, 2].map((item) => (
                  <SwiperSlide key={item} className="post_slider_item">
                    <a href="#" className="h-100">
                      <div className="d-flex h-100">
                        <img
                          src={imgSwiper1}
                          className="me-12"
                          style={{ width: "100px", objectFit: "cover" }}
                        />
                        <div className="py-5 ">
                          <div className="post_slider_item_name mb-5">
                            BOOKINGSTUDIO.VN
                          </div>
                          <div className="post_slider_item_description">
                            Studio Wisteria chuyên cung cấp dịch vụ chụp hình
                            cưới...
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="post__main__content__like-comment d-flex align-posts-center pb-17 mb-25"
              style={{ borderBottom: "1px solid #E7E7E7" }}
            >
              <div
                className="post__main__content__like-comment__likes d-flex"
                onClick={() => console.log(123)}
              >
                <PopUpSignIn
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {mouseOverHeart || mouseClickHeart ? (
                    <HeartFilled
                      onClick={() => setMouseClickHeart(!mouseClickHeart)}
                      style={{
                        fontSize: "20px",
                        color: "#E22828",
                        marginBottom: "2px",
                      }}
                      onMouseLeave={() => setMouseOverHeart(false)}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "#828282",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginBottom: "2px",
                      }}
                      onMouseOver={() => setMouseOverHeart(true)}
                    />
                  )}
                </PopUpSignIn>
                <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                  {postDetail?.TotalLikes}
                </p>
              </div>
            </div>
          </div>
          <div className="comment_post">
            <header className="post__main__info d-flex justify-content-between align-posts-center mt-18">
              <div className="d-flex justify-content-between align-posts-center">
                <img src={convertImage(postDetail?.Avatar)} alt="" />
                <div className="post__main__info__nametime">
                  <p className="post__main__info__nametime__name">
                    {postDetail?.Fullname}
                  </p>
                  <p>2 giờ</p>
                </div>
              </div>
            </header>
            <div className="post_slider_container">
              <Swiper
                slidesPerView={"1.4"}
                spaceBetween={15}
                // pagination={{
                //   clickable: true,
                // }}
                navigation={true}
                modules={[Navigation, Pagination]}
                className="post_slider"
              >
                {[0, 1, 2].map((item) => (
                  <SwiperSlide key={item} className="post_slider_post">
                    <a href="#">
                      <div className="d-flex h-100">
                        <img
                          src={imgSwiper1}
                          className="h-100 me-12"
                          style={{ objectFit: "contain" }}
                        />
                        <div className="py-3">
                          <div className="post_slider_post_name mb-5">
                            BOOKINGSTUDIO.VN
                          </div>
                          <div className="post_slider_post_description">
                            Studio Wisteria chuyên cung cấp dịch vụ chụp hình
                            cưới chuyên...
                          </div>
                        </div>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className="post__main__content__like-comment d-flex align-posts-center pb-17 mb-25"
              style={{ borderBottom: "1px solid #E7E7E7" }}
            >
              <div className="post__main__content__like-comment__likes d-flex">
                <PopUpSignIn
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {mouseOverHeart || mouseClickHeart ? (
                    <HeartFilled
                      onClick={() => {
                        setMouseClickHeart(!mouseClickHeart);
                      }}
                      style={{
                        fontSize: "20px",
                        color: "#E22828",
                        marginBottom: "2px",
                      }}
                      onMouseLeave={() => setMouseOverHeart(false)}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "#828282",
                        fontSize: "20px",
                        cursor: "pointer",
                        marginBottom: "2px",
                      }}
                      onMouseOver={() => setMouseOverHeart(true)}
                    />
                  )}
                </PopUpSignIn>
                <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                  {postDetail?.TotalLikes}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PostDetail;
