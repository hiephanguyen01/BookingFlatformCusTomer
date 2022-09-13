import {
  CheckOutlined,
  CloseCircleOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Input, message, Modal } from "antd";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import addNotification from "react-push-notification";
import { useDispatch, useSelector } from "react-redux";
import uploadImg from "../../assets/dao/uploadImg.png";
import { ReactComponent as Pen } from "../../assets/pen.svg";
import DaoPost from "../../components/DaoPost";
import DaoPostSearchModal from "../../components/DaoPostSearchModal";
import UploadImage from "../../components/UploadImage";
import { getPostDaoAction } from "../../stores/actions/PostDaoAction";
import { GET_LIST_POST } from "../../stores/types/PostDaoType";
import "./dao.scss";
import GoogleDrivePicker from "../../components/GoogleDrivePicker/GoogleDrivePicker";
import OneDrivePicker from "../../components/OneDrivePicker/OneDrivePicker";

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
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { listPost, pagination } = useSelector((state) => state.postDaoReducer);

  const [searchDaoPostVisible, setSearchDaoPostVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleCancel = () => setPreviewVisible(false);

  const onChangeFile = (e) => {
    const newFiles = [...files];
    const fileList = e.target.files;
    /* console.log(fileList[0]); */
    for (let file of fileList) {
      file.preview = URL.createObjectURL(file);
      newFiles.push({ ...file });
    }
    setFiles([...newFiles]);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };

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

  const getData = (loadMore) => {
    dispatch(getPostDaoAction(listPost, 3, page));
    setPage(() => page + 1);
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
    getData();

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
        className="modalDao"
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
        <div
          className="mb-15 d-flex "
          style={{ gap: "10px", flexWrap: "wrap" }}
        >
          {files &&
            files.map((item, index) => (
              <div style={{ position: "relative" }}>
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
          <GoogleDrivePicker />
          <OneDrivePicker />
          {/* <Upload
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
          </Modal> */}
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
              /* console.log(files); */
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
