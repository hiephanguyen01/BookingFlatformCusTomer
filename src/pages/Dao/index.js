import {
  CheckOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Button, Grid, Input, message, Modal, Row } from "antd";
import { useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroll-component";
import addNotification from "react-push-notification";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pen } from "../../assets/pen.svg";
import DaoPost from "../../components/DaoPost";
import DaoPostSearchModal from "../../components/DaoPostSearchModal";
import DaoPostSkeleton from "../../components/Skeleton/DaoPostSkeleton";
import toastMessage from "../../components/ToastMessage";
import UploadImage from "../../components/UploadImage";
import { postDaoService } from "../../services/PostDaoService";
import {
  getAllDefaultComments,
  getAllPostDaoAction,
} from "../../stores/actions/PostDaoAction";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import "./dao.scss";
import Resizer from "react-image-file-resizer";
import { useLocation } from "react-router-dom";
export const resizeImage = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920, // max width
      1920, // max height
      "JPEG", // compress format
      90, // quality
      0, // rotation
      (uri) => {
        resolve(uri);
      },
      "file" // output type
    );
  });
const tagItems = [
  {
    id: "studio",
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Studio",
  },
  {
    id: "nhiepanh",
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Nhiếp ảnh",
  },
  {
    id: "nguoimau",
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Người mẫu",
  },
  {
    id: "makeup",
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Make up",
  },
  {
    id: "trangphuc",
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Trang phục",
  },
  {
    id: "thietbi",
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Thiết bị",
  },
];

// const getBase64 = (file) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onload = () => resolve(reader.result);

//     reader.onerror = (error) => reject(error);
//   });

const { useBreakpoint } = Grid;

