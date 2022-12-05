import {
  CloseOutlined,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";
import { Col, message, Modal, Popover, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as Bell } from "../../assets/dao/bell.svg";
import { ReactComponent as Comments } from "../../assets/dao/comments.svg";
import { ReactComponent as LinkCopy } from "../../assets/dao/copy.svg";
import { ReactComponent as PostSave } from "../../assets/dao/copypost.svg";
import img1 from "../../assets/dao/Frame 180.png";
import { ReactComponent as Info } from "../../assets/dao/info.svg";
import sendComment from "../../assets/svg/sendComment.svg";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { postDaoService } from "../../services/PostDaoService";
import { userService } from "../../services/UserService";
import {
  createLikeCommentDao,
  getAllNotificationDaoAction,
  toggleNotificationDaoAction,
} from "../../stores/actions/PostDaoAction";
import { cancelSavePost } from "../../stores/actions/userAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import {
  GET_LIST_POST,
  SET_RELATED_SERVICE,
} from "../../stores/types/PostDaoType";
import { addLinebreaks, convertTime } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import CommentSlider from "../CommentSlider/CommentSlider";
import ReportPost from "../ReportPostDao";
import toastMessage from "../ToastMessage";
import ModalChooseService from "./components/ModalChooseService/ModalChooseService";
import "./daoPost.scss";

