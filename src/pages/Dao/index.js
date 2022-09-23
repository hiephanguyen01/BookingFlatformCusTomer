import {
  CheckOutlined,
  CloseCircleOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pen } from "../../assets/pen.svg";
import DaoPost from "../../components/DaoPost";
import DaoPostSearchModal from "../../components/DaoPostSearchModal";
import UploadImage from "../../components/UploadImage";
import {
  getAllPostDaoAction,
  getLikePostList,
} from "../../stores/actions/PostDaoAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Modal, message, Input } from "antd";
// import uploadImg from "../../assets/dao/uploadImg.png";
import { GET_LIST_POST } from "../../stores/types/PostDaoType";
import "./dao.scss";
import GoogleDrivePicker from "../../components/GoogleDrivePicker/GoogleDrivePicker";
// import OneDrivePicker from "../../components/OneDrivePicker/OneDrivePicker";
import { postDaoService } from "../../services/PostDaoService";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";

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

const Dao = (props) => {
  const [files, setFiles] = useState([]);
  const [filesDrive, setFilesDrive] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 3,
    tags: [],
  });
  const [post, setPost] = useState({
    tags: [],
    description: "",
  });
  const dispatch = useDispatch();
  const { listPost, pagination, likePostList } = useSelector(
    (state) => state.postDaoReducer
  );

  const [searchDaoPostVisible, setSearchDaoPostVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const onChangeFile = (e) => {
    const newFiles = [...files];
    const fileList = e.target.files;
    for (let file of fileList) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "video/mp4" ||
        file.type === "video/x-m4v"
      ) {
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

  const errorMess = () => {
    message.error({
      content: "Đăng bài viết thất bại!",
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

        await postDaoService.createPost("", formData);
        setVisible(false);
        success();
        setFiles([]);
        setPost({ tags: [], description: "" });
        dispatch(getAllPostDaoAction([], { ...filter, page: 1, tags: [] }));
      }
    } catch (error) {
      errorMess();
    }
  };

  // create post: end

  // useEffect(() => {
  //   const list = document.getElementById("infinity-list-post-dao");
  //   if (props.scrollable) {
  //     // list has fixed height
  //     list.addEventListener("scroll", (e) => {
  //       const el = e.target;
  //       if (el.scrollTop + el.clientHeight === el.scrollHeight) {
  //         setLoadMore(true);
  //       }
  //     });
  //   } else {
  //     // list has auto height
  //     window.addEventListener("scroll", () => {
  //       let win = window.scrollY + window.innerHeight;
  //       let listHeight = list.clientHeight + list.offsetTop;
  //       // console.log(win + " " + listHeight + " " + list.clientHeight);
  //       if (
  //         window.scrollY + window.innerHeight ===
  //           list.clientHeight + list.offsetTop ||
  //         (win - listHeight < 50 && win - listHeight > 0)
  //       ) {
  //         setLoadMore(true);
  //       }
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const list = document.getElementById("infinity-list-post-dao");
  //   window.addEventListener("scroll", () => {
  //     if (
  //       window.scrollY + window.innerHeight ===
  //       list.clientHeight + list.offsetTop
  //     ) {
  //       setLoadMore(true);
  //     }
  //   });
  // }, [listPost]);

  const getData = (loadMore) => {
    setFilter({ ...filter, page: filter.page + 1 });
    // setPage(() => page + 1);
  };
  // useEffect(() => {
  //   getData();
  // }, []);

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
    // const newFilter = { ...filter, page: filter.page !== 1 ? };
    dispatch(getAllPostDaoAction(listPost, filter));
  }, [filter.page]);

  useEffect(() => {
    const newFilter = { ...filter, page: 1 };
    setFilter(newFilter);
    dispatch(getAllPostDaoAction(listPost, newFilter));
  }, [filter.tags.length]);

  useEffect(() => {
    getData();
    dispatch(getLikePostList(1)); // 1 là user id

    if (Notification.permission !== "granted") {
      askPermission();
    }

    return () => {
      dispatch({ type: GET_LIST_POST, data: [] });
    };
  }, []);

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
        <article className="dao__container__tag d-flex align-items-center justify-content-evenly">
          <li
            className={`dao__container__tag__item d-flex align-items-center ${
              filter.tags.length > 0 && filter.tags.length !== tagItems.length
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
                setFilter(newFilter);
              }}
            >
              {filter.tags.includes(item.id) ? item.icon : ""}
              <p>{item.name}</p>
            </li>
          ))}
        </article>
        <ul id="infinity-list-post-dao">
          <InfiniteScroll
            dataLength={listPost.length} //This is important field to render the next data
            next={getData}
            hasMore={pagination.hasNextPage}
            loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
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
        visible={visible}
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
            multiple={false}
          >
            <PictureOutlined style={{ color: "#1FCBA2", fontSize: "25px" }} />
          </UploadImage>
          <GoogleDrivePicker files={filesDrive} setFiles={setFilesDrive} />
          {files &&
            files.map((item, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={item.preview}
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
                />
                <CloseCircleOutlined
                  className="btn_close"
                  onClick={() => handleRemoveImageDrive(index)}
                />
              </div>
            ))}
          {/* <OneDrivePicker /> */}
        </div>
        <div className="text-medium-re mb-16" style={{ color: "#222222" }}>
          Chọn danh mục liên quan
        </div>
        <ul className="d-flex">
          {tagItems.map((item, index) => (
            <li
              key={index}
              className={`create_post_tag_item ${
                post.tags.includes(item.id) ? "active" : ""
              }`}
              onClick={() => {
                let newPost = { ...post };
                if (newPost.tags.includes(item.id)) {
                  newPost.tags = newPost.tags.filter((val) => val !== item.id);
                } else {
                  newPost.tags.push(item.id);
                }
                setPost(newPost);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-end mt-36">
          <div
            className="btn btn-huy"
            onClick={() => {
              setVisible(false);
            }}
          >
            Hủy
          </div>
          <div
            className="btn btn-dang ms-10"
            type="primary"
            onClick={() => {
              handleCreatePost();
            }}
          >
            Đăng
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Dao;