const Dao = () => {
  const screens = useBreakpoint();
  const [files, setFiles] = useState([]);
  const [filesDrive, setFilesDrive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 5,
    tags: [],
  });
  const [post, setPost] = useState({
    tags: [],
    description: "",
  });
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  const { listPost, pagination, likePostList } = useSelector(
    (state) => state.postDaoReducer
  );

  const [searchDaoPostVisible, setSearchDaoPostVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllDefaultComments());
  }, [dispatch]);

  const onChangeFile = async (e) => {
    const newFiles = [...files];
    if (newFiles.length === 6) {
      toastMessage("Đạt tối đa 6 hình!!!", "error", null, null, {
        color: "red",
      });
      return null;
    }
    const fileList = e.target.files;
    for (let file of fileList) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "video/mp4" ||
        file.type === "video/x-m4v"
      ) {
        file = await resizeImage(file);
        file.preview = URL.createObjectURL(file);
        newFiles.push(file);
      }
    }
    setFiles([...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };
  const handleRemoveImageDrive = (index) => {
    const newFiles = [...filesDrive];
    newFiles.splice(index, 1);
    setFilesDrive([...newFiles]);
  };

  // const uploadButton = (
  //   <div>
  //     <img src={uploadImg} />
  //   </div>
  // );
  const success = () => {
    message.success({
      content: "Bài viết của bạn được đăng thành công",
      className: "custom-class",
      style: {
        marginTop: "40vh",
      },
      duration: 1,
    });
  };

  const errorMess = (mess) => {
    message.error({
      content: mess || "Đăng bài viết thất bại!",
      className: "custom-class",
      style: {
        marginTop: "40vh",
      },
      duration: 1,
    });
  };

  const warning = () => {
    let mess = "";
    if (post.tags.length === 0 && post.description === "") {
      mess = "Vui lòng nhập mô tả bài viết và chọn hashtag!";
    } else if (post.description === "") {
      mess = "Vui lòng nhập mô tả bài viết!";
    } else if (post.tags.length === 0) {
      mess = "Vui lòng chọn hashtag!";
    }
    if (mess) {
      message.warning({
        content: mess,
        className: "custom-class",
        style: {
          marginTop: "40vh",
        },
        duration: 1,
      });
      return 1;
    }
    return 0;
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      if (warning() === 0) {
        const newPost = { ...post };
        const formData = new FormData();
        for (let file of files) {
          delete file.preview;
          formData.append("image", file);
        }
        formData.append("Description", newPost.description);
        formData.append("Tags", newPost.tags.join(","));
        if (filesDrive.length > 0) {
          const newImgDrive = filesDrive.reduce(
            (newImgs, img) => [...newImgs, img.preview],
            []
          );
          formData.append("imageDrive", newImgDrive.join(","));
        }

        await postDaoService.createPost(currentUser.id, formData);
        setVisible(false);
        success();
        setFiles([]);
        setPost({ tags: [], description: "" });
        dispatch(getAllPostDaoAction([], { ...filter, page: 1, tags: [] }));
      }
    } catch (error) {
      errorMess(error.response.data.message);
    }
    setLoading(false);
  };

  const getData = () => {
    dispatch(
      getAllPostDaoAction(listPost, {
        ...filter,
        page: pagination.currentPage + 1,
      })
    );
  };
  //Intergrate notification
  function askPermission() {
    // Notification
    addNotification({
      title: "Subcribe successfully", //chỗ này fetch api
      subtitle: "asdasdadadsadasdasdasds", //also this one
      native: true,
    });
  }
  useEffect(() => {
    dispatch(
      getAllPostDaoAction([], {
        ...filter,
      })
    );
  }, [filter, dispatch]);

  // useEffect(() => {
  //   if (Notification.permission !== "granted") {
  //     askPermission();
  //   }
  // }, [dispatch]);

  return (
    <section className="dao d-flex justify-content-center">
      <DaoPostSearchModal
        searchDaoPostVisible={searchDaoPostVisible}
        setSearchDaoPostVisible={setSearchDaoPostVisible}
      />
      <div className="dao__container d-flex flex-column align-items-center">
        <header className="dao__container__header d-flex justify-content-between align-items">
          <h2>Dạo</h2>
          <PopUpSignIn onClick={() => setVisible(true)}>
            <button className="dao__container__header__button d-flex align-items-center">
              <Pen />
              <p>Tạo bài viết</p>
            </button>
          </PopUpSignIn>
        </header>
        <article className="dao__container__tag d-flex align-items-center ">
          {screens.xs ? (
            <div className="category-mobile-slide">
              <li
                className={`dao__container__tag__item d-flex align-items-center ${
                  filter.tags.length > 0 &&
                  filter.tags.length !== tagItems.length
                    ? ""
                    : "active"
                }`}
                onClick={() => {
                  setFilter({ ...filter, tags: [] });
                }}
              >
                {filter.tags.length > 0 &&
                filter.tags.length !== tagItems.length ? (
                  ""
                ) : (
                  <CheckOutlined style={{ color: "#03AC84" }} />
                )}
                <p>Tất cả</p>
              </li>
              {tagItems.map((item, idx) => (
                <li
                  className={`dao__container__tag__item d-flex align-items-center ${
                    filter.tags.includes(item.id) ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    let newFilter = { ...filter };
                    if (newFilter.tags.includes(item.id)) {
                      newFilter.tags = newFilter.tags.filter(
                        (val) => val !== item.id
                      );
                    } else {
                      newFilter.tags.push(item.id);
                    }
                    if (newFilter.tags.length === 6) {
                      newFilter.tags = [];
                    }
                    setFilter(newFilter);
                  }}
                >
                  {filter.tags.includes(item.id) ? item.icon : ""}
                  <p>{item.name}</p>
                </li>
              ))}
            </div>
          ) : (
            <Row className="w-100 category-desk" justify="space-between">
              <li
                className={`dao__container__tag__item d-flex align-items-center justify-content-center ${
                  filter.tags.length > 0 &&
                  filter.tags.length !== tagItems.length
                    ? ""
                    : "active"
                }`}
                onClick={() => {
                  setFilter({ ...filter, tags: [] });
                }}
              >
                {filter.tags.length > 0 &&
                filter.tags.length !== tagItems.length ? (
                  ""
                ) : (
                  <CheckOutlined style={{ color: "#03AC84" }} />
                )}
                <p>Tất cả</p>
              </li>
              {tagItems.map((item, idx) => (
                <li
                  className={`dao__container__tag__item d-flex align-items-center justify-content-center ${
                    filter.tags.includes(item.id) ? "active" : ""
                  }`}
                  key={item.id}
                  onClick={() => {
                    let newFilter = { ...filter };
                    if (newFilter.tags.includes(item.id)) {
                      newFilter.tags = newFilter.tags.filter(
                        (val) => val !== item.id
                      );
                    } else {
                      newFilter.tags.push(item.id);
                    }
                    if (newFilter.tags.length === 6) {
                      newFilter.tags = [];
                    }
                    setFilter(newFilter);
                  }}
                >
                  {filter.tags.includes(item.id) ? item.icon : ""}
                  <p>{item.name}</p>
                </li>
              ))}
            </Row>
          )}
        </article>
        <ul id="infinity-list-post-dao">
          <InfiniteScroll
            dataLength={listPost.length} //This is important field to render the next data
            next={() => {
              getData();
            }}
            hasMore={pagination.hasNextPage}
            loader={<DaoPostSkeleton />}
            endMessage={<DaoPostSkeleton />}
          >
            {listPost.map((item) => (
              <DaoPost key={item.Id} item={item} likePostList={likePostList} />
            ))}
          </InfiniteScroll>
        </ul>
      </div>
      <Modal
        title="Tạo bài viết"
        centered
        open={visible}
        className="modalDao"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={""}
      >
        <Input.TextArea
          rows={4}
          placeholder="Bạn muốn tìm gì"
          className="text-area"
          style={{ resize: "none" }}
          value={post.description}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
        />
        <div
          className="text-medium-re mt-20 mb-16"
          style={{ color: "#222222" }}
        >
          Tải hình ảnh
        </div>
        <div
          className="mb-15 d-flex "
          style={{ gap: "10px", flexWrap: "wrap" }}
        >
          <UploadImage
            onChangeFile={onChangeFile}
            style={{
              width: "76px",
              height: "76px",
              border: "0.6px dashed #1FCBA2",
              borderRadius: "10px",
            }}
            multiple={true}
          >
            <PictureOutlined style={{ color: "#1FCBA2", fontSize: "25px" }} />
          </UploadImage>
          {/* <GoogleDrivePicker files={filesDrive} setFiles={setFilesDrive} /> */}
          {files &&
            files.map((item, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={item.preview}
                  alt=""
                  className="w-76px h-76px"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <CloseCircleOutlined
                  className="btn_close"
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
            ))}
          {filesDrive &&
            filesDrive.map((item, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={item.preview}
                  className="w-76px h-76px"
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  alt=""
                />
                <CloseCircleOutlined
                  className="btn_close"
                  onClick={() => handleRemoveImageDrive(index)}
                />
              </div>
            ))}
          {/* <OneDrivePicker /> */}
        </div>
        <div
          className="text-medium-re mb-16"
          style={{ color: "#222222", margin: "" }}
        >
          Chọn danh mục liên quan
        </div>
        <Row>
          {tagItems.map((item, index) => (
            <p
              key={index}
              className={`create_post_tag_item ${
                post.tags.includes(item.id) ? "active" : ""
              }`}
              onClick={() => {
                let newPost = { ...post };
                if (newPost.tags.includes(item.id)) {
                  newPost.tags = newPost.tags.filter((val) => val !== item.id);
                } else if (newPost.tags.length < 3) {
                  newPost.tags.push(item.id);
                } else {
                  errorMess("Số hash tag vượt quá giới hạn !");
                }
                setPost(newPost);
              }}
            >
              {item.name}
            </p>
          ))}
        </Row>
        <div className="d-flex justify-content-end mt-36">
          <Button
            size="large"
            className="btn btn-huy"
            onClick={() => {
              setVisible(false);
            }}
          >
            Hủy
          </Button>
          <Button
            size="large"
            className="btn btn-dang ms-10"
            type="primary"
            disabled={loading}
            onClick={() => {
              handleCreatePost();
            }}
          >
            {loading && (
              <LoadingOutlined color="primary" style={{ fontSize: "20px" }} />
            )}
            Đăng
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default Dao;
