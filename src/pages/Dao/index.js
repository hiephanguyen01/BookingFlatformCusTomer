import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Pen } from "../../assets/pen.svg";
import DaoPost from "../../components/DaoPost";
import { getAllPostDaoAction } from "../../stores/actions/PostDaoAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Modal, Upload, message, Input } from "antd";
import uploadImg from "../../assets/dao/uploadImg.png";
import "./dao.scss";

const tagItems = [
  {
    id: 0,
    icon: <CheckOutlined style={{ color: "#03AC84" }} />,
    name: "Tất cả",
  },
  { id: 1, icon: <></>, name: "Studio" },
  { id: 2, icon: <></>, name: "Nhiếp ảnh" },
  { id: 3, icon: <></>, name: "Người mẫu" },
  { id: 4, icon: <></>, name: "Trang phục" },
  { id: 5, icon: <></>, name: "Trang bị" },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const Dao = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { listPost, pagination } = useSelector((state) => state.postDaoReducer);

  // useEffect(() => {
  //   getData(loadMore);
  //   setLoadMore(false);
  // }, [loadMore]);

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
  // useEffect(() => {
  //   getData(loadMore);
  //   setLoadMore(false);
  // }, []);
  // create post: start
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <img src={uploadImg} />
    </div>
  );
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
    // if (loadMore && pagination.nextPage) {
    dispatch(getAllPostDaoAction(listPost, 3, page));
    setPage(() => page + 1);
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="dao d-flex justify-content-center">
      <div className="dao__container d-flex flex-column align-items-center">
        <header className="dao__container__header d-flex justify-content-between align-items">
          <h2>Dạo</h2>
          <button
            className="dao__container__header__button d-flex align-items-center"
            onClick={() => setVisible(true)}
          >
            <Pen />
            <p>Tạo bài viết</p>
          </button>
        </header>
        <article className="dao__container__tag d-flex align-items-center justify-content-evenly">
          {tagItems.map((item, idx) => (
            <li
              className="dao__container__tag__item d-flex align-items-center"
              key={item.id}
              onClick={() => setSelectedCategory(item.id)}
            >
              {item.icon}
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
            {listPost.map((item) => {
              switch (selectedCategory) {
                case 1:
                  return (
                    item.Tags.includes("studio") && (
                      <DaoPost key={item.Id} item={item} />
                    )
                  );
                case 2:
                  return (
                    item.Tags.includes("nhiepanh") && (
                      <DaoPost key={item.Id} item={item} />
                    )
                  );
                case 3:
                  return (
                    item.Tags.includes("nguoimau") && (
                      <DaoPost key={item.Id} item={item} />
                    )
                  );
                case 4:
                  return (
                    item?.Tags.includes("trangphuc") && (
                      <DaoPost key={item.Id} item={item} />
                    )
                  );
                case 5:
                  return (
                    item?.Tags.includes("trangbi") && (
                      <DaoPost key={item.Id} item={item} />
                    )
                  );

                default:
                  return <DaoPost key={item.Id} item={item} />;
              }
            })}
          </InfiniteScroll>
        </ul>
      </div>
      <Modal
        title="Tạo bài viết"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={696}
      >
        <Input.TextArea
          rows={4}
          placeholder="Bạn muốn tìm gì"
          maxLength={6}
          className="text-area"
        />
        <div
          className="text-medium-re mt-20 mb-16"
          style={{ color: "#222222" }}
        >
          Tải hình ảnh
        </div>
        <div className="mb-15">
          <Upload
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </div>
        <div className="text-medium-re mb-16" style={{ color: "#222222" }}>
          Chọn danh mục liên quan
        </div>
        <ul className="d-flex">
          {tagItems.map((item, index) => (
            <li
              key={index}
              className={`create_post_tag_item ${index === 0 ? "active" : ""}`}
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
              setVisible(false);
              success();
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
