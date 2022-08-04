import {
  CheckCircleTwoTone,
  HeartTwoTone,
  StarOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import Logo2 from "../../assets/img/Logo2.png";
import Logo3 from "../../assets/img/Logo3.png";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import "./FilterCard.scss";
const FilterCard = () => {
  const [like,setLike] = useState(false)
  return (
    <div className="FilterCard">
      <div className="groupImage">
        <div className="heard">
          <PopUpSignIn onClick={()=> setLike(!like) }>
            <HeartTwoTone
              sizes={30}
              style={{ padding: "10px", display: "block", fontSize: "25px" ,backgroundColor:like?'red':''}}
              twoToneColor="#e22828"
            />
          </PopUpSignIn>
        </div>
        <div className="sale">-60% HÔM NAY</div>
        <div className="main">
          <img
            className="main"
            src="https://www.brides.com/thmb/umh5TKE4fIOD5bbbmfTHzqqj2lM=/735x0/brides-cover-image-36476d79c52f4b6d8bc9894d859649a6.jpeg"
            alt=""
          />
        </div>
        <div className="right">
          <div className="sub">
            <img
              src="https://leewedding.vn/wp-content/uploads/2022/01/TAM08245-copy-1-683x1024.jpg"
              alt=""
            />
          </div>
          <div className="sub">
            <img
              src="https://jobsgo.vn/blog/wp-content/uploads/2022/01/wedding-planner-la-gi-5.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="text">
        <p className="title">
          Studio Mizo Misaki với concept tối giản{" "}
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="description">
            <img src={Logo3} alt="" /> Quận 1,TP.HCM
          </p>
          <p>
            5 <StarOutlined twoToneColor="#F8D93A" />
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="description">
            <img src={Logo2} alt="" /> Studio
          </p>
          <p>Đã đặt 56</p>
        </div>
        <p className="addition">500,000 đ/h</p>
        <p className="addition">2,000,000 đ/h</p>
      </div>
    </div>
  );
};

export default FilterCard;
