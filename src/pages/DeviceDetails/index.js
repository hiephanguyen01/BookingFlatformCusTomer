import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
  MinusOutlined,
  MoreOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Col, InputNumber, Popover, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import "./deviceDetails.scss";

import CommentRating from "../../components/CommentRating";
import ReadMoreDesc from "../../components/ReadMoreDesc";

import svgLocation from "../../assets/svg/location.svg";
import imgPost from "../../assets/dao/Frame 163.jpg";
import ImagePost from "../../components/imagePost/ImagePost";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { SlideCard } from "../StudioDetail/SlideCard";
// import { SET_PROMOTION_CODE_USER_SAVE } from "../../stores/types/promoCodeType";
import {
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
} from "../../stores/types/studioPostType";
import PromotionList from "../../components/PromotionList/PromotionList";
// import Voucher from "../../components/Voucher";
import { Report } from "../StudioDetail/Report";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import toastMessage from "../../components/ToastMessage";

const Index = () => {
  const { studioDetail, listStudioSimilar, promotionCode, filterService } =
    useSelector((state) => state.studioPostReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] === "device"
      ? 5
      : undefined;

  const filter_promo = promotionCode
    ?.filter((item) => item.SaleCode.DateTimeExpire > new Date().toISOString())
    ?.reduce((arr, item) => {
      if (
        promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id).length >
        0
      ) {
        return [...arr];
      }
      return [...arr, item];
    }, []);

  const [amount, setAmount] = useState(1);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(studioDetailAction(id, cate, currentUser?.id));
    } else {
      dispatch(studioDetailAction(id, cate));
    }
    dispatch(getStudioSimilarAction(id, cate));
  }, [currentUser, id, cate, dispatch]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    return () => {
      dispatch({ type: SET_STUDIO_DETAIL, payload: {} });
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
    };
  }, [dispatch]);

  const handleChangeLike = (e) => {
    if (currentUser) {
      dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
    }
  };

  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
    });
  };

  const handleBook = () => {
    if (amount > 0 && filterService.OrderByTime !== -1) {
      // dispatch(chooseServiceAction(chooseService));
      navigate("order");
    }
  };
  return (
    <>
      <MetaDecorator
        title={studioDetail?.data?.Name}
        description={studioDetail?.data?.Description}
        imgUrl={studioDetail?.data?.Image[0]}
        type="article"
        imgAlt="Booking Studio Details"
      />
      {Object.keys(studioDetail).length <= 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              width: "fit-content",
              borderRadius: "50%",
              padding: "10px",
              margin: "10px",
            }}
          >
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </div>
        </div>
      ) : (
        <div className="container_detail">
          <div className="costume_container">
            <div className="wrapper_banner">
              <div
                className="d-flex justify-content-between align-items-center header"
                style={{ marginBottom: "11px" }}
              >
                <div className="header_title">
                  {studioDetail?.data?.Name}
                  <CheckCircleOutlined className="icon_check_circle" />
                </div>
                <div className="d-flex align-items-center">
                  <PopUpSignIn
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {studioDetail?.data?.UsersLiked ? (
                      <HeartFilled
                        style={{
                          fontSize: "25px",
                          color: "#E22828",
                          marginRight: "10px",
                        }}
                        onClick={handleChangeLike}
                      />
                    ) : (
                      <HeartOutlined
                        style={{
                          fontSize: "25px",
                          color: "#E22828",
                          marginRight: "10px",
                        }}
                        onClick={handleChangeLike}
                      />
                    )}
                    {/* <HeartOutlined className="icon_heart" /> */}
                  </PopUpSignIn>
                  {/* <Dropdown overlay={menu_report} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <MoreOutlined
                          style={{
                            fontSize: "26px",
                          }}
                          className="mt-5 h-100"
                        />
                      </Space>
                    </a>
                  </Dropdown> */}
                  <Popover
                    placement="bottomRight"
                    content={
                      <div
                        onClick={() => handleReport()}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                          }}
                        >
                          <WarningOutlined style={{ fontSize: "20px" }} />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            Báo cáo
                          </span>
                        </div>
                      </div>
                    }
                    trigger="click"
                  >
                    <MoreOutlined
                      style={{
                        fontSize: "25px",
                      }}
                    />
                  </Popover>
                </div>
              </div>
              <div className="location">
                <img
                  src={svgLocation}
                  style={{ marginRight: "0.5rem" }}
                  alt=""
                />
                {studioDetail?.data?.Address}
              </div>
              <div className="d-flex align-items-center mb-15">
                <Rate
                  disabled
                  allowHalf
                  value={studioDetail?.data?.TotalRate}
                  className="rating d-flex align-items-center"
                />

                <span className="reserve">{studioDetail?.data?.TotalRate}</span>
                <span className="reserve">
                  Đã đặt {studioDetail?.data?.BookingCount}
                </span>
              </div>
              <ImagePost data={studioDetail?.data?.Image} />
            </div>
            <div className="wrapper_description">
              <Row style={{ height: "100%" }}>
                <Col
                  lg={16}
                  sm={24}
                  style={{ paddingRight: "0.25rem", height: "100%" }}
                  className="mb-12"
                >
                  <div className="desc_col_left">
                    <ReadMoreDesc title="Mô tả">
                      {studioDetail?.data?.Description}
                    </ReadMoreDesc>
                  </div>
                </Col>
                {studioDetail?.shop && (
                  <Col
                    lg={8}
                    sm={24}
                    style={{ paddingLeft: "0.25rem", height: "100%" }}
                    className="mb-12"
                  >
                    <div className="desc_col_right">
                      <div className="d-flex mb-30" style={{}}>
                        <img src={imgPost} className="avatar" alt="" />
                        <div className="">
                          <div className="desc_col_right_title">
                            {studioDetail?.shop?.Name}
                            <CheckCircleOutlined className="icon_check_circle" />
                          </div>
                          <div
                            className="text-medium-re"
                            style={{ marginBottom: "15px" }}
                          >
                            <img
                              src={svgLocation}
                              style={{ marginRight: "6px" }}
                              alt=""
                            />
                            {studioDetail?.shop?.Address}
                          </div>
                        </div>
                      </div>
                      <Button className="btn_see">
                        <Link to="shop">Xem shop</Link>
                        {/* <iframe
                      style={{ width: "100%", height: "100%", border: "0" }}
                      src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
            <Row className="mb-12">
              <Col lg={16} sm={24} style={{ paddingRight: "0.25rem" }}>
                <div
                  className="py-26 px-18"
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                >
                  <PromotionList data={filter_promo} />
                </div>
              </Col>
            </Row>
            <div className="w-100 mb-12 wrapper_list_costume">
              <Row>
                <Col
                  lg={16}
                  sm={24}
                  style={{ paddingRight: "0.25rem" }}
                  className="col_left"
                >
                  <div
                    className=" py-22 mb-12 h-100 px-22"
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    {filterService.OrderByTime === -1 && (
                      <div className="warning-choose-time ">
                        <ExclamationCircleOutlined className="me-5" />
                        Chọn khung giờ và số lượng bạn muốn đặt để xem giá cho
                        từng sản phẩm
                      </div>
                    )}
                    <p className="amount-label">Số lượng</p>
                    <div className="d-flex amount-wrapper my-15">
                      <MinusOutlined
                        className="btn-amount"
                        onClick={() => {
                          if (amount > 1) {
                            setAmount(amount - 1);
                          }
                        }}
                      />
                      <InputNumber
                        min={1}
                        max={100}
                        value={amount}
                        onChange={(value) => setAmount(value)}
                        className="amount-value"
                        controls={false}
                      />
                      {/* <div className="amount-value">
                        <p>{amount}</p>
                      </div> */}
                      <PlusOutlined
                        className="btn-amount"
                        onClick={() => setAmount(amount + 1)}
                      />
                    </div>
                    <p className="amount-label">Khung giờ bạn muốn đặt</p>
                    <br />
                    <SelectTimeOptionService className="" />
                  </div>
                </Col>
                <Col lg={8} sm={24} style={{ paddingLeft: "0.25rem" }}>
                  <div
                    style={{
                      padding: "24px 26px",
                      backgroundColor: "#ffffff",
                      // height: "100%",
                    }}
                  >
                    <div className="d-flex justify-content-between mb-12">
                      <div
                        className=""
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "25px",
                          /* Neutral/Grey 700 */
                          color: "#222222",
                        }}
                      >
                        Đã chọn {amount} sản phẩm
                      </div>
                      {amount > 0 && (
                        <div
                          style={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "22px",
                            textDecorationLine: "line-through",
                            /* Neutral/Grey 400 */
                            color: "#828282",
                          }}
                        >
                          0 đ
                        </div>
                      )}
                    </div>
                    <div className="d-flex justify-content-between mb-26">
                      <div className="text-medium-re">
                        Bao gồm 50.000đ thuế và phí
                      </div>
                      <div
                        style={{
                          fontWeight: "700",
                          fontSize: "20px",
                          lineHeight: "27px",
                          /* Primary/Red 700 */
                          color: "#E22828",
                        }}
                      >
                        0 đ
                      </div>
                    </div>
                    <div className="w-100 d-flex justify-content-between">
                      <Button
                        className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                        onClick={() =>
                          toastMessage(
                            "Chức năng này đang phát triển!",
                            "info",
                            1,
                            "",
                            {}
                          )
                        }
                      >
                        <ShoppingCartOutlined />
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        className="w-38 h-48px d-flex justify-content-center align-items-center btn_order"
                        onClick={handleBook}
                      >
                        Đặt ngay
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <Row>
              <Col lg={16} md={24}>
                {" "}
                <CommentRating data={studioDetail} className="mb-43" />
              </Col>
            </Row>
            {listStudioSimilar.length > 0 ? (
              <SlideCard
                data={listStudioSimilar}
                category={{ name: "device", id: 5 }}
                title="Thiết bị tương tự"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
