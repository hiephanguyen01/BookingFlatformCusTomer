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
import { getLikeStudioPostAction } from "../../stores/actions/studioPostAction";
import { convertImage } from "../../utils/convertImage";
import "./FilterCard.scss";
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
    switch (category?.id) {
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
    category?.id,
    listLikedCategory1,
    listLikedCategory2,
    listLikedCategory3,
    listLikedCategory4,
    listLikedCategory5,
    listLikedCategory6,
  ]);
  const handleChangeLike = (e) => {
    e.stopPropagation();
    if (!currentUser) navigate("/auth/sign-in");
    dispatch(getLikeStudioPostAction(data.id, category.id));
  };
  return (
    <>
      {data && (
        <div
          className="FilterCard"
          onClick={() => navigate(`/home/${category.value}/${data.id}`)}
        >
          <div className="groupImage">
            <div onClick={handleChangeLike} className={"like"}>
              {value?.findIndex((item) => item.id === data.id) > -1 ? (
                <HeartFilled style={{ color: "red", fontSize: "20px" }} />
              ) : (
                <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
              )}
            </div>
            <div className="heard" onClick={(e) => e.stopPropagation()}>
              {/* <PopUpSignIn
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
              </PopUpSignIn> */}
            </div>
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
            <div
              className="d-flex align-items-center"
              style={{ padding: "17px 10px 10px 17px" }}
            >
              <p className="title">{data.Name}</p>
              <CheckCircleTwoTone
                style={{ fontSize: "20px" }}
                twoToneColor="#52c41a"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="description">
                <img src={Logo3} alt="" /> {data.Address}
              </div>
              <p>
                <StarOutlined
                  style={{ color: "#F8D93A" }}
                  className="me-5"
                  twoToneColor="#F8D93A"
                />
                {data.TotalRate} ({data.NumberOfRating})
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className="description-category">
                <img src={Logo2} alt="" /> {category.name}
              </div>
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
