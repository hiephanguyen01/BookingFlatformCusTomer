import { CheckCircleOutlined, StarFilled } from "@ant-design/icons";
import { Divider, Grid, Pagination, Rate } from "antd";
import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import images from "../../assets/images";
import { convertTime } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import { IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import ModalImage from "../ModalImg";
import "./commentRating.scss";
import BackNav from "../BackNav/BackNav";
import { useLocation } from "react-router";

const STAR_LIST = [
  { id: 0, label: "Tất cả" },
  { id: 5, label: "5" },
  { id: 4, label: "4" },
  { id: 3, label: "3" },
  { id: 2, label: "2" },
  { id: 1, label: "1" },
];
const { useBreakpoint } = Grid;
const pageSize = 5;
const Index = ({ data = [], className, isPerional }) => {
  const screens = useBreakpoint();
  const location = useLocation();
  const ref = useRef(null);
  const [chooseRating, setChooseRating] = useState(0);
  const [state, setState] = useState({
    values: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  const dispatch = useDispatch();
  const { values, current, minIndex, maxIndex } = state;
  useEffect(() => {
    setState({
      values: data?.rating,
      totalPage: data?.rating?.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize,
    });
  }, [data]);

  useEffect(() => {
    if (chooseRating === 0) {
      setState((prev) => ({
        ...prev,
        values: data.rating,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        values: data.rating.filter((d) => d.Rate === chooseRating),
      }));
    }
  }, [chooseRating, data]);
  const handleChange = (page) => {
    ref.current.scrollIntoView();
    setState((prev) => ({
      ...prev,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    }));
  };
  if (data.length < 1) return null;

  return (
    <>
      <div ref={ref} className={`rating ${className}`}>
        {screens?.xs ? (
          <>
            {location?.pathname?.includes("/home/user") ? (
              <BackNav title="Đánh giá của tôi" to="/home/user" />
            ) : (
              <h4>Đánh giá</h4>
            )}
          </>
        ) : (
          <h3>Đánh giá</h3>
        )}
        {isPerional ? (
          <></>
        ) : (
          <div className="rate d-flex align-items-center">
            <Rate
              allowHalf
              value={Number(data?.data?.TotalRate)}
              style={{ fontSize: "10px" }}
              disabled
            ></Rate>
            <div className="pt-3 ps-5">{`${data?.data?.TotalRate || 5} (${
              data?.rating?.length || 0
            })`}</div>
          </div>
        )}

        {!screens?.xs && (
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
                      ? `(${data?.rating?.length || 0})`
                      : `(${
                          data?.rating?.filter((d) => d.Rate === star.id)
                            .length || 0
                        })`}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        {screens?.xs && <Divider style={{ marginBottom: 0 }} />}

        {values?.length > 0 && (
          <>
            <div
              className="rating_list"
              style={screens?.xs ? { padding: "20px 20px" } : {}}
            >
              {values?.map(
                (item, idx) =>
                  idx >= minIndex &&
                  idx < maxIndex && (
                    <div key={`${item.id}${idx}`} className="rating_wrapper">
                      <div className="info-user">
                        <div className="d-flex">
                          <div className="w-36px h-36px">
                            {item?.IsAnonymous ? (
                              <img
                                src={images.default}
                                className="img_avatar"
                                alt=""
                              />
                            ) : (
                              <img
                                src={convertImage(item?.BookingUser?.Image)}
                                className="img_avatar"
                                alt=""
                              />
                            )}
                          </div>
                          <div className="info ms-10">
                            <h3>
                              {item?.IsAnonymous ? (
                                "Đánh giá ẩn danh"
                              ) : (
                                <>
                                  {item?.BookingUser?.Username ||
                                    item?.BookingUser?.Fullname}
                                </>
                              )}
                            </h3>
                            <Rate disabled allowHalf value={item?.Rate}></Rate>
                          </div>
                        </div>
                        <span>{convertTime(item?.CreationTime)}</span>
                      </div>
                      <div className="description">{item?.Description}</div>
                      <ul
                        className="listImages"
                        onClick={() =>
                          dispatch({
                            type: "SHOW_MODAL_LIST",
                            Component: <ModalImage data={item?.Image} />,
                          })
                        }
                      >
                        {/* <li className="item-video">
                          <img src={imgCmt} alt="" />
                          <PlayCircleOutlined className="play" />
                        </li> */}

                        {item?.Image.map((img, index) => (
                          <li key={index} className="item-image">
                            <img
                              src={`${
                                img.includes("https://drive.google.com/")
                                  ? img
                                  : IMG(img)
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
                        {item?.StudioRoom?.Name ||
                          item?.PhotographerServicePackage?.Name ||
                          item?.ModelServicePackage?.Name ||
                          item?.MakeupServicePackage?.Name ||
                          item?.Item?.Name}
                      </div>
                      {item?.ReplyComment && (
                        <div className="d-flex">
                          <div className="w-28px h-28px me-15">
                            <img
                              src={IMG(item?.Item?.Image1)}
                              className="img_avatar"
                              alt={item?.Item?.Image1}
                            />
                          </div>

                          <div className="py-6 px-15 d-flex justify-content-between w-100 cmt_reply_container">
                            <div>
                              <div className="name_reply text-medium-se">
                                {data?.data?.Name ||
                                  item?.Item?.StudioPost?.Name}
                                <CheckCircleOutlined
                                  className="w-14px h-14px"
                                  style={{
                                    color: "#03AC84",
                                    marginLeft: "5px",
                                  }}
                                />
                              </div>
                              <div className="cmt_reply text-medium-re">
                                {item?.ReplyComment || item?.Item.Name}
                              </div>
                            </div>
                            {/* <span>1 tuần trước</span> */}
                          </div>
                        </div>
                      )}

                      <Divider style={{ backgroundColor: "#E7E7E7" }} />
                    </div>
                  )
              )}
            </div>
            <div className="pagination-ds">
              <Pagination
                className="pagination-ds"
                pageSize={pageSize}
                current={current || 1}
                total={values?.length}
                onChange={handleChange}
                defaultPageSize={1}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default memo(Index);
