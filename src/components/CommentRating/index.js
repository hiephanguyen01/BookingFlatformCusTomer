import React, { useState } from "react";
import { Rate, Pagination, Divider } from "antd";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  StarFilled,
} from "@ant-design/icons";

import "./commentRating.scss";

import images from "../../assets/images";
import imgCmt from "../../assets/images/deviceImg.png";
import { convertTime } from "../../utils/convert";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";

const STAR_LIST = [
  { id: 0, label: "Tất cả" },
  { id: 5, label: "5" },
  { id: 4, label: "4" },
  { id: 3, label: "3" },
  { id: 2, label: "2" },
  { id: 1, label: "1" },
];

const Index = ({ data = [], className }) => {
  const limit = 5;
  const [chooseRating, setChooseRating] = useState(0);
  const [page, setPage] = useState(0);

  const totalStart =
    (
      data?.reduce((starTotal, star) => starTotal + star.Rate, 0) / data.length
    ).toFixed(2) | 0;

  const handleChangePage = (p) => {
    setPage(p);
  };
  return (
    <>
      <div className={`rating ${className}`}>
        <h3>Đánh giá</h3>
        <div className="rate d-flex align-items-center">
          <Rate
            allowHalf
            value={Number(totalStart)}
            style={{ fontSize: "10px" }}
            disabled
          ></Rate>
          <div className="pt-3 ps-5">{`${totalStart} (${data.length})`}</div>
        </div>
        <div className="listRates">
          {STAR_LIST.map((star) => {
            return (
              <div
                onClick={() => setChooseRating(star.id)}
                key={star.id}
                className={`rate_item ${
                  chooseRating === star.id ? "active" : ""
                }`}
              >
                <span>{star.label}</span>
                <StarFilled style={{ color: "#F8D93A" }} />
                <span>
                  {star.id === 0
                    ? `(${data.length})`
                    : `(${data?.filter((d) => d.Rate === star.id).length})`}
                </span>
              </div>
            );
          })}
        </div>
        {data.length > 0 && (
          <>
            {" "}
            <div className="rating_list">
              {chooseRating === 0
                ? data
                    .slice(
                      (page - 1 > 0 ? page - 1 : 0) * limit,
                      (page - 1 > 0 ? page - 1 : 0) * limit + limit
                    )
                    .map((item) => (
                      <div key={item.id} className="rating_wrapper">
                        <div className="info-user">
                          <div className="d-flex">
                            <div className="w-36px h-36px">
                              <img
                                src={`${REACT_APP_DB_BASE_URL_IMG}/${item.BookingUser.Image}`}
                                className="img_avatar"
                                alt=""
                              />
                            </div>
                            <div className="info ms-10">
                              <h3>{item.BookingUser.Username}</h3>
                              <Rate disabled allowHalf value={item.Rate}></Rate>
                            </div>
                          </div>
                          <span>{convertTime(item.CreationTime)}</span>
                        </div>
                        <div className="description">{item.Description}</div>
                        <ul className="listImages">
                          <li className="item-video">
                            <img src={imgCmt} />
                            <PlayCircleOutlined className="play" />
                          </li>
                          {item.Image.map((img, index) => (
                            <li key={index} className="item-image">
                              <img
                                src={`${
                                  img.includes("https://drive.google.com/")
                                    ? img
                                    : REACT_APP_DB_BASE_URL_IMG + "/" + img
                                }`}
                                alt=""
                              />
                            </li>
                          ))}
                        </ul>
                        <div
                          className="mt-16 mb-25 text-medium-re"
                          style={{ color: "#828282" }}
                        >
                          Phòng : Wisteria Premium
                        </div>
                        <div className="d-flex">
                          <div className="w-28px h-28px me-15">
                            <img src={images.banner2} className="img_avatar" />
                          </div>
                          <div className="py-6 px-15 d-flex justify-content-between w-100 cmt_reply_container">
                            <div>
                              <div className="name_reply text-medium-se">
                                Wisteria Studio{" "}
                                <CheckCircleOutlined
                                  className="w-14px h-14px"
                                  style={{ color: "#03AC84" }}
                                />
                              </div>
                              <div className="cmt_reply text-medium-re">
                                Cảm ơn bạn vì đã tin tưởng và ủng hộ Studio
                                Wisteria
                              </div>
                            </div>
                            <span>1 tuần trước</span>
                          </div>
                        </div>
                        <Divider style={{ backgroundColor: "#E7E7E7" }} />
                      </div>
                    ))
                : data
                    .filter((d) => d.Rate === chooseRating)
                    .slice(
                      (page - 1 > 0 ? page - 1 : 0) * limit,
                      (page - 1 > 0 ? page - 1 : 0) * limit + limit
                    )
                    .map((item) => (
                      <div key={item.id} className="rating_wrapper">
                        <div className="info-user">
                          <div className="d-flex">
                            <div className="w-36px h-36px">
                              <img
                                src={`${REACT_APP_DB_BASE_URL_IMG}/${item.BookingUser.Image}`}
                                className="img_avatar"
                              />
                            </div>
                            <div className="info ms-10">
                              <h3>{item.BookingUser.Username}</h3>
                              <Rate disabled allowHalf value={item.Rate}></Rate>
                            </div>
                          </div>
                          <span>{convertTime(item.CreationTime)}</span>
                        </div>
                        <div className="description">{item.Description}</div>
                        <ul className="listImages">
                          <li className="item-video">
                            <img src={imgCmt} />
                            <PlayCircleOutlined className="play" />
                          </li>
                          {item.Image.map((img, index) => (
                            <li key={index} className="item-image">
                              <img
                                src={`${
                                  img.includes("https://drive.google.com/")
                                    ? img
                                    : REACT_APP_DB_BASE_URL_IMG + "/" + img
                                }`}
                                alt=""
                              />
                            </li>
                          ))}
                        </ul>
                        <div
                          className="mt-16 mb-25 text-medium-re"
                          style={{ color: "#828282" }}
                        >
                          Phòng : Wisteria Premium{" "}
                        </div>
                        <div className="d-flex">
                          <div className="w-28px h-28px me-15">
                            <img src={images.banner2} className="img_avatar" />
                          </div>
                          <div className="py-6 px-15 d-flex justify-content-between w-100 cmt_reply_container">
                            <div>
                              <div className="name_reply text-medium-se">
                                Wisteria Studio{" "}
                                <CheckCircleOutlined
                                  className="w-14px h-14px"
                                  style={{ color: "#03AC84" }}
                                />
                              </div>
                              <div className="cmt_reply text-medium-re">
                                Cảm ơn bạn vì đã tin tưởng và ủng hộ Studio
                                Wisteria
                              </div>
                            </div>
                            <span>1 tuần trước</span>
                          </div>
                        </div>
                        <Divider style={{ backgroundColor: "#E7E7E7" }} />
                      </div>
                    ))}
            </div>
            <div className="pagination-ds">
              <Pagination
                className="pagination-ds"
                defaultCurrent={1}
                total={Math.ceil(data.length / limit) * 10}
                onChange={handleChangePage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
