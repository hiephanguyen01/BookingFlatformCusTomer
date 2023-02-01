import { CloseCircleOutlined, PictureOutlined } from "@ant-design/icons";
import { Checkbox, Rate } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../../../../../../../../components/UploadImage";
import { ratingService } from "../../../../../../../../services/RatingService";
import { IMG } from "../../../../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];
export const RateModal = ({ onOk, onCancel, Category, id, Item, post }) => {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({
    Rate: "",
    Description: "",
    IsAnonymous: false,
    image: [],
  });
  const [files, setFiles] = useState([]);
  console.log(post);
  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      IsAnonymous: true,
    }));
  };
  const onsubmit = async (e) => {
    try {
      const newPost = { ...data };
      const formData = new FormData();
      for (let file of files) {
        delete file.preview;
        formData.append("image", file);
      }
      formData.append("Description", newPost.Description);
      formData.append("IsAnonymous", newPost.IsAnonymous);
      formData.append("Rate", newPost.Rate);
      console.log(formData);
      const result = await ratingService.createRatingBookign(
        id,
        Category,
        formData
      );
      setData({
        Rate: "",
        Description: "",
        IsAnonymous: false,
        image: [],
      });
      onOk();

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeRateStart = (value) => {
    setValue(value);
    setData((prevState) => ({
      ...prevState,
      Rate: value,
    }));
  };
  const handleChangeDescription = (e) => {
    console.log(e.target.value);
    setData((prevState) => ({
      ...prevState,
      Description: e.target.value,
    }));
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };

  const onChangeFile = (e) => {
    const newFiles = [...files];
    if (newFiles.length === 6) return null;
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
    if (newFiles.length === 6) return setFiles([...newFiles.splice(0, 5)]);
    else {
      setFiles([...newFiles]);
    }
  };
  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      image: files,
    }));
  }, [files]);
  return (
    <div className="FooterStatus__complete__modal__body">
      <h3>Viết đánh giá</h3>
      <div className="FooterStatus__complete__modal__body__info">
        <img alt="" src={IMG(Item.Image1)} height={80} width={118} />
        <div className="FooterStatus__complete__modal__body__info__content">
          <div className="FooterStatus__complete__modal__body__info__content__title">
            {post.Name}
          </div>
          <div>
            <span>{Item.Name}</span>
          </div>
        </div>
      </div>
      <div className="FooterStatus__complete__modal__body__stars">
        <Rate
          tooltips={desc}
          onChange={(e) => onChangeRateStart(e)}
          value={value}
        />
      </div>
      <textarea
        className="FooterStatus__complete__modal__body__comment"
        rows={1}
        cols={1}
        data-kt-element="input"
        placeholder="Bạn cảm thấy thế nào khi sử dụng dịch vụ này?"
        onChange={(e) => handleChangeDescription(e)}
        /*  value={message}
            onKeyDown={onEnterPress}
            onChange={onInputChange} */
      />

      <div className="w-100 mt-15">
        <h5>Thêm ảnh và video</h5>
      </div>

      <div className="w-100">
        <div
          className="mb-15 d-flex "
          style={{ gap: "10px", flexWrap: "wrap" }}>
          {/* <ImgRate setData={setData} /> <ImgRate  setData={setData} /> <ImgRate  setData={setData} /> <ImgRate  setData={setData}  /> <ImgRate  setData={setData}  />{" "}
          <VideoRate /> */}
          <UploadImage
            onChangeFile={onChangeFile}
            style={{
              width: "76px",
              height: "76px",
              border: "0.6px dashed #1FCBA2",
              borderRadius: "10px",
            }}
            multiple={true}>
            <PictureOutlined style={{ color: "#1FCBA2", fontSize: "25px" }} />
          </UploadImage>
          {/* <GoogleDrivePicker files={filesDrive} setFiles={setFilesDrive} /> */}
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
                  alt=""
                />
                <CloseCircleOutlined
                  className="btn_close"
                  onClick={() => handleRemoveImage(index)}
                />
              </div>
            ))}
        </div>
        {/* <div className="FooterStatus__complete__modal__body__img__footer">
          <div>Ảnh 1</div>
          <div>Ảnh 2</div>
          <div>Ảnh 3</div>
          <div>Ảnh 4</div>
          <div>Ảnh 5</div>
          <div>Video</div>
        </div> */}
      </div>

      <div className="FooterStatus__complete__modal__body__isAnonymous">
        <Checkbox onChange={onChange}>Đánh giá ẩn danh</Checkbox>
      </div>
      <div className="FooterStatus__complete__modal__body__confirm">
        <button
          onClick={onCancel}
          className="FooterStatus__complete__modal__body__confirm__1">
          Hủy
        </button>
        <button
          onClick={() => {
            onsubmit();
          }}
          className="FooterStatus__complete__modal__body__confirm__2">
          Lưu
        </button>
      </div>
    </div>
  );
};
