import {
  CheckCircleTwoTone,
  HeartFilled,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo2 from "../../assets/img/Logo2.png";
import Logo3 from "../../assets/img/Logo3.png";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { studioPostService } from "../../services/StudioPostService";
import { getLikeStudioPostAction } from "../../stores/actions/studioPostAction";
import { SET_FILTER_SERVICE } from "../../stores/types/studioPostType";
import { convertImage } from "../../utils/convertImage";
import "./FilterCard.scss";
const categories = {
  1: {
    id: 1,
    value: "studio",
    name: "Studio",
  },
  2: {
    id: 2,
    value: "photographer",
    name: "Nhiếp ảnh",
  },
  3: {
    id: 3,
    value: "clothes",
    name: "Trang phục",
  },
  4: {
    id: 4,
    value: "makeup",
    name: "Make up",
  },
  5: {
    id: 5,
    value: "device",
    name: "Thiết bị",
  },
  6: {
    id: 6,
    value: "model",
    name: "Người mẫu",
  },
};
const FilterCard = ({ data, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const {
    listLikedCategory1,
    listLikedCategory2,
    listLikedCategory3,
    listLikedCategory4,
    listLikedCategory5,
    listLikedCategory6,
  } = useSelector((state) => state.studioPostReducer);
  const [newData, setNewData] = useState({ ...data });
  useEffect(() => {
    setNewData({ ...data });
  }, [data]);

  const handleChangeLike = async (e) => {
    if (currentUser) {
      const res = await studioPostService.getLikeStudioPost({
        PostId: data?.id,
        CategoryId: data?.category,
      });
      setNewData(res.data.data);
    }
  };
  return (
    <>
      {newData && (
        <div
          className="FilterCard"
          onClick={() => {
            dispatch({
              type: SET_FILTER_SERVICE,
              payload: {
                OrderByTime: -1,
                OrderByTimeFrom: "",
                OrderByTimeTo: "",
                OrderByDateFrom: "",
                OrderByDateTo: "",
              },
            });
            navigate(
              `/home/${categories[newData?.category].value}/${newData?.id}`
            );
          }}>
          <div className="groupImage">
            <PopUpSignIn
              onClick={(e) => {
                // e.stopPropagation();
                handleChangeLike();
              }}
              className={"like"}>
              {newData?.UsersLiked &&
              newData?.UsersLiked.length > 0 &&
              newData?.UsersLiked.some(
                (item) => item.UserId === currentUser?.id
              ) ? (
                <HeartFilled style={{ color: "red", fontSize: "20px" }} />
              ) : (
                <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
              )}
            </PopUpSignIn>

            {/* <div className="sale">-60% HÔM NAY</div> */}
            <div className="main">
              <img
                className="main"
                src={convertImage(newData?.Image[0])}
                alt=""
              />
            </div>
            <div className="right">
              {newData?.Image.slice(1, 3).map((img, index) => (
                <div className="sub" key={index}>
                  <img src={convertImage(img)} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="text">
            <p className="title">
              {data?.Name}&nbsp;
              <CheckCircleTwoTone
                style={{ fontSize: "20px" }}
                className="pb-4"
                twoToneColor="#52c41a"
              />
            </p>
            <Row style={{ width: "100%" }}>
              <Col md={12} sm={24} xs={24}>
                <p className="description">
                  <img src={Logo3} alt="" /> {data?.Address}
                </p>
              </Col>
              <Col md={12} sm={24} xs={24} className="right-text">
                <p>
                  <StarOutlined
                    style={{ color: "#F8D93A" }}
                    twoToneColor="#F8D93A"
                  />
                  {data?.TotalRate} ({data?.NumberOfRating})
                </p>
              </Col>
              <Col md={12} sm={24} xs={24}>
                <p className="description-category">
                  <img src={Logo2} alt="" className="pb-3" />{" "}
                  {categories[data?.category]?.name}
                </p>
              </Col>
              <Col md={12} sm={24} xs={24} className="right-text">
                <p>Đã đặt {data?.BookingCount}</p>
              </Col>
              <CurrencyFormat
                value={data?.Price}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <p className="addition">
                    {value} {data?.PriceUnit || ""}
                  </p>
                )}
              />
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterCard;
