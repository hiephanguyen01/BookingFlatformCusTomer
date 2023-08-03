import {
  EditOutlined,
  PhoneOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import noBody from "../../../../assets/img/no-body.png";
import useDebounce from "../../../../components/hooks/useDebounce";
import { ImageDetect } from "../../../../components/ImageDetect/ImageDetect";
import { userService } from "../../../../services/UserService";
import { getCurrentUser } from "../../../../stores/actions/autheticateAction";
import { ReactComponent as UserInfo } from "../../../../assets/account/UserInfo.svg";
import { ReactComponent as Liked } from "../../../../assets/account/Liked.svg";
import { ReactComponent as MyPost } from "../../../../assets/account/MyPost.svg";
import { ReactComponent as MyRating } from "../../../../assets/account/MyRating.svg";
import { ReactComponent as OrderStatus } from "../../../../assets/account/OrderStatus.svg";
import { ReactComponent as SavedPost } from "../../../../assets/account/SavedPost.svg";
import { ReactComponent as See } from "../../../../assets/account/See.svg";
import { ReactComponent as Terms } from "../../../../assets/account/terms.svg";
import { ReactComponent as Policy } from "../../../../assets/account/policy.svg";
import { ReactComponent as Support } from "../../../../assets/account/support.svg";

import "./aside.scss";
import { convertImage } from "../../../../utils/convertImage";

const ITEM_USER_ACCOUNT_ASIDE = [
  {
    icon: <UserInfo />,
    iconActive: <UserInfo className="aside-active" />,
    title: "Thông tin tài khoản",
    linkTo: "accountInfo",
  },
  {
    icon: <OrderStatus />,
    iconActive: <OrderStatus className="aside-active" />,
    title: "Lịch sử đơn đặt",
    linkTo: "orderStatus",
  },
  {
    icon: <Liked />,
    iconActive: <Liked className="aside-active" />,
    title: "Đã thích",
    linkTo: "liked",
  },
  {
    icon: <MyRating />,
    iconActive: <MyRating className="aside-active" />,
    title: "Đánh giá của tôi",
    linkTo: "rating",
  },
  {
    icon: <MyPost />,
    iconActive: <MyPost className="aside-active" />,
    title: "Bài viết của tôi",
    linkTo: "posts",
  },
  {
    icon: <SavedPost />,
    iconActive: <SavedPost className="aside-active" />,
    title: "Bài viết đã lưu",
    linkTo: "post-saved",
  },
  {
    icon: <See />,
    iconActive: <See className="aside-active" />,
    title: "Đã xem gần đây",
    linkTo: "recently-viewed",
  },
];
const ITEM_US_ASIDE = [
  {
    icon: <Terms />,
    iconActive: <Terms className="aside-active" />,
    title: "Điều khoản sử dụng",
    linkTo: "terms-use",
  },
  {
    icon: <Policy />,
    iconActive: <Policy className="aside-active" />,
    title: "Chính sách an toàn & bảo mật",
    linkTo: "privacy-policy",
  },
  {
    icon: <Support />,
    iconActive: <Support className="aside-active" />,
    title: "Hỗ trợ",
    linkTo: "/home/helpCenter",
  },
];

const Aside = ({ children }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const ref = useRef(null);
  const [name, setName] = useState(UserMe?.Fullname);
  const debounced = useDebounce(name, 1500);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const AsideItems = ({ item }) => {
    return (
      <Link
        to={item.linkTo}
        style={
          pathname.includes(item.linkTo)
            ? { color: "#E22828" }
            : { color: "#222222" }
        }
      >
        <div
          className="d-flex align-items-center"
          style={{
            padding: "0.5rem 0",
            cursor: "pointer",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "30px", height: "100%" }}
          >
            {pathname.includes(item.linkTo) ? item?.iconActive : item?.icon}
          </div>
          <div
            style={
              pathname.includes(item.linkTo)
                ? {
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                    fontWeight: "600",
                    marginTop: "2px",
                  }
                : {
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                    fontWeight: "400",
                    marginTop: "2px",
                  }
            }
          >
            {item.title}
          </div>
        </div>
      </Link>
    );
  };

  useEffect(() => {
    // if (!debounced.trim()) {
    //   // setName(UserMe.Fullname);
    //   return;
    // }

    const fetchApi = async () => {
      if (debounced === UserMe.Fullname) {
        setName(UserMe?.Fullname);
        return;
      }
      if (!debounced.trim()) {
        setName(UserMe?.Fullname);
        return;
      }
      try {
        const formData = new FormData();
        formData.append("Fullname", debounced);
        await userService.saveInfo(formData);
        dispatch(getCurrentUser());
      } catch (error) {}
    };
    fetchApi();
  }, [debounced, dispatch, UserMe?.Fullname]);

  const hanldeChangeName = (e) => {
    setName(e.target.value);
  };
  return (
    <div className="container aside-container" style={{ margin: "auto" }}>
      <div
        className="d-flex"
        style={{
          paddingBottom: "1rem",
          borderBottom: "1px solid #CACACA",
        }}
      >
        <div
          className=""
          style={{
            height: "46px",
            marginRight: "1rem",
          }}
        >
          <img
            src={UserMe?.Image !== null ? convertImage(UserMe?.Image) : noBody}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div>
          <span>Thông tin tài khoản</span>
          <div className="d-flex justify-content-center align-items-center">
            {/* <h5 style={{ marginBottom: "0" }}> */}
            <Input
              ref={ref}
              value={name}
              style={{
                background: "transparent",
                border: "none",
                padding: "0",
              }}
              placeholder="Basic usage"
              onChange={hanldeChangeName}
            />
            {/* </h5> */}
            <Button
              onClick={() => {
                ref.current.focus();
              }}
              type="text"
            >
              <EditOutlined style={{ color: "#03AC84" }} />
            </Button>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          marginTop: "1rem",
          borderBottom: "1px solid #CACACA",
          paddingBottom: "1rem",
        }}
      >
        <h5 style={{ textTransform: "uppercase" }}>Tài khoản của tôi</h5>
        {ITEM_USER_ACCOUNT_ASIDE.map((item, index) => (
          <AsideItems item={item} key={index} />
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h5 style={{ textTransform: "uppercase" }}>Về chúng tôi</h5>
        {ITEM_US_ASIDE.map((item, index) => (
          <AsideItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Aside;
