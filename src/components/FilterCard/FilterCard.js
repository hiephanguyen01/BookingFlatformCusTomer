import {
  CheckCircleTwoTone,
  HeartTwoTone,
  StarOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo2 from "../../assets/img/Logo2.png";
import Logo3 from "../../assets/img/Logo3.png";
import CurrencyFormat from "react-currency-format";
import "./FilterCard.scss";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
const FilterCard = ({ data, category }) => {
  const [like, setLike] = useState(false);
  return (
    <div className="FilterCard">
      <div className="groupImage">
        <div className="heard" onClick={(e) => e.stopPropagation()}>
          <PopUpSignIn
            onClick={(e) => {
              setLike(!like);
              e.stopPropagation();
            }}
          >
            <HeartTwoTone
              sizes={30}
              style={
                like
                  ? { padding: "10px", display: "block", fontSize: "25px" }
                  : {
                      padding: "10px",
                      display: "block",
                      fontSize: "25px",
                    }
              }
              twoToneColor="#e22828"
            />
          </PopUpSignIn>
        </div>
        <div className="sale">-60% HÔM NAY</div>
        <Link to={`/home/${category.value}/${data.id}`} className="main">
          <img className="main" src={data.Image[0]} alt="" />
        </Link>
        <Link to={`/home/${category.value}/${data.id}`} className="right">
          {data.Image.slice(1, 3).map((img, index) => (
            <div className="sub" key={index}>
              <img src={img} alt="" />
            </div>
          ))}
        </Link>
      </div>
      <Link to={`/home/${category.value}/${data.id}`} className="text">
        <p className="title">
          {data.Name} <CheckCircleTwoTone twoToneColor="#52c41a" />
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <p className="description">
            <img src={Logo3} alt="" /> {data.Address}
          </p>
          <p>
            5 <StarOutlined twoToneColor="#F8D93A" />
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="description">
            <img src={Logo2} alt="" /> {category.name}
          </p>
          <p>Đã đặt {data.BookingCount}</p>
        </div>

        <CurrencyFormat
          value={data.Price}
          displayType={"text"}
          thousandSeparator={true}
          renderText={(value) => (
            <p className="addition">
              {value} {data.PriceUnit || ""}
            </p>
          )}
        />
      </Link>
    </div>
  );
};

export default FilterCard;
