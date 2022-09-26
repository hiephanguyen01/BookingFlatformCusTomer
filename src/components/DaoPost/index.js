import {
  MoreOutlined,
  HeartFilled,
  HeartOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Col, Row, Popover, Modal, message } from "antd";
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
import ReportPost from "../ReportPostDao";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../stores/actions/PostDaoAction";
import { convertTime } from "../../utils/convert";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import { userService } from "../../services/UserService";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { convertImage } from "../../utils/convertImage";
import CopyToClipboard from "react-copy-to-clipboard";

const DaoPost = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.authenticateReducer.currentUser
  );
  const { item, likePostList, type = "post" } = props;
  console.log(currentUser);
  const [post, setPost] = useState(item);
  const [mouseOverHeart, setMouseOverHeart] = useState(false);
  const [mouseClickHeart, setMouseClickHeart] = useState(false);
  const [commentsClick, setCommentsClick] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [moreOptionModal, setMoreOptionModal] = useState(false);
  const [isModalOptionDetail, setIsModalOptionDetail] = useState(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);
  const [imageInModal, setImageInModal] = useState("");

  const {
    Id,
    Username,
    Fullname,
    Description,
    Avatar,
    TotalLikes,
    Tags,
    TotalComments,
    Image,
    // comments,
    CreationTime,
  } = post;

  const moreOptionOnEachPost = [
    { icon: <Info />, title: "Báo cáo bài viết", id: 1 },
    { icon: <Bell />, title: "Bật thông báo về bài viết này ", id: 2 },
    { icon: <LinkCopy />, title: "Sao chép liên kết", id: 3 },
    {
      icon: <PostSave />,
      title: type === "post" ? "Lưu bài viết" : "Hủy lưu",
      id: 4,
    },
  ];

  const handleImageModal = (url) => {
    setImageInModal(url);
    setIsModalVisibleDetail(true);
  };

  const handleOkDetail = () => {
    setIsModalVisibleDetail(false);
  };

  const handleCancelDetail = () => {
    setIsModalVisibleDetail(false);
  };

  const handleLike = () => {
    if (currentUser) {
      if (checkLikePost()) {
        dispatch(likePost(currentUser?.id, Id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
        setMouseClickHeart(false);
        setPost({ ...post, TotalLikes: post.TotalLikes - 1 });
      } else {
        dispatch(likePost(currentUser?.id, Id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
        setMouseClickHeart(true);
        setPost({ ...post, TotalLikes: post.TotalLikes + 1 });
      }
    }
  };
  const handleMoreOptionClick = async (itm) => {
    switch (itm.id) {
      case 1:
        setIsReportPostModalVisible(true);
        setMoreOptionModal(false);
        break;
      case 2:
        message.success("Đã bật thông báo về bài viết này");
        setMoreOptionModal(false);
        break;
      case 3:
        message.success("Đã sao chép liên kết");
        setMoreOptionModal(false);
        break;
      case 4:
        try {
          if (type !== "post") {
          } else {
            await userService.savePost(currentUser.id, Id);
            message.success("Lưu bài viết thành công");
            setMoreOptionModal(false);
          }
        } catch (error) {
          message.success("Lưu bài viết thất bại");
          setMoreOptionModal(false);
        }
        break;
      default:
        break;
    }

    setIsModalVisible(false);
  };

  const checkLikePost = () =>
    likePostList?.filter((itm) => itm.PostId === Id).length > 0;

  let ImageSection = null;
  let tempCount = Image.length;
  // Object.entries(post).forEach((post2, idx) => {
  //   if (post2[0].includes("Image")) tempCount++;
  // });
  if (tempCount < 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((post, idx) => (
          <Col
            key={idx}
            md={tempCount === 1 ? 24 : 12}
            xs={24}
            onClick={() => handleImageModal(post)}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={`${
                post.includes("https://drive.google.com/")
                  ? post
                  : REACT_APP_DB_BASE_URL_IMG + "/" + post
              }`}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount === 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((post, idx) => {
          // console.log(idx);
          if (idx === 0) {
            //Kiểm tra cái idx này sau khi nhét API vào (Không xóa)
            return (
              <Col
                key={idx}
                md={24}
                xs={24}
                onClick={() => handleImageModal(post)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={`${
                    post.includes("https://drive.google.com/")
                      ? post
                      : REACT_APP_DB_BASE_URL_IMG + "/" + post
                  }`}
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
                onClick={() => handleImageModal(post)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={`${
                    post.includes("https://drive.google.com/")
                      ? post
                      : REACT_APP_DB_BASE_URL_IMG + "/" + post
                  }`}
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
        {Image.map((post, idx) => (
          <Col key={idx} md={12} xs={24} onClick={() => handleImageModal(post)}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={`${
                post.includes("https://drive.google.com/")
                  ? post
                  : REACT_APP_DB_BASE_URL_IMG + "/" + post
              }`}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount > 4) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {Image.map((post, idx) => {
          if (idx < 4) {
            //Again, có lý do mà nó là 9 :v đừng xóa comment này
            return (
              <Col
                className="greater-than-four-images-section"
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(post)}
              >
                <div className="image-container">
                  {idx === 8 && (
                    <div className="fourth-image-overlay d-flex justify-content-center align-posts-center">
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
                    src={`${
                      post.includes("https://drive.google.com/")
                        ? post
                        : REACT_APP_DB_BASE_URL_IMG + "/" + post
                    }`}
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
        <header className="post__main__info d-flex justify-content-between align-posts-center">
          <div className="d-flex justify-content-between align-posts-center">
            <img src={convertImage(Avatar)} alt="" />
            <div className="post__main__info__nametime">
              <p className="post__main__info__nametime__name">{Fullname}</p>
              <p>{convertTime(CreationTime)}</p>
            </div>
          </div>
          <div>
            <Popover
              placement="leftTop"
              content={
                <div className="more-option-modal">
                  {moreOptionOnEachPost.map((itm, idx) => (
                    <li onClick={() => handleMoreOptionClick(itm)} key={idx}>
                      <CopyToClipboard
                        onCopy={() => {}}
                        text={`${window.location.href}/posts/${Id}`}
                      >
                        <div className="container d-flex">
                          <div>{itm.icon}</div>
                          <p>{itm.title}</p>
                        </div>
                      </CopyToClipboard>
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
          <div className="post__main__content__tags d-flex align-posts-center">
            {Tags?.split(",").map((post, idx) => (
              <li key={idx}>#{post}</li>
            ))}
          </div>
          <div className="post__main__content__description">
            <p>{Description}</p>
          </div>
          <div className="post__main__content__images">
            {/* //Post Image đang xử lý */}
            {ImageSection}
            <Modal
              className="popup d-flex justify-content-center align-posts-center post_detail"
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
                          src={convertImage(img)}
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
                  <header className="post__main__info d-flex justify-content-between align-posts-center">
                    <div className="d-flex justify-content-between align-posts-center">
                      <img src={convertImage(Avatar)} alt="" />
                      <div className="post__main__info__nametime">
                        <p className="post__main__info__nametime__name">
                          {Fullname}
                        </p>
                        <p>{convertTime(CreationTime)}</p>
                      </div>
                    </div>
                    <div>
                      <Popover
                        placement="leftTop"
                        content={
                          <div className="more-option-modal">
                            {moreOptionOnEachPost.map((itm, idx) => (
                              <li onClick={handleMoreOptionClick} key={idx}>
                                <div className="container d-flex">
                                  <div>{itm.icon}</div>
                                  <p>{itm.title}</p>
                                </div>
                              </li>
                            ))}
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
                        setIsReportPostModalVisible={
                          setIsReportPostModalVisible
                        }
                      />
                    </div>
                  </header>
                  <div className="post__main__content__tags d-flex align-posts-center">
                    {Tags?.split(",").map((post, idx) => (
                      <li key={idx}>#{post}</li>
                    ))}
                  </div>
                  <div className="post__main__content__description">
                    <p>{Description}</p>
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
                        {mouseOverHeart ||
                        checkLikePost() ||
                        mouseClickHeart ? (
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
                        {TotalLikes}
                      </p>
                    </div>
                    <div className="post__main__content__like-comment__comments d-flex">
                      <PopUpSignIn
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Comments
                          className="active"
                          style={{ color: "#E22828" }}
                        />
                      </PopUpSignIn>
                      <p className={`${commentsClick ? "active" : ""}`}>
                        {TotalComments}
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
                        <img src={convertImage(Avatar)} alt="" />
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
                                    Studio Wisteria chuyên cung cấp dịch vụ chụp
                                    hình cưới...
                                  </div>
                                </div>
                              </div>
                            </a>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div
                      className="post__main__content__like-comment d-flex align-items-center pb-17 mb-25"
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
                              onClick={() =>
                                setMouseClickHeart(!mouseClickHeart)
                              }
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
                          {TotalLikes}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="comment_post">
                    <header className="post__main__info d-flex justify-content-between align-posts-center mt-18">
                      <div className="d-flex justify-content-between align-posts-center">
                        <img src={convertImage(Avatar)} alt="" />
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
                                <div className="post_slider_post_name mb-5">
                                  BOOKINGSTUDIO.VN
                                </div>
                                <div className="post_slider_post_description">
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="post_slider_post">
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
                                  Studio Wisteria chuyên cung cấp dịch vụ chụp
                                  hình cưới chuyên...
                                </div>
                              </div>
                            </div>
                          </a>
                        </SwiperSlide>
                        <SwiperSlide className="post_slider_post">
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
          <div className="post__main__content__like-comment d-flex align-posts-center">
            <div className="post__main__content__like-comment__likes d-flex">
              <PopUpSignIn
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {mouseOverHeart || checkLikePost() || mouseClickHeart ? (
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
              </PopUpSignIn>
              <p style={mouseClickHeart ? { color: "#E22828" } : {}}>
                {TotalLikes}
              </p>
            </div>
            <div className="post__main__content__like-comment__comments d-flex">
              <PopUpSignIn
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Comments
                  onClick={() => setCommentsClick(!commentsClick)}
                  className={`${commentsClick ? "active" : ""}`}
                  style={commentsClick ? { color: "#E22828" } : {}}
                />
              </PopUpSignIn>
              <p className={`${commentsClick ? "active" : ""}`}>
                {TotalComments}
              </p>
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
            <ul className="d-flex align-posts-center">
              <li>Bên mình có nhé</li>
              <li>Vào trang mình xem thử nhé</li>
              <li>Bên mình đang khuyến mãi luôn ạ</li>
            </ul>
            <div className="post__middle__right-side__choose-service d-flex justify-content-center align-posts-center">
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
        {/* {comments.map((post, idx) => (
          <div key={post.Id} className="post__comments__detail">
            {idx !== 0 && (
              <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
            )}
            <div className="post__comments__detail__info d-flex align-posts-center">
              <img src={post.Avatar} alt="" />
              <div
                style={{ marginLeft: "10px" }}
                className="pos__comments__detail__info__nametime"
              >
                <p className="post__comments__detail__info__nametime__name">
                  {post.Username}
                </p>
                <p>{post.CreationTime}</p>
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
              {post.services.map((post2, idx) => (
                <SwiperSlide key={post2.Id}>
                  <img src={post2.image} />
                  <div className="post__comments__detail__slide-content d-flex flex-column">
                    <p>{post2.link}</p>
                    <p>{post2.content}</p>
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
                {post.TotalLikes}
              </p>
            </div>
          </div>
        ))} */}
      </section>
    </article>
  );
};

export default DaoPost;
