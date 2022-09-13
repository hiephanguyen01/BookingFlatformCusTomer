import {
  MoreOutlined,
  HeartFilled,
  HeartOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Col, Row, Popover, Modal, Carousel } from "antd";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./daoPost.scss";
import "swiper/css";
import "swiper/css/navigation";
import { ReactComponent as Info } from "../../assets/dao/info.svg";
import { ReactComponent as Comments } from "../../assets/dao/comments.svg";
import { ReactComponent as Bell } from "../../assets/dao/bell.svg";
import { ReactComponent as LinkCopy } from "../../assets/dao/copy.svg";
import { ReactComponent as PostSave } from "../../assets/dao/copypost.svg";
import img1 from "../../assets/dao/Frame 180.png";
import imgSwiper1 from "../../assets/dao/Frame 163.jpg";
import imgSwiper2 from "../../assets/dao/Frame 164.jpg";
import ReportPost from "../ReportPostDao";
import { useDispatch } from "react-redux";
import { likePost } from "../../stores/actions/PostDaoAction";
import { convertTime } from "../../utils/convert";

const moreOptionOnEachPost = [
  { icon: <Info />, title: "Báo cáo bài viết" },
  { icon: <Bell />, title: "Bật thông báo về bài viết này " },
  { icon: <LinkCopy />, title: "Sao chép liên kết" },
  { icon: <PostSave />, title: "Lưu bài viết" },
];

