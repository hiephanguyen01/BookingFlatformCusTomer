import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Popover, message } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import {
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import sendComment from "../../assets/svg/sendComment.svg";

import "./postDetail.scss";
import "swiper/css";
import "swiper/css/navigation";

import { convertImage } from "../../utils/convertImage";
import { ReactComponent as Comments } from "../../assets/dao/comments.svg";
import {
  createLikeCommentDao,
  getAllDefaultComments,
  getAllNotificationDaoAction,
  getLikePostList,
  getPostDaoByIdAction,
  toggleNotificationDaoAction,
} from "../../stores/actions/PostDaoAction";
import { ReactComponent as Info } from "../../assets/dao/info.svg";
import { ReactComponent as Bell } from "../../assets/dao/bell.svg";
import { ReactComponent as LinkCopy } from "../../assets/dao/copy.svg";
import { ReactComponent as PostSave } from "../../assets/dao/copypost.svg";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import ReportPost from "../../components/ReportPostDao";
import { convertTime } from "../../utils/convert";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import ModalChooseService from "../../components/DaoPost/components/ModalChooseService/ModalChooseService";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import CommentSlider from "../../components/CommentSlider/CommentSlider";
import toastMessage from "../../components/ToastMessage";
import { SET_RELATED_SERVICE } from "../../stores/types/PostDaoType";
import { postDaoService } from "../../services/PostDaoService";
import { cancelSavePost } from "../../stores/actions/userAction";
import { userService } from "../../services/UserService";
import DaoPost from "../../components/DaoPost";

const PostDetail = () => {
  const type = "post";
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { postDetail, defaultComments, listNotificationUser } = useSelector(
    (state) => state.postDaoReducer
  );

  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const [isModalOptionDetail, setIsModalOptionDetail] = useState(false);
  const [isReportPostModalVisible, setIsReportPostModalVisible] =
    useState(false);

  const [post, setPost] = useState({ ...postDetail });
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState({});
  const [chooseCommentDefault, setChooseCommentDefault] = useState({});
  const [relatedServices, setRelatedServices] = useState([]);

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

  const [moreOptionModal, setMoreOptionModal] = useState(false);
  const getComments = async (currentPage) => {
    try {
      const { data } = await postDaoService.getComments(
        postId,
        currentPage || 1,
        5
      );
      if (currentPage === 1) {
        setComments([...data.data]);
        setPagination(data.pagination);
      } else {
        setComments([...comments, ...data.data]);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getPostDaoByIdAction(postId));
    dispatch(getAllDefaultComments());
    getComments(1);
    return () => {
      dispatch({ type: "DELETE_DETAIL_POST", data: {} });
    };
  }, []);

  useEffect(() => {
    dispatch(getLikePostList(currentUser?.id));
    dispatch(getAllNotificationDaoAction());
  }, [currentUser, dispatch]);

  useEffect(() => {
    setPost({ ...postDetail });
  }, [postDetail]);

  const handleShowModalChooseService = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: (
        <ModalChooseService
          hasTags={post.Tags}
          PostId={post.Id}
          relatedServices={relatedServices}
          setRelatedServices={setRelatedServices}
        />
      ),
    });
  };

  const handlerLikeComment = (id) => {
    dispatch(
      createLikeCommentDao({ CommentId: id }, postId, setComments, pagination)
    );
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
          // console.log(window.locationJSON.stringify(newData));
          const res = await postDaoService.createComment({
            PostId: postDetail.id,
            Content: chooseCommentDefault.Content || "",
            Services: JSON.stringify(newData),
          });
          if (res) {
            getComments(1);
            setPost({ ...post, TotalComments: post.TotalComments + 1 });
            // setComments([res.data, ...comments]);
            setRelatedServices([]);
            setChooseCommentDefault({});
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
    getComments(pagination.currentPage + 1);
  };

  const handleAddComment = (cmt) => {
    if (chooseCommentDefault.id === cmt.id) {
      setChooseCommentDefault({});
    } else {
      setChooseCommentDefault(cmt);
    }
  };

  const handleMoreOptionClick = async (itm) => {
    switch (itm.id) {
      case 1:
        setIsReportPostModalVisible(true);
        setIsModalOptionDetail(false);
        break;
      case 2:
        setIsModalOptionDetail(false);
        setMoreOptionModal(false);
        dispatch(toggleNotificationDaoAction({ PostId: postId }));
        message.success("Đã bật thông báo về bài viết này");
        break;
      case 3:
        setIsModalOptionDetail(false);
        message.success("Đã sao chép liên kết");
        break;
      case 4:
        try {
          if (type !== "post") {
            dispatch(cancelSavePost(currentUser?.id, postId));
            toastMessage("Hủy lưu bài viết thành công!", "success");
          } else {
            await userService.savePost(currentUser.id, postId);
            toastMessage("Lưu bài viết thành công!", "success");
          }
        } catch (error) {
          toastMessage(error.response.data.message, "warn");
        }
        setIsModalOptionDetail(false);
        break;
      default:
        break;
    }

    // setIsModalVisible(false);
  };

  const handleLike = async () => {
    if (currentUser) {
      // if (checkLikePost()) {
      //   setPost({ ...post, TotalLikes: post.TotalLikes - 1 });
      // } else {
      //   setPost({ ...post, TotalLikes: post.TotalLikes + 1 });
      // }
      try {
        await postDaoService.createLike({
          PostId: post.id,
          UserId: currentUser.id,
        });
        dispatch(getPostDaoByIdAction(postId));
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    <div className="post-wrapper">
      <div className="postDetail">
        <MetaDecorator
          // title={`${postDetail?.Tags?.split(",").join(" - ").toUpperCase()}`}
          title={`${
            postDetail?.BookingUser?.Fullname
          } - ${postDetail?.Tags?.split(",").join(",").toUpperCase()}`}
          description={postDetail.Description}
          imgUrl={
            REACT_APP_DB_BASE_URL_IMG + `/${postDetail?.Image?.slice(0, 1)}`
          }
        />
        <DaoPost item={postDetail} type={type} />
        {/* <Row>
        <Col
          lg={16}
          md={12}
          sm={24}
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
                  className="w-100 h-100"
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
        <Col lg={8} md={12} sm={24} className="px-23 py-30 col-right">
          <header className="post_detail_info d-flex justify-content-between align-posts-center">
            <div className="d-flex justify-content-between align-items-center">
              <img
                src={convertImage(post?.BookingUser?.Image)}
                alt=""
                className="avt"
              />
              <div className="ms-10">
                <p className="post_detail_info_name">
                  {post?.BookingUser?.Fullname}
                </p>
                <p className="post_detail_info_time">
                  {convertTime(post?.CreationTime)}
                </p>
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
                                `${window.location.origin}/home/dao/posts/${postId}`
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
                                    item.PostId === postId
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
                postId={postId}
              />
            </div>
          </header>
          <div className="post_detail_tags d-flex align-posts-center">
            {post?.Tags?.split(",").map((post, idx) => (
              <li key={idx}>#{post}</li>
            ))}
          </div>
          <div className="post_detail_description">
            <p>{post?.Description}</p>
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
                  post?.Loves?.some((item) => item.UserId === currentUser?.id)
                    ? { color: "#E22828" }
                    : {}
                }
              >
                {post?.TotalLikes}
              </p>
            </div>
            <div className="post__main__content__like-comment__comments d-flex">
              <Comments className="active" style={{ color: "#E22828" }} />
              <p className={`${true ? "active" : ""}`}>{post?.TotalComments}</p>
            </div>
          </div>
          <section className="post_detail_comment">
            <div className="d-flex">
              {currentUser?.Image && (
                <img src={currentUser?.Image} alt="" className="avt" />
              )}
              <div className="post_detail_choose_comment d-flex">
                <div className="">
                  <ul className="d-flex align-items-center">
                    {defaultComments?.map((item) => (
                      <li
                        key={item.id}
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
                    className="post_detail_choose_service d-flex justify-content-center align-items-center"
                    onClick={handleShowModalChooseService}
                  >
                    <PlusOutlined
                      style={{ color: "#03AC84", fontSize: "14px" }}
                    />
                    <p>Chọn dịch vụ liên quan</p>
                  </div>
                </div>
                <PopUpSignIn onClick={(e) => {}}>
                  <img
                    src={sendComment}
                    style={{ borderRadius: "0", cursor: "pointer" }}
                    className="mt-5 btn-send-comment"
                    alt=""
                    onClick={handleSendComment}
                  />
                </PopUpSignIn>
              </div>
            </div>
            {relatedServices.length > 0 && (
              <div className="w-100 pe-20">
                <CommentSlider data={relatedServices} slidesPerView={1.5} />
              </div>
            )}
          </section>
          {comments
            ?.sort((a, b) => b.createdAt - a.createdAt)
            .map((comment) => (
              <div key={comment.id} className="comment_post">
                <header className="post_detail_info d-flex justify-content-between align-posts-center mt-18">
                  <div className="d-flex justify-content-between align-posts-center">
                    <img
                      src={convertImage(comment?.BookingUser?.Image)}
                      alt=""
                      className="avt"
                    />
                    <div className="ms-10">
                      <p className="post_detail_info_name">
                        {comment?.BookingUser?.Fullname}
                      </p>
                      <p className="post_detail_info_time">
                        {convertTime(comment?.createdAt)}
                      </p>
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
                  <CommentSlider data={comment.services} slidesPerView={1.5} />
                )}
                <div
                  className="post__main__content__like-comment d-flex align-posts-center pb-17 mb-25"
                  style={{ borderBottom: "1px solid #E7E7E7" }}
                >
                  <div className="post__main__content__like-comment__likes d-flex">
                    <PopUpSignIn onClick={(e) => {}}>
                      {comment?.Likes?.some(
                        (item) => item?.UserId === currentUser?.id
                      ) ? (
                        <HeartFilled
                          onClick={() => handlerLikeComment(comment?.id)}
                          style={{
                            fontSize: "20px",
                            color: "#E22828",
                            marginBottom: "2px",
                          }}
                          // onMouseLeave={() => setMouseOverHeart(false)}
                        />
                      ) : (
                        <HeartOutlined
                          onClick={() => handlerLikeComment(comment?.id)}
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
            ))}
          {pagination.hasNextPage && (
            <div className="btn-see-more-cmt" onClick={handleSeeMoreComment}>
              Xem thêm bình luận
            </div>
          )}
        </Col>
      </Row> */}
      </div>
    </div>
  );
};

export default PostDetail;
