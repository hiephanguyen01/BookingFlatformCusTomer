import {
  CheckCircleTwoTone,
  HeartFilled,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logo2 from "../../assets/img/Logo2.png";
import Logo3 from "../../assets/img/Logo3.png";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
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
  const [value, setValue] = useState([]);
  useEffect(() => {
    switch (data.category) {
      case 1:
        setValue(listLikedCategory1);
        break;
      case 2:
        setValue(listLikedCategory2);
        break;
      case 3:
        setValue(listLikedCategory3);
        break;
      case 4:
        setValue(listLikedCategory4);
        break;
      case 5:
        setValue(listLikedCategory5);
        break;
      case 6:
        setValue(listLikedCategory6);
        break;
      default:
        break;
    }
  }, [
    data.category,
    listLikedCategory1,
    listLikedCategory2,
    listLikedCategory3,
    listLikedCategory4,
    listLikedCategory5,
    listLikedCategory6,
  ]);
  const handleChangeLike = (e) => {
    // if (!currentUser) navigate("/auth/sign-in");
    if (currentUser) {
      dispatch(getLikeStudioPostAction(data.id, data.category));
    }
  };
  return (
    <>
      {data && (
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
            navigate(`/home/${categories[data.category].value}/${data.id}`);
          }}
        >
          <div className="groupImage">
            <PopUpSignIn
              onClick={(e) => {
                e.stopPropagation();
                handleChangeLike();
              }}
              className={"like"}
            >
              {value?.findIndex((item) => item.id === data.id) > -1 ? (
                <HeartFilled style={{ color: "red", fontSize: "20px" }} />
              ) : (
                <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
              )}
            </PopUpSignIn>

            {/* <div className="sale">-60% HÔM NAY</div> */}
            <div className="main">
              <img className="main" src={convertImage(data.Image[0])} alt="" />
            </div>
            <div className="right">
              {data?.Image.slice(1, 3).map((img, index) => (
                <div className="sub" key={index}>
                  <img src={convertImage(img)} alt="" />
                </div>
              ))}
            </div>
          </div>

          <div className="text">
            <div className="d-flex align-items-center mb-8">
              <p className="title">{data.Name}</p>
              <CheckCircleTwoTone
                style={{ fontSize: "20px" }}
                className="pb-4"
                twoToneColor="#52c41a"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-8">
              <p className="description">
                <img src={Logo3} alt="" /> {data.Address}
              </p>
              <d>
                <StarOutlined
                  style={{ color: "#F8D93A" }}
                  twoToneColor="#F8D93A"
                />
                {data.TotalRate} ({data.NumberOfRating})
              </d>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-8">
              <p className="description-category">
                <img src={Logo2} alt="" className="pb-3" />{" "}
                {categories[data.category].name}
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