const DaoPost = (props) => {
  const dispatch = useDispatch();
  const [mouseOverHeart, setMouseOverHeart] = useState(false);
  const [mouseClickHeart, setMouseClickHeart] = useState(false);
  const [commentsClick, setCommentsClick] = useState(false);
  const [moreOptionModal, setMoreOptionModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);
  const [imageInModal, setImageInModal] = useState("");

  const { item } = props;
  const {
    Id,
    Username,
    Description,
    Avatar,
    TotalLikes,
    Tags,
    TotalComments,
    Image,
    // comments,
    CreationTime,
  } = item;

  const handleImageModal = (url) => {
    setImageInModal(url);
    setIsModalVisible(true);
    setIsModalVisibleDetail(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkDetail = () => {
    setIsModalVisible(false);
  };

  const handleCancelDetail = () => {
    setIsModalVisibleDetail(false);
  };

  const handleMoreOptionClick = () => {
    setIsModalVisible(false);
    setIsReportPostModalVisible(true);
  };

  const handleLike = () => {
    console.log(Id);
    dispatch(likePost(2, Id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
    setMouseClickHeart(!mouseClickHeart);
  };

  let ImageSection = null;
  let tempCount = Image.length;
  // Object.entries(item).forEach((item2, idx) => {
  //   if (item2[0].includes("Image")) tempCount++;
  // });
  if (tempCount < 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((item, idx) => (
          <Col
            key={idx}
            md={tempCount === 1 ? 24 : 12}
            xs={24}
            onClick={() => handleImageModal(item)}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={item}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount === 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((item, idx) => {
          // console.log(idx);
          if (idx === 0) {
            //Kiểm tra cái idx này sau khi nhét API vào (Không xóa)
            return (
              <Col
                key={idx}
                md={24}
                xs={24}
                onClick={() => handleImageModal(item)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={item}
                  alt=""
                />
              </Col>
            );
          } else {
            // console.log(idx);
            return (
              <Col
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(item)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={item}
                  alt=""
                />
              </Col>
            );
          }
        })}
      </Row>
    );
  } else if (tempCount === 4) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((item, idx) => (
          <Col key={idx} md={12} xs={24} onClick={() => handleImageModal(item)}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={item}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount > 4) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((item, idx) => {
          if (idx < 4) {
            //Again, có lý do mà nó là 9 :v đừng xóa comment này
            return (
              <Col
                className="greater-than-four-images-section"
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(item)}
              >
                <div className="image-container">
                  {idx === 8 && (
                    <div className="fourth-image-overlay d-flex justify-content-center align-items-center">
                      <h1>{tempCount - 3}</h1>
                      <PlusOutlined
                        style={{ fontSize: "34px", color: "#fff" }}
                      />
                    </div>
                  )}
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                    key={idx}
                    src={item}
                    alt=""
                  />
                </div>
              </Col>
            );
          }
        })}
      </Row>
    );
  }

  return (
    <article className="post">
      <section className="post__main d-flex flex-column">
        <header className="post__main__info d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <img src={`http://localhost:3003/api/image/${Avatar}`} alt="" />
            <div className="post__main__info__nametime">
              <p className="post__main__info__nametime__name">{Username}</p>
              <p>{convertTime(CreationTime)}</p>
            </div>
          </div>
          <div>
            <Popover
              placement="leftTop"
              content={
                <div className="more-option-modal">
                  {moreOptionOnEachPost.map((item, idx) => (
                    <li onClick={handleMoreOptionClick} key={idx}>
                      <div className="container d-flex">
                        <div>{item.icon}</div>
                        <p>{item.title}</p>
                      </div>
                    </li>
                  ))}
                </div>
              }
              trigger="click"
              visible={moreOptionModal}
              onVisibleChange={(newVisible) => setMoreOptionModal(newVisible)}
            >
              <MoreOutlined style={{ fontSize: "24px" }} />
            </Popover>
            <ReportPost
              isReportPostModalVisible={isReportPostModalVisible}
              setIsReportPostModalVisible={setIsReportPostModalVisible}
            />
          </div>
        </header>
        <div className="post__main__content">
          <div className="post__main__content__tags d-flex align-items-center">
            {Tags?.split(",").map((item, idx) => (
              <li key={idx}>#{item}</li>
            ))}
          </div>
          <div className="post__main__content__description">
            <p>{Description}</p>
          </div>
          <div className="post__main__content__images">
            {/* //Post Image đang xử lý */}
            {ImageSection}
            <Modal
              className="popup d-flex justify-content-center align-items-center post_detail"
              closeIcon={<CloseOutlined />}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
              footer={[]}
              visible={isModalVisibleDetail}
              bodyStyle={{
                backgroundColor: "transparent",
              }}
            >
              <Row>
                <Col
                  span={16}
                  style={{ backgroundColor: "#1D2226", height: "100%" }}
                >
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
                    {Image.map((img, index) => (
                      <SwiperSlide
                        key={index}
                        style={{ background: "#1D2226", padding: "90px 0" }}
                      >
                        <img
                          src={img}
                          className="w-100 h-100"
                          style={{ objectFit: "contain" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
                <Col
                  span={8}
                  className="px-23 py-30"
                  style={{
                    overflowY: "scroll",
                    position: "relative",
                    height: "100vh",
                  }}
                >
                  <header className="post__main__info d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        src={`${process.env.REACT_APP_DB_BASE_URL_IMG}/${Avatar}`}
                        alt=""
                      />
                      <div className="post__main__info__nametime">
                        <p className="post__main__info__nametime__name">
                          {Username}
                        </p>
                        <p>{CreationTime}</p>
                      </div>
                    </div>
                    <div>
                      <Popover
                        placement="leftTop"
                        content={
                          <div className="more-option-modal">
                            {moreOptionOnEachPost.map((item, idx) => (
                              <li onClick={handleMoreOptionClick} key={idx}>
                                <div className="container d-flex">
                                  <div>{item.icon}</div>
                                  <p>{item.title}</p>
                                </div>
                              </li>
                            ))}
                          </div>
                        }
                        trigger="click"
                        visible={moreOptionModal}
                        onVisibleChange={(newVisible) =>
                          setMoreOptionModal(newVisible)
                        }
                      >
                        <MoreOutlined style={{ fontSize: "24px" }} />
                      </Popover>
                      <ReportPost
                        isReportPostModalVisible={isReportPostModalVisible}
                        setIsReportPostModalVisible={
                          setIsReportPostModalVisible
                        }
                      />
                    </div>
                  </header>
                  <div className="post__main__content__tags d-flex align-items-center">
                    {Tags?.split(",").map((item, idx) => (
                      <li key={idx}>#{item}</li>
                    ))}
                  </div>
                  <div className="post__main__content__description">
                    <p>{Description}</p>
                  </div>
                  <div
                    className="post__main__content__like-comment d-flex align-items-center pb-17 mb-25"
                    style={{ borderBottom: "1px solid #E7E7E7" }}
                  >
                    <div className="post__main__content__like-comment__likes d-flex">
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
                      <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                        {TotalLikes}
                      </p>
                    </div>
                    <div className="post__main__content__like-comment__comments d-flex">
                      <Comments
                        onClick={() => setCommentsClick(!commentsClick)}
                      />
                      <p>{TotalComments}</p>
                    </div>
                  </div>
                  <section className="post__middle">
                    <div className="d-flex">
                      <img src={img1} alt="" />
                      <div className="post__middle__right-side">
                        <ul className="d-flex align-items-center">
                          <li>Bên mình có nhé</li>
                          <li>Vào trang mình xem thử nhé</li>
                          <li>Bên mình đang khuyến mãi luôn ạ</li>
                        </ul>
                        <div className="post__middle__right-side__choose-service d-flex justify-content-center align-items-center">
                          <PlusOutlined
                            style={{ color: "#03AC84", fontSize: "14px" }}
                          />
                          <p>Chọn dịch vụ liên quan</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="comment_item">
                    <header className="post__main__info d-flex justify-content-between align-items-center mt-18">
                      <div className="d-flex justify-content-between align-items-center">
                        <img
                          src={`${process.env.REACT_APP_DB_BASE_URL_IMG}/${Avatar}`}
                          alt=""
                        />
                        <div className="post__main__info__nametime">
                          <p className="post__main__info__nametime__name">
                            {Username}
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
                        <SwiperSlide className="post_slider_item">
                          <a href="#">
                            <div className="d-flex h-100">
                              <img
                                src={imgSwiper1}
                                className="h-100 me-12"
                                style={{ objectFit: "contain" }}
                              />
                              <div className="py-3">
                                <div className="post_slider_item_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_item_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="post_slider_item">
                          <a href="#">
                            <div className="d-flex h-100">
                              <img
                                src={imgSwiper1}
                                className="h-100 me-12"
                                style={{ objectFit: "contain" }}
                              />
                              <div className="py-3">
                                <div className="post_slider_item_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_item_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="post_slider_item">
                          <a href="#">
                            <div className="d-flex h-100">
                              <img
                                src={imgSwiper1}
                                className="h-100 me-12"
                                style={{ objectFit: "contain" }}
                              />
                              <div className="py-3">
                                <div className="post_slider_item_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_item_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <div
                      className="post__main__content__like-comment d-flex align-items-center pb-17 mb-25"
                      style={{ borderBottom: "1px solid #E7E7E7" }}
                    >
                      <div className="post__main__content__like-comment__likes d-flex">
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
                        <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                          {TotalLikes}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="comment_item">
                    <header className="post__main__info d-flex justify-content-between align-items-center mt-18">
                      <div className="d-flex justify-content-between align-items-center">
                        <img
                          src={`${process.env.REACT_APP_DB_BASE_URL_IMG}/${Avatar}`}
                          alt=""
                        />
                        <div className="post__main__info__nametime">
                          <p className="post__main__info__nametime__name">
                            {Username}
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
                        <SwiperSlide className="post_slider_item">
                          <a href="#">
                            <div className="d-flex h-100">
                              <img
                                src={imgSwiper1}
                                className="h-100 me-12"
                                style={{ objectFit: "contain" }}
                              />
                              <div className="py-3">
                                <div className="post_slider_item_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_item_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="post_slider_item">
                          <a href="#">
                            <div className="d-flex h-100">
                              <img
                                src={imgSwiper1}
                                className="h-100 me-12"
                                style={{ objectFit: "contain" }}
                              />
                              <div className="py-3">
                                <div className="post_slider_item_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_item_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="post_slider_item">
                          <a href="#">
                            <div className="d-flex h-100">
                              <img
                                src={imgSwiper1}
                                className="h-100 me-12"
                                style={{ objectFit: "contain" }}
                              />
                              <div className="py-3">
                                <div className="post_slider_item_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_item_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                    <div
                      className="post__main__content__like-comment d-flex align-items-center pb-17 mb-25"
                      style={{ borderBottom: "1px solid #E7E7E7" }}
                    >
                      <div className="post__main__content__like-comment__likes d-flex">
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
                        <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                          {TotalLikes}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <img
                style={{ width: "100%", transform: "scale(1.8)" }}
                src={imageInModal}
                alt=""
              /> */}
            </Modal>
          </div>
          <div className="post__main__content__like-comment d-flex align-items-center">
            <div className="post__main__content__like-comment__likes d-flex">
              {mouseOverHeart || mouseClickHeart ? (
                <HeartFilled
                  onClick={handleLike}
                  style={{
                    fontSize: "20px",
                    color: "#E22828",
                    marginBottom: "2px",
                  }}
                  onMouseLeave={() => setMouseOverHeart(false)}
                />
              ) : (
                <HeartOutlined
                  onClick={handleLike}
                  style={{
                    color: "#828282",
                    fontSize: "20px",
                    cursor: "pointer",
                    marginBottom: "2px",
                  }}
                  onMouseOver={() => setMouseOverHeart(true)}
                />
              )}
              <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                {TotalLikes}
              </p>
            </div>
            <div className="post__main__content__like-comment__comments d-flex">
              <Comments onClick={() => setCommentsClick(!commentsClick)} />
              <p>{TotalComments}</p>
            </div>
          </div>
        </div>
      </section>
      <section
        className={commentsClick ? "post__middle" : "post__middle d-none"}
      >
        <hr color="#E7E7E7" style={{ marginBottom: "20px" }} />
        <div className="d-flex">
          <img src={img1} alt="" />
          <div className="post__middle__right-side">
            <ul className="d-flex align-items-center">
              <li>Bên mình có nhé</li>
              <li>Vào trang mình xem thử nhé</li>
              <li>Bên mình đang khuyến mãi luôn ạ</li>
            </ul>
            <div className="post__middle__right-side__choose-service d-flex justify-content-center align-items-center">
              <PlusOutlined style={{ color: "#03AC84", fontSize: "14px" }} />
              <p>Chọn dịch vụ liên quan</p>
            </div>
          </div>
        </div>
      </section>
      <section
        className={commentsClick ? "post__comments" : "post__comments d-none"}
      >
        <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
        {/* {comments.map((item, idx) => (
          <div key={item.Id} className="post__comments__detail">
            {idx !== 0 && (
              <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
            )}
            <div className="post__comments__detail__info d-flex align-items-center">
              <img src={item.Avatar} alt="" />
              <div
                style={{ marginLeft: "10px" }}
                className="pos__comments__detail__info__nametime"
              >
                <p className="post__comments__detail__info__nametime__name">
                  {item.Username}
                </p>
                <p>{item.CreationTime}</p>
              </div>
            </div>
            <Swiper
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              slidesPerView={2}
              spaceBetween={10}
              slidesPerGroup={1}
              loopFillGroupWithBlank={true}
            >
              {item.services.map((item2, idx) => (
                <SwiperSlide key={item2.Id}>
                  <img src={item2.image} />
                  <div className="post__comments__detail__slide-content d-flex flex-column">
                    <p>{item2.link}</p>
                    <p>{item2.content}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="d-flex" style={{ marginTop: "22px" }}>
              <HeartFilled
                style={{
                  fontSize: "20px",
                  color: "#E22828",
                  marginBottom: "2px",
                }}
              />
              <p style={{ paddingLeft: "5px", color: "#E22828" }}>
                {item.TotalLikes}
              </p>
            </div>
          </div>
        ))} */}
      </section>
    </article>
  );
};

export default DaoPost;
