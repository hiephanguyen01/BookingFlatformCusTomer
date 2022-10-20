import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  EnvironmentOutlined,
  HeartOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  LoadingOutlined,
  HeartFilled,
  WarningOutlined,
} from "@ant-design/icons";
import "./photographerDetail.scss";
import Table from "../../components/Table";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import { ReactComponent as Check } from "../../assets/PhotographerDetail/check 2.svg";
import { Rate, Row, Col, Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideAlbum from "../MakeupDetails/components/SlideAlbum";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  getPromotionByTenantId,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import toastMessage from "../../components/ToastMessage";
import {
  addOrder,
  chooseServiceAction,
} from "../../stores/actions/OrderAction";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { convertImage } from "../../utils/convertImage";
import { SlideCard } from "../StudioDetail/SlideCard";
import PromotionList from "../../components/PromotionList/PromotionList";
import { calTime } from "../../utils/calculate";
import { getPromotionCodeUserSave } from "../../stores/actions/promoCodeAction";
import { setFilterStudioService } from "../../stores/actions/studioPostAction";
import { SET_PROMOTION_CODE_USER_SAVE } from "../../stores/types/promoCodeType";
import { SET_PROMOTION_CODE } from "../../stores/types/studioPostType";
import { Report } from "../StudioDetail/Report";
import { SHOW_MODAL } from "../../stores/types/modalTypes";

const COLUMN = [
  { title: "Dịch vụ", size: 5 },
  { title: "Mô tả", size: 8 },
  { title: "Giá cho thời gian bạn đã chọn ", size: 7 },
  { title: "Chọn dịch vụ", size: 4 },
];

const PhotographerDetail = () => {
  const { studioDetail, loading, filter, listStudioSimilar, promotionCode } =
    useSelector((state) => state.studioPostReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] ===
    "photographer"
      ? 2
      : undefined;

  const [chooseService, setChooseService] = useState([]);
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
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
    dispatch(getPromotionCodeUserSave());
    dispatch(getPromotionByTenantId(studioDetail?.data?.TenantId));
  }, [studioDetail]);

  useEffect(() => {
    // dispatch(
    //   setFilterStudioService(5, 1, {
    //     OrderByTime: filter.OrderByTime,
    //     OrderByTimeFrom: filter.OrderByTimeFrom,
    //     OrderByTimeTo: filter.OrderByTimeTo,
    //     OrderByDateFrom: filter.OrderByDateFrom,
    //     OrderByDateTo: filter.OrderByDateTo,
    //   })
    // );
    // let timeOut;
    // timeOut = setTimeout(() => {
    //   dispatch({
    //     type: SHOW_MODAL,
    //     Component: <Voucher />,
    //   });
    // }, 2000);
    // if (
    //   promotionCode
    //     ?.filter(
    //       (item) => item.SaleCode.DateTimeExpire > new Date().toISOString()
    //     )
    //     ?.reduce((arr, item) => {
    //       if (
    //         promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id)
    //           .length > 0
    //       ) {
    //         return [...arr];
    //       }
    //       return [...arr, item];
    //     }, []).length > 0
    // ) {
    //   timeOut = setTimeout(() => {
    //     dispatch({
    //       type: SHOW_MODAL,
    //       Component: <Voucher />,
    //     });
    //   }, 2000);
    // }
    return () => {
      // dispatch({ type: SET_PROMOTION_CODE_USER_SAVE, data: [] });
      // dispatch({ type: SET_PROMOTION_CODE, data: [] });
      // clearTimeout(timeOut);
    };
  }, []);

  const handleChooseService = (data) => {
    console.log(chooseService);
    if (chooseService.filter((itm) => itm.id === data.id).length > 0) {
      // console.log(data);
      setChooseService([]);
    } else {
      setChooseService([{ ...data }]);
    }
  };
  console.log(chooseService);
  const ROW = (dataSource = []) => {
    console.log(chooseService);
    if (dataSource.length > 0) {
      return dataSource?.map((data, index) => [
        {
          render: () => (
            <>
              <img
                src={`${
                  data?.Image?.length > 0 ? convertImage(data?.Image[0]) : ""
                }`}
                style={{ width: "100%", marginBottom: "20px" }}
                alt=""
              />
              <div className="text-medium-se">{`${data.Name}`}</div>
            </>
          ),
        },
        {
          render: () => <p>{data.Description}</p>,
        },
        {
          render: () => (
            <>
              <div className="d-flex align-items-center">
                <h4
                  className="me-10"
                  style={{
                    marginBottom: "0",
                    color: "#E22828",
                  }}>
                  {convertPrice(data.Sales)}đ
                </h4>
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#828282",
                    textDecoration: "line-through",
                  }}>
                  {convertPrice(data.Price)}đ
                </div>
              </div>
              <div
                className="mb-8 mt-4"
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#828282",
                }}>
                Bao gồm 50.000đ thuế và phí
              </div>
              <span
                className="text-medium-se"
                style={{
                  background: "#E22828",
                  borderRadius: "4px",
                  padding: "3px 10px",
                  color: "#ffffff",
                }}>
                Giảm {`${Math.floor(100 - (data.Sales / data.Price) * 100)}`}%
              </span>
            </>
          ),
        },
        {
          render: () => (
            <>
              {chooseService.filter((itm) => itm.id === data.id).length > 0 ? (
                <span
                  onClick={() => handleChooseService(data)}
                  style={{
                    backgroundColor: "#E7E7E7",
                    padding: "15px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textTransform: "uppercase",
                  }}>
                  Bỏ chọn
                </span>
              ) : (
                <span
                  onClick={() => handleChooseService(data)}
                  style={{
                    border: "1px solid #E22828",
                    color: "#E22828",
                    padding: "13px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textTransform: "uppercase",
                  }}>
                  Chọn
                </span>
              )}
            </>
          ),
        },
      ]);
    }
  };

  const handleBook = () => {
    if (chooseService.length > 0 && filter.OrderByTime !== -1) {
      dispatch(chooseServiceAction(chooseService));
      navigate("order");
    } else {
      if (filter.OrderByTime === -1) {
        toastMessage("Bạn cần chọn thời gian!", "warn");
      } else if (chooseService.length <= 0) {
        toastMessage("Bạn cần chọn dịch vụ!", "warn");
      }
    }
  };

  const handleAddCart = () => {
    if (chooseService.length > 0) {
      dispatch(addOrder(cate, chooseService));
      toastMessage("Đã thêm vào giỏ hàng!", "success");
    } else {
      toastMessage("Bạn cần chọn dịch vụ!", "warn");
    }
  };
  const handleChangeLike = (e) => {
    e.stopPropagation();
    if (!currentUser) navigate("/auth/sign-in");
    dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
  };
  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
    });
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
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}>
          <div
            style={{
              background: "white",
              width: "fit-content",
              borderRadius: "50%",
              padding: "10px",
              margin: "10px",
            }}>
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </div>
        </div>
      ) : (
        <div
          className="container-detail"
          style={{
            margin: "auto",
            backgroundColor: "rgb(245, 245, 245)",
            padding: "2rem 0",
          }}>
          <section className="photographer-detail">
            <div className="photographer-detail__container">
              <header className="photographer-detail__container__header">
                <div className="photographer-detail__container__header__info d-flex justify-content-between">
                  <div className="photographer-detail__container__header__info__right-side d-flex flex-column">
                    <div className="photographer-detail__container__header__info__right-side__name d-flex align-items-center">
                      <p>{studioDetail?.data?.Name}</p> <Check />
                    </div>
                    <div className="photographer-detail__container__header__info__right-side__locate d-flex align-items-center">
                      <EnvironmentOutlined
                        style={{
                          height: "fit-content",
                          fontSize: "16px",
                          color: "#828282",
                        }}
                      />

                      <p>{studioDetail?.data?.Address}</p>
                    </div>
                    <div className="photographer-detail__container__header__info__right-side__rating d-flex align-items-center">
                      <div className="stars d-flex align-items-center">
                        <Rate
                          style={{ fontSize: "13px" }}
                          disabled
                          defaultValue={5}
                        />
                        <div className="star-number">{5}</div>
                      </div>
                      <div className="has-booked">
                        <p>Đã đặt {studioDetail?.data?.BookingCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="photographer-detail__container__header__info__left-side d-flex align-items-start">
                    <PopUpSignIn
                      onClick={(e) => {
                        e.stopPropagation();
                      }}>
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
                    </PopUpSignIn>
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
                          }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              cursor: "pointer",
                            }}>
                            <WarningOutlined style={{ fontSize: "20px" }} />
                            <span
                              style={{ fontSize: "18px", fontWeight: "bold" }}>
                              Báo cáo
                            </span>
                          </div>
                        </div>
                      }
                      trigger="click">
                      <MoreOutlined
                        style={{
                          fontSize: "25px",
                        }}
                      />
                    </Popover>
                  </div>
                </div>
                <div className="photographer-detail__container__header__image">
                  <ImagePost data={studioDetail?.data?.Image} />
                </div>
              </header>
              <Row
                style={{ marginRight: "0", marginLeft: "0" }}
                gutter={[24, 24]}>
                <Col style={{ paddingLeft: "0" }} md={16}>
                  <Row className="photographer-detail__container__description">
                    <Col md={24}>
                      <ReadMoreDesc title="Chi tiết sản phẩm">
                        {studioDetail?.data?.Description}
                      </ReadMoreDesc>
                    </Col>
                  </Row>
                  <Row className="photographer-detail__container__coupon">
                    <Col md={24}>
                      <PromotionList data={filter_promo} />
                    </Col>
                  </Row>
                </Col>
                <Col md={8} className="photographer-detail__container__map">
                  <h3>Xem trên bản đồ</h3>
                  <p>
                    <EnvironmentOutlined
                      style={{ fontSize: "16px", color: "#828282" }}
                    />{" "}
                    {studioDetail?.data?.Address}
                  </p>
                  <div className="mapouter mt-10">
                    <div className="gmap_canvas">
                      <iframe
                        key={"aefwr"}
                        className="gmap_iframe"
                        width="380px"
                        height=""
                        frameBorder={0}
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src="https://maps.google.com/maps?width=667&height=255&hl=en&q=thi tran ha lam &t=&z=13&ie=UTF8&iwloc=B&output=embed"
                      />
                      <a href="https://embedmapgenerator.com/">
                        embed google maps in website
                      </a>
                    </div>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          ".mapouter{position:relative;text-align:right;width:100%;height:255px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:255px;}.gmap_iframe {height:255px!important;}",
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row
                style={{ marginLeft: "0", marginRight: "0" }}
                gutter={[18, 18]}>
                <Col
                  style={{ paddingLeft: "0" }}
                  md={16}
                  className="photographer-detail__container__services">
                  <div className="h-100" style={{ backgroundColor: "#fff" }}>
                    {/* <div className="ms-24 pt-20">
                      <SelectTimeOption />
                    </div> */}
                    <Table column={COLUMN} row={ROW(studioDetail?.service)} />
                  </div>
                </Col>
                <Col
                  md={8}
                  className="photographer-detail__container__chosen-services">
                  <div
                    style={{
                      padding: " 0 15px 0 15px",
                      backgroundColor: "#ffffff",
                    }}>
                    <div className="d-flex justify-content-between mb-12">
                      <div
                        className=""
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                          lineHeight: "25px",
                          color: "#222222",
                        }}>
                        Đã chọn {chooseService.length} sản phẩm
                      </div>
                      {chooseService.length > 0 && (
                        <div
                          style={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "22px",
                            textDecorationLine: "line-through",
                            color: "#828282",
                          }}>
                          {`${convertPrice(
                            chooseService?.reduce(
                              (total, item) =>
                                total +
                                item.Price *
                                  calTime(
                                    filter.OrderByTimeFrom,
                                    filter.OrderByTimeTo
                                  ),
                              0
                            )
                          )}`}
                          đ
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
                        }}>
                        {`${convertPrice(
                          chooseService?.reduce(
                            (total, item) =>
                              total +
                              item.Sales *
                                calTime(
                                  filter.OrderByTimeFrom,
                                  filter.OrderByTimeTo
                                ),
                            0
                          )
                        )}`}
                        đ
                      </div>
                    </div>
                    <div className="w-100 d-flex justify-content-between">
                      <Button
                        className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                        onClick={handleAddCart}
                        // disabled={chooseService.length > 0 ? false : true}
                      >
                        <ShoppingCartOutlined />
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        className="w-38 h-48px d-flex justify-content-center align-items-center btn_order"
                        onClick={handleBook}
                        // disabled={
                        //   chooseService.length > 0 && filter.OrderByTime !== -1
                        //     ? false
                        //     : true
                        // }
                      >
                        Đặt ngay
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
              {studioDetail?.album?.length > 0 && (
                <Row gutter={[18]}>
                  <Col md={16}>
                    <div className="album_container">
                      <h3>Các album</h3>
                      {toggleSeeMore ? (
                        studioDetail?.album
                          ?.sort((a, b) => a.id - b.id)
                          .map((item, index) => (
                            <SlideAlbum key={index} data={item} />
                          ))
                      ) : (
                        <>
                          {studioDetail?.album
                            ?.sort((a, b) => a.id - b.id)
                            .slice(0, 3)
                            .map((item, index) => (
                              <SlideAlbum key={index} data={item} />
                            ))}
                          <div
                            className="btn_see_more"
                            onClick={() => setToggleSeeMore(true)}>
                            Xem thêm <DownOutlined className="icon" />
                          </div>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              )}
              <Row gutter={[18, 18]}>
                <Col md={16}>
                  <CommentRating data={studioDetail} className="mb-43 mt-12" />
                </Col>
              </Row>
              {listStudioSimilar.length > 0 ? (
                <SlideCard
                  data={listStudioSimilar}
                  category={{ name: "photographer", id: 2 }}
                  title="Photographer tương tự"
                />
              ) : (
                <></>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default PhotographerDetail;
