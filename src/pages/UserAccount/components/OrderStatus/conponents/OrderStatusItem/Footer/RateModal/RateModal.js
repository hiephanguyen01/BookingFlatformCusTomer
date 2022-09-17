import React, { useState } from "react";
import { Rate, Checkbox } from "antd";
import demo from "../../../../../../../../assets/Chat/demo1.png";
import { ImgRate } from "./ImgRate";
import { VideoRate } from "./VideoRate";
const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];
export const RateModal = ({ onOk, onCancel }) => {
  const [value, setValue] = useState(0);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className="FooterStatus__complete__modal__body">
      <h3>Viết đánh giá</h3>
      <div className="FooterStatus__complete__modal__body__info">
        <img alt="" src={demo} height={80} width={118} />
        <div className="FooterStatus__complete__modal__body__info__content">
          <div className="FooterStatus__complete__modal__body__info__content__title">
            Studio Wisteria chuyên ...
          </div>
          <div>
            Phòng : <span>Wisteria Premium </span>
          </div>
        </div>
      </div>
      <div className="FooterStatus__complete__modal__body__stars">
        <Rate tooltips={desc} onChange={setValue} value={value} />
      </div>
      <textarea
        className="FooterStatus__complete__modal__body__comment"
        rows={1}
        cols={1}
        data-kt-element="input"
        placeholder="Bạn cảm thấy thế nào khi sử dụng dịch vụ này?"
        /*  value={message}
            onKeyDown={onEnterPress}
            onChange={onInputChange} */
      />

      <div className="w-100 mt-15">
        <h5>Thêm ảnh và video</h5>
      </div>

      <div className="w-100">
        <div className="FooterStatus__complete__modal__body__img">
          <ImgRate /> <ImgRate /> <ImgRate /> <ImgRate /> <ImgRate />{" "}
          <VideoRate />
        </div>
        <div className="FooterStatus__complete__modal__body__img__footer">
          <div>Ảnh 1</div>
          <div>Ảnh 2</div>
          <div>Ảnh 3</div>
          <div>Ảnh 4</div>
          <div>Ảnh 5</div>
          <div>Video</div>
        </div>
      </div>

      <div className="FooterStatus__complete__modal__body__isAnonymous">
        <Checkbox onChange={onChange}>Đánh giá ẩn danh</Checkbox>
      </div>
      <div className="FooterStatus__complete__modal__body__confirm">
        <button
          onClick={onCancel}
          className="FooterStatus__complete__modal__body__confirm__1"
        >
          Hủy
        </button>
        <button
          onClick={onOk}
          className="FooterStatus__complete__modal__body__confirm__2"
        >
          Lưu
        </button>
      </div>
    </div>
  );
};
