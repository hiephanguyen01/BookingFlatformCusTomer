import {
  CommentOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  HeartOutlined,
  PhoneOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  SafetyCertificateOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ImgDefaultUser from "../../../../assets/img/userAccount/default-user-image.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImageDetect } from "../../../../components/ImageDetect/ImageDetect";
import noBody from "../../../../assets/img/no-body.png";
import useDebounce from "../../../../components/hooks/useDebounce";
import { userService } from "../../../../services/UserService";
import { getCurrentUser } from "../../../../stores/actions/autheticateAction";

const ITEM_USER_ACCOUNT_ASIDE = [
  {
    icon: <UserOutlined style={{ height: "100%" }} />,
    title: "Thông tin tài khoản",
    linkTo: "accountInfo",
  },
  {
    icon: <ReconciliationOutlined style={{ height: "100%" }} />,
    title: "Lịch sử đơn đặt",
    linkTo: "orderStatus",
  },
  {
    icon: <HeartOutlined style={{ height: "100%" }} />,
    title: "Đã thích",
    linkTo: "liked",
  },
  {
    icon: <CommentOutlined style={{ height: "100%" }} />,
    title: "Đánh giá của tôi",
    linkTo: "rating",
  },
  {
    icon: <FileTextOutlined style={{ height: "100%" }} />,
    title: "Bài viết của tôi",
    linkTo: "posts",
  },
  {
    icon: <SaveOutlined style={{ height: "100%" }} />,
    title: "Bài viết đã lưu",
    linkTo: "post-saved",
  },
  {
    icon: <EyeOutlined style={{ height: "100%" }} />,
    title: "Đã xem gần đây",
    linkTo: "recently-viewed",
  },
];
const ITEM_US_ASIDE = [
  {
    icon: <ReadOutlined style={{ height: "100%" }} />,
    title: "Điều khoản sử dụng",
    linkTo: "clause",
  },
  {
    icon: <SafetyCertificateOutlined style={{ height: "100%" }} />,
    title: "Chính sách an toàn & bảo mật",
    linkTo: "policy",
  },
  {
    icon: <PhoneOutlined style={{ height: "100%" }} />,
    title: "Hỗ trợ",
    linkTo: "support",
  },
];

const Aside = ({ children }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  console.log("uer me", UserMe);
  const ref = useRef(null);
  const [name, setName] = useState(UserMe.Fullname);
  const debounced = useDebounce(name, 500);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // console.log(pathname.split("/")[4]);
  const newPathname = pathname.split("/")[4];
  // useEffect(() => {
  //   if (UserMe.Fullname) {
  //     setName(UserMe.Fullname);
  //   }
  // }, [UserMe]);
  const AsideItems = ({ item }) => {
    return (
      <Link
        to={item.linkTo}
        style={
          newPathname === item.linkTo
            ? { color: "#E22828" }
            : { color: "#222222" }
        }
      >
        <div
          style={{
            padding: "0.5rem 0",
            cursor: "pointer",
          }}
        >
          {item.icon}
          <span
            style={
              newPathname === item.linkTo
                ? {
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                    fontWeight: "600",
                  }
                : { fontSize: "16px", marginLeft: "0.5rem", fontWeight: "400" }
            }
          >
            {item.title}
          </span>
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
        setName(UserMe.Fullname);
        return;
      }
      if (!debounced.trim()) {
        setName(UserMe.Fullname);
        return;
      }
      try {
        const formData = new FormData();
        formData.append("Fullname", debounced);
        await userService.saveInfo(formData);
        dispatch(getCurrentUser());
        console.log("update debounce");
      } catch (error) {
        console.log("fail");
      }
    };
    fetchApi();
  }, [debounced, dispatch]);

  const hanldeChangeName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };
  return (
    <div className="container" style={{ margin: "auto" }}>
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
            src={UserMe.Image !== null ? ImageDetect(UserMe) : noBody}
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
        <h5 style={{ textTransform: "uppercase" }}>Tài khoản của chúng tôi</h5>
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