const DaoPost = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.authenticateReducer.currentUser
  );

  const { defaultComments, listNotificationUser, listPost } = useSelector(
    (state) => state.postDaoReducer
  );

  const [relatedServices, setRelatedServices] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  const { item, type = "post" } = props;
  const [post, setPost] = useState({ ...item });
  // const [mouseOverHeart, setMouseOverHeart] = useState(false);
  // const [mouseClickHeart, setMouseClickHeart] = useState(
  //   likePostList?.filter((itm) => itm.PostId === post?.id).length > 0
  // );
  const [commentsClick, setCommentsClick] = useState(false);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [moreOptionModal, setMoreOptionModal] = useState(false);
  const [isModalOptionDetail, setIsModalOptionDetail] = useState(false);
  const [isModalVisibleDetail, setIsModalVisibleDetail] = useState(false);
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);
  // const [imageInModal, setImageInModal] = useState("");

  const [comments, setComments] = useState([]);
  const [paginationCmt, setPaginationCmt] = useState({});
  const [chooseCommentDefault, setChooseCommentDefault] = useState({});
  const getComments = async (currentPage) => {
    try {
      const { data } = await postDaoService.getComments(
        post?.id,
        currentPage || 1,
        5
      );
      if (currentPage === 1) {
        setComments([...data.data]);
        setPaginationCmt(data.pagination);
      } else {
        setComments([...comments, ...data.data]);
        setPaginationCmt(data.pagination);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setPost({ ...item });
  }, [item]);

  useEffect(() => {
    dispatch(getAllNotificationDaoAction());
  }, [dispatch]);
  const handlerLikeComment = (id) => {
    // getComments(1);
    // setPost({ ...post, TotalComments: post?.TotalComments + 1 });
    dispatch(
      createLikeCommentDao(
        { CommentId: id },
        post?.id,
        setComments,
        paginationCmt
      )
    );
  };

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
    // setImageInModal(url);
    setIsModalVisibleDetail(true);
    if (comments.length <= 0) {
      getComments(1);
    }
  };

  const handleOkDetail = () => {
    setIsModalVisibleDetail(false);
  };

  const handleCancelDetail = () => {
    setIsModalVisibleDetail(false);
  };

  const handleLike = async () => {
    if (currentUser) {
      // dispatch(likePost(currentUser?.id, post?.id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
      try {
        await postDaoService.createLike({
          PostId: post?.id,
          UserId: currentUser.id,
        });
        const res = await postDaoService.getPostById(post?.id);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
      // if (checkLikePost()) {
      //   setMouseClickHeart(false);
      //   setPost({ ...post, TotalLikes: post?.TotalLikes - 1 });
      // } else {
      //   setMouseClickHeart(true);
      //   setPost({ ...post, TotalLikes: post?.TotalLikes + 1 });
      // }
      // console.log(currentUser.id, post?.id);
    }
  };

  // const handleLikeCmt = () => {
  //   if (currentUser) {
  //     if (checkLikePost()) {
  //       // dispatch(likePost(currentUser?.id, id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
  //       setMouseClickHeart(false);
  //       setPost({ ...post, TotalLikes: post?.TotalLikes - 1 });
  //     } else {
  //       dispatch(likePost(currentUser?.id, id)); //2 là UserId, mốt đăng nhập rồi thì thay đổi cái này
  //       setMouseClickHeart(true);
  //       setPost({ ...post, TotalLikes: post?.TotalLikes + 1 });
  //     }
  //   }
  // };

  const handleMoreOptionClick = async (itm) => {
    switch (itm.id) {
      case 1:
        setIsReportPostModalVisible(true);
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        break;
      case 2:
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        dispatch(toggleNotificationDaoAction({ PostId: post?.id }));
        message.success("Đã bật thông báo về bài viết này");
        break;
      case 3:
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        message.success("Đã sao chép liên kết");
        break;
      case 4:
        try {
          if (type !== "post") {
            dispatch(cancelSavePost(currentUser?.id, post?.id));
          } else {
            await userService.savePost(currentUser.id, post?.id);
            toastMessage("Lưu bài viết thành công!", "success");
          }
        } catch (error) {
          toastMessage(error.response.data.message, "warn");
        }
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        break;
      case 5:
        try {
          const formData = new FormData();
          formData.append("IsDeleted", 1);
          const { data } = await postDaoService.updatePost(post?.id, formData);
          const newData = listPost.filter((item) => item.id !== data.data.id);
          dispatch({ type: GET_LIST_POST, data: newData });
        } catch (error) {}
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        break;
      default:
        break;
    }
    // setIsModalVisible(false);
  };

  let ImageSection = null;
  let tempCount = post?.Image?.length;
  // Object.entries(post).forEach((post2, idx) => {
  //   if (post2[0].includes("Image")) tempCount++;
  // });

  // const getCommentsByPostId = (id) => {
  //   const newChooseComment = [...showComment];
  //   const checkIndex = newChooseComment.indexOf(id);
  //   if (checkIndex === -1) {
  //     newChooseComment.push(id);
  //   } else {
  //     newChooseComment.splice(checkIndex, 1);
  //   }
  //   const tempCmt = [...comments];
  //   if (tempCmt.find((cmt) => cmt.PostId === id)) {
  //   } else {
  //   }
  //   setShowComment(newChooseComment);
  // };

  const handleShowModalChooseService = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: (
        <ModalChooseService
          hasTags={post?.Tags}
          PostId={post?.id}
          relatedServices={relatedServices}
          setRelatedServices={setRelatedServices}
        />
      ),
    });
  };
  const handleAddComment = (cmt) => {
    if (chooseCommentDefault.id === cmt.id) {
      setChooseCommentDefault({});
    } else {
      setChooseCommentDefault(cmt);
    }
  };

  const handleSendComment = async () => {
    if (currentUser) {
      if (
        relatedServices.length > 0 ||
        chooseCommentDefault.Content !== undefined
      ) {
        const newData = relatedServices.reduce(
          (arr, item) => [
            ...arr,
            { category: item.category, serviceId: item.id },
          ],
          []
        );
        try {
          // console.log(JSON.stringify(newData));
          const res = await postDaoService.createComment({
            PostId: post?.id,
            Content: chooseCommentDefault.Content || "",
            Services: JSON.stringify(newData),
          });
          if (res) {
            getComments(1);
            setPost({ ...post, TotalComments: post?.TotalComments + 1 });
            setRelatedServices([]);
            // setComments([res.data, ...comments]);
            // dispatch({ type: SET_RELATED_SERVICE, data: [] });
          }
        } catch (error) {
          toastMessage("Add related service fail!", "error");
        }
      } else {
        toastMessage(
          "Vui lòng chọn bình luận hoặc dịch vụ liên quan!",
          "warning"
        );
      }
    }
  };

  const handleSeeMoreComment = () => {
    getComments(paginationCmt.currentPage + 1);
  };

  if (tempCount < 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {post?.Image.map((img, idx) => (
          <Col
            key={idx}
            md={tempCount === 1 ? 24 : 12}
            xs={24}
            onClick={() => handleImageModal(img)}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={convertImage(img)}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount === 3) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {post?.Image.map((img, idx) => {
          if (idx === 0) {
            //Kiểm tra cái idx này sau khi nhét API vào (Không xóa)
            return (
              <Col
                key={idx}
                md={24}
                xs={24}
                onClick={() => handleImageModal(img)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={convertImage(img)}
                  alt=""
                />
              </Col>
            );
          } else {
            return (
              <Col
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(img)}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={convertImage(img)}
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
        {post?.Image.map((img, idx) => (
          <Col key={idx} md={12} xs={24} onClick={() => handleImageModal(img)}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              key={idx}
              src={convertImage(img)}
              alt=""
            />
          </Col>
        ))}
      </Row>
    );
  } else if (tempCount > 4) {
    ImageSection = (
      <Row gutter={[16, 16]}>
        {post?.Image.map((img, idx) => {
          if (idx < 4) {
            return (
              <Col
                className="greater-than-four-images-section"
                key={idx}
                md={12}
                xs={24}
                onClick={() => handleImageModal(img)}
              >
                <div className="image-container">
                  {idx === 3 && (
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
                    src={convertImage(img)}
                    alt=""
                  />
                </div>
              </Col>
            );
          }
          return null;
        })}
      </Row>
    );
  }

  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const a = setTimeout(() => {
      setFakeLoading(false);
    }, 3000);

    return () => {
      clearTimeout(a);
    };
  }, [post]);
  return (
    <article className="post">
      <section className="post__main d-flex flex-column">
        <header className="post__main__info d-flex justify-content-between align-posts-center">
          <div className="d-flex justify-content-between align-posts-center">
            <img src={convertImage(post?.BookingUser?.Image)} alt="" />
            <div className="post__main__info__nametime">
              <p className="post__main__info__nametime__name">
                {post?.BookingUser?.Fullname}
              </p>
              <p>{convertTime(post?.CreationTime)}</p>
            </div>
          </div>
          <div>
            <Popover
              placement="leftTop"
              content={
                <div className="more-option-modal">
                  {moreOptionOnEachPost.map((itm, idx) => (
                    <>
                      {itm.id === 3 ? (
                        <li
                          key={idx}
                          onClick={(e) => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/home/dao/posts/${post?.id}`
                            );
                            handleMoreOptionClick(itm);
                          }}
                        >
                          <div className="container d-flex">
                            <div>{itm.icon}</div>
                            <p>{itm.title}</p>
                          </div>
                        </li>
                      ) : (
                        <>
                          {itm.id === 2 ? (
                            <>
                              {listNotificationUser?.some(
                                (item) =>
                                  item?.UserId === currentUser?.id &&
                                  item.PostId === post?.id
                              ) ? (
                                <li
                                  onClick={() => handleMoreOptionClick(itm)}
                                  key={idx}
                                >
                                  <div className="container d-flex">
                                    <div>{itm.icon}</div>
                                    <p>Tắt thông báo về bài viết này</p>
                                  </div>
                                </li>
                              ) : (
                                <li
                                  onClick={() => handleMoreOptionClick(itm)}
                                  key={idx}
                                >
                                  <div className="container d-flex">
                                    <div>{itm.icon}</div>
                                    <p>{itm.title}</p>
                                  </div>
                                </li>
                              )}
                            </>
                          ) : (
                            <li
                              onClick={() => handleMoreOptionClick(itm)}
                              key={idx}
                            >
                              <div className="container d-flex">
                                <div>{itm.icon}</div>
                                <p>{itm.title}</p>
                              </div>
                            </li>
                          )}
                        </>
                      )}
                    </>
                  ))}
                  {post?.BookingUserId === currentUser?.id && (
                    <li onClick={() => handleMoreOptionClick({ id: 5 })}>
                      <div className="container d-flex">
                        <div>
                          <DeleteOutlined style={{ fontSize: "18px" }} />
                        </div>
                        <p>Xóa bài viết</p>
                      </div>
                    </li>
                  )}
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
              postId={post?.id}
            />
          </div>
        </header>
        <div className="post__main__content">
          <div className="post__main__content__tags d-flex align-posts-center">
            {post?.Tags?.split(",").map((post, idx) => (
              <li key={idx}>#{post}</li>
            ))}
          </div>
          <div className="post__main__content__description">
            {!seeMore ? (
              <HTMLEllipsis
                unsafeHTML={`<p style="text-align: justify;">${addLinebreaks(
                  post?.Description
                )}</p>`}
                maxLine="2"
                trimRight={false}
                ellipsis="...Xem thêm"
                basedOn="letters"
                onClick={() => setSeeMore(true)}
              />
            ) : (
              <p
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{
                  __html: addLinebreaks(post?.Description),
                }}
              />
            )}
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
              style={{ overflow: "hidden" }}
              zIndex={999}
            >
              <Row>
                <Col
                  md={16}
                  xs={24}
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
                    {post?.Image?.map((img, index) => (
                      <SwiperSlide
                        key={index}
                        style={{ background: "#1D2226", padding: "90px 0" }}
                      >
                        <img
                          src={convertImage(img)}
                          alt=""
                          className="w-100 h-100"
                          style={{ objectFit: "contain" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
                <Col
                  md={8}
                  xs={24}
                  className="px-23 py-30"
                  style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    position: "relative",
                    height: "100vh",
                  }}
                >
                  <header className="post__main__info d-flex justify-content-between align-posts-center">
                    <div className="d-flex justify-content-between align-posts-center">
                      <img
                        src={convertImage(post?.BookingUser?.Image)}
                        alt=""
                      />
                      <div className="post__main__info__nametime">
                        <p className="post__main__info__nametime__name">
                          {post?.BookingUser?.Fullname}
                        </p>
                        <p>{convertTime(post?.CreationTime)}</p>
                      </div>
                    </div>
                    <div>
                      <Popover
                        placement="leftTop"
                        content={
                          <div className="more-option-modal">
                            {moreOptionOnEachPost.map((itm, idx) => (
                              <>
                                {itm.id === 3 ? (
                                  <li
                                    onClick={(e) => {
                                      navigator.clipboard.writeText(
                                        `${window.location.origin}/home/dao/posts/${post?.id}`
                                      );
                                      handleMoreOptionClick(itm);
                                    }}
                                    key={idx}
                                  >
                                    <div className="container d-flex">
                                      <div>{itm.icon}</div>
                                      <p>{itm.title}</p>
                                    </div>
                                  </li>
                                ) : (
                                  <>
                                    {itm.id === 2 ? (
                                      <>
                                        {listNotificationUser?.some(
                                          (item) =>
                                            item?.UserId === currentUser?.id &&
                                            item.PostId === post?.id
                                        ) ? (
                                          <li
                                            onClick={() =>
                                              handleMoreOptionClick(itm)
                                            }
                                            key={idx}
                                          >
                                            <div className="container d-flex">
                                              <div>{itm.icon}</div>
                                              <p>
                                                Tắt thông báo về bài viết này
                                              </p>
                                            </div>
                                          </li>
                                        ) : (
                                          <li
                                            onClick={() =>
                                              handleMoreOptionClick(itm)
                                            }
                                            key={idx}
                                          >
                                            <div className="container d-flex">
                                              <div>{itm.icon}</div>
                                              <p>{itm.title}</p>
                                            </div>
                                          </li>
                                        )}
                                      </>
                                    ) : (
                                      <li
                                        onClick={() =>
                                          handleMoreOptionClick(itm)
                                        }
                                        key={idx}
                                      >
                                        <div className="container d-flex">
                                          <div>{itm.icon}</div>
                                          <p>{itm.title}</p>
                                        </div>
                                      </li>
                                    )}
                                  </>
                                )}
                              </>
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
                        postId={post?.id}
                      />
                    </div>
                  </header>
                  <div className="post__main__content__tags d-flex align-posts-center">
                    {post?.Tags?.split(",").map((post, idx) => (
                      <li key={idx}>#{post}</li>
                    ))}
                  </div>
                  <div className="post__main__content__description">
                    <p
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{
                        __html: addLinebreaks(post?.Description),
                      }}
                    />
                  </div>
                  <div
                    className="post__main__content__like-comment d-flex align-posts-center pb-17 mb-25"
                    style={{ borderBottom: "1px solid #E7E7E7" }}
                  >
                    <div className="post__main__content__like-comment__likes d-flex">
                      <PopUpSignIn onClick={(e) => {}}>
                        {post?.Loves?.some(
                          (item) => item.UserId === currentUser?.id
                        ) ? (
                          <HeartFilled
                            onClick={handleLike}
                            style={{
                              fontSize: "20px",
                              color: "#E22828",
                              marginBottom: "2px",
                            }}
                            // onMouseLeave={() => setMouseOverHeart(false)}
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
                            // onMouseOver={() => setMouseOverHeart(true)}
                          />
                        )}
                      </PopUpSignIn>

                      <p
                        style={
                          post?.Loves?.some(
                            (item) => item.UserId === currentUser?.id
                          )
                            ? { color: "#E22828" }
                            : {}
                        }
                      >
                        {post?.TotalLikes}
                      </p>
                    </div>
                    <div className="post__main__content__like-comment__comments d-flex">
                      <Comments
                        className="active"
                        style={{ color: "#E22828" }}
                      />
                      <p className={`${commentsClick ? "active" : ""}`}>
                        {post?.TotalComments}
                      </p>
                    </div>
                  </div>
                  <section className="comment_wrapper">
                    <div className="d-flex">
                      <img
                        className="avatar-comment-default avt"
                        src={convertImage(currentUser?.Image)}
                        alt=""
                      />
                      <div
                        className="comment_default_wrapper"
                        style={{
                          width: "100px !important",
                          position: "relative",
                        }}
                      >
                        <ul className="d-flex align-posts-center">
                          {defaultComments.map((item, index) => (
                            <li
                              key={index}
                              className={
                                chooseCommentDefault.id === item.id && "active"
                              }
                              onClick={() => handleAddComment(item)}
                            >
                              {item.Content}
                            </li>
                          ))}
                        </ul>
                        <div
                          className="comment_default__choose-service d-flex justify-content-center align-posts-center"
                          onClick={handleShowModalChooseService}
                        >
                          <PlusOutlined
                            style={{ color: "#03AC84", fontSize: "14px" }}
                          />
                          <p>Chọn dịch vụ liên quan</p>
                        </div>
                        {relatedServices.length > 0 && (
                          <div className="w-100 pe-20">
                            <CommentSlider
                              data={relatedServices}
                              slidesPerView={1.5}
                            />
                          </div>
                        )}
                        <PopUpSignIn onClick={(e) => {}}>
                          <img
                            src={sendComment}
                            className="mt-5 btn-send-comment"
                            alt=""
                            onClick={handleSendComment}
                          />
                        </PopUpSignIn>
                      </div>
                    </div>
                  </section>
                  <div className="comment_post">
                    {comments
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((comment, index) => {
                        return (
                          <div key={index}>
                            <header className="post__main__info d-flex justify-content-between align-posts-center mt-18">
                              <div className="d-flex justify-content-between align-posts-center">
                                <img
                                  src={convertImage(
                                    comment?.BookingUser?.Image
                                  )}
                                  alt=""
                                />
                                <div className="post__main__info__nametime">
                                  <p className="post__main__info__nametime__name">
                                    {comment?.BookingUser?.Fullname}
                                  </p>
                                  <p>{convertTime(comment?.createdAt)}</p>
                                </div>
                              </div>
                            </header>
                            {comment.Content && (
                              <div
                                style={{
                                  marginLeft: "40px",
                                  marginTop: "15px",
                                }}
                                className="post__comments__detail__content"
                              >
                                {comment.Content}
                              </div>
                            )}
                            {comment?.services?.length > 0 && (
                              <div className="post_slider_container">
                                <CommentSlider
                                  data={comment.services}
                                  slidesPerView={1.5}
                                />
                              </div>
                            )}

                            <div
                              className="post__main__content__like-comment d-flex align-items-center pb-17 mb-25"
                              style={{ borderBottom: "1px solid #E7E7E7" }}
                            >
                              <div
                                className="post__main__content__like-comment__likes d-flex"
                                onClick={() => console.log(123)}
                              >
                                <PopUpSignIn onClick={(e) => {}}>
                                  {comment?.Likes?.some(
                                    (item) => item?.UserId === currentUser?.id
                                  ) ? (
                                    <HeartFilled
                                      // onClick={() =>
                                      //   setMouseClickHeart(!mouseClickHeart)
                                      // }
                                      style={{
                                        fontSize: "20px",
                                        color: "#E22828",
                                        marginBottom: "2px",
                                      }}
                                      onClick={() =>
                                        handlerLikeComment(comment?.id)
                                      }
                                      // onMouseLeave={() => setMouseOverHeart(false)}
                                    />
                                  ) : (
                                    <HeartOutlined
                                      style={{
                                        color: "#828282",
                                        fontSize: "20px",
                                        cursor: "pointer",
                                        marginBottom: "2px",
                                      }}
                                      onClick={() =>
                                        handlerLikeComment(comment?.id)
                                      }
                                      // onMouseOver={() => setMouseOverHeart(true)}
                                    />
                                  )}
                                </PopUpSignIn>
                                <p
                                  style={
                                    comment?.Likes?.some(
                                      (item) => item?.UserId === currentUser?.id
                                    )
                                      ? { color: "#E22828" }
                                      : {}
                                  }
                                >
                                  {comment?.TotalLike}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {paginationCmt.hasNextPage && (
                      <div
                        className="btn-see-more-cmt"
                        onClick={handleSeeMoreComment}
                      >
                        Xem thêm bình luận
                      </div>
                    )}
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
              <PopUpSignIn onClick={(e) => {}}>
                {post?.Loves?.some(
                  (item) => item.UserId === currentUser?.id
                ) ? (
                  <HeartFilled
                    onClick={handleLike}
                    style={{
                      fontSize: "20px",
                      color: "#E22828",
                      marginBottom: "2px",
                    }}
                    // onMouseLeave={() => setMouseOverHeart(false)}
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
                    // onMouseOver={() => setMouseOverHeart(true)}
                  />
                )}
              </PopUpSignIn>
              <p
                style={
                  post?.Loves?.some((item) => item.UserId === currentUser?.id)
                    ? { color: "#E22828" }
                    : {}
                }
              >
                {post?.TotalLikes}
              </p>
            </div>
            <div className="post__main__content__like-comment__comments d-flex">
              <Comments
                onClick={() => {
                  dispatch({ type: SET_RELATED_SERVICE, data: [] });
                  setCommentsClick(!commentsClick);
                  if (comments.length <= 0) {
                    getComments(1);
                  }
                }}
                className={`${commentsClick ? "active" : ""}`}
                style={commentsClick ? { color: "#E22828" } : {}}
              />
              <p className={`${commentsClick ? "active" : ""}`}>
                {post?.TotalComments}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        className={commentsClick ? "post__middle" : "post__middle d-none"}
      >
        <hr color="#E7E7E7" className="mb-20" />
        <div className="d-flex w-100" style={{ position: "relative" }}>
          <img className="avt" src={img1} alt="" />
          <div className="post__middle__right-side me-20 w-100">
            <ul className="d-flex align-posts-center">
              {defaultComments.map((item) => (
                <li
                  key={item.id}
                  className={`${
                    chooseCommentDefault.id === item.id && "active"
                  } d-select`}
                  onClick={() => handleAddComment(item)}
                >
                  {item.Content}
                </li>
              ))}
            </ul>
            <div
              className="post__middle__right-side__choose-service d-flex justify-content-center align-posts-center"
              onClick={handleShowModalChooseService}
            >
              <PlusOutlined style={{ color: "#03AC84", fontSize: "14px" }} />
              <p className="d-select">Chọn dịch vụ liên quan</p>
            </div>
            {relatedServices.length > 0 && (
              <div className="w-100" style={{ paddingRight: "50px" }}>
                <CommentSlider data={relatedServices} />
              </div>
            )}
          </div>
          <PopUpSignIn
            onClick={(e) => {
              e.prevent();
            }}
          >
            <img
              src={sendComment}
              className="mt-5 btn-send-comment"
              alt=""
              onClick={handleSendComment}
            />
          </PopUpSignIn>
        </div>
      </section>
      <section
        className={commentsClick ? "post__comments" : "post__comments d-none"}
      >
        <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
        {comments
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((cmt, idx) => {
            return (
              <div key={cmt.id} className="post__comments__detail">
                {idx !== 0 && (
                  <hr color="#E7E7E7" style={{ marginBottom: "18px" }} />
                )}
                <div className="post__comments__detail__info d-flex align-posts-center">
                  <img
                    className="post__comments__detail__info_avatar"
                    // src={cmt.BookingUser.Image}
                    // alt=""
                    src={convertImage(cmt.BookingUser.Image)}
                    alt=""
                  />
                  <div
                    style={{ marginLeft: "10px" }}
                    className="post__comments__detail__info__nametime"
                  >
                    <p className="post__comments__detail__info__nametime__name">
                      {cmt.BookingUser.Fullname}
                    </p>
                    <p>{convertTime(cmt.createdAt)}</p>
                  </div>
                </div>
                {cmt?.Content && (
                  <div
                    style={{ marginLeft: "40px", marginTop: "5px" }}
                    className="post__comments__detail__content"
                  >
                    {cmt.Content}
                  </div>
                )}
                {cmt?.services?.length > 0 && (
                  <div className="w-100">
                    <CommentSlider data={cmt?.services} />
                  </div>
                )}

                <PopUpSignIn>
                  <div className="d-flex" style={{ marginTop: "22px" }}>
                    {cmt?.Likes?.some(
                      (item) => item?.UserId === currentUser?.id
                    ) ? (
                      <HeartFilled
                        // onClick={() =>
                        //   setMouseClickHeart(!mouseClickHeart)
                        // }
                        onClick={() => handlerLikeComment(cmt?.id)}
                        style={{
                          fontSize: "20px",
                          color: "#E22828",
                          marginBottom: "2px",
                        }}
                        // onMouseLeave={() => setMouseOverHeart(false)}
                      />
                    ) : (
                      <HeartOutlined
                        style={{
                          color: "#828282",
                          fontSize: "20px",
                          cursor: "pointer",
                          marginBottom: "2px",
                        }}
                        onClick={() => handlerLikeComment(cmt?.id)}

                        // onMouseOver={() => setMouseOverHeart(true)}
                      />
                    )}
                    <p style={{ paddingLeft: "5px", color: "#E22828" }}>
                      {cmt?.TotalLike}
                    </p>
                  </div>
                </PopUpSignIn>
              </div>
            );
          })}
        {paginationCmt.hasNextPage && (
          <div className="btn-see-more-cmt" onClick={handleSeeMoreComment}>
            Xem thêm bình luận
          </div>
        )}
      </section>
    </article>
  );
};

export default DaoPost;
