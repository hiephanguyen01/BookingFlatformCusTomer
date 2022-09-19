import {
  CheckCircleTwoTone,
  HeartTwoTone,
  StarOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../../assets/img/Logo2.png";
import Logo3 from "../../assets/img/Logo3.png";
import CurrencyFormat from "react-currency-format";
import "./FilterCard.scss";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
const FilterCard = ({ data, category }) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {data && (
        <div
          className="FilterCard"
          onClick={() => navigate(`/home/${category.value}/${data.id}`)}
        >
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
            <div className="main">
              <img
                className="main"
                src={`${
                  data?.Image[0].includes("https://drive.google.com/")
                    ? data?.Image[0]
                    : REACT_APP_DB_BASE_URL_IMG + "/" + data?.Image[0]
                }`}
                alt=""
              />
            </div>
            <div className="right">
              {data?.Image.slice(1, 3).map((img, index) => (
                <div className="sub" key={index}>
                  <img
                    src={`${
                      img.includes("https://drive.google.com/")
                        ? img
                        : REACT_APP_DB_BASE_URL_IMG + "/" + img
                    }`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="text">
            <p className="title">
              {data.Name} <CheckCircleTwoTone twoToneColor="#52c41a" />
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="description">
                <img src={Logo3} alt="" /> {data.Address}
              </p>
              <p>
                <StarOutlined
                  style={{ color: "#F8D93A" }}
                  className="me-5"
                  twoToneColor="#F8D93A"
                />
                5 (20)
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
          </div>
        </div>
      )}
    </>
  );
};

export default FilterCard;
