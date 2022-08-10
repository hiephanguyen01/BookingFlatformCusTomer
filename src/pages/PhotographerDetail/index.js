import { useParams } from "react-router-dom";
import {
  EnvironmentOutlined,
  HeartOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./photographerDetail.scss";
import { ReactComponent as Check } from "../../assets/PhotographerDetail/check 2.svg";
import img1 from "../../assets/PhotographerDetail/pexels-burst-545032 2.png";
import img2 from "../../assets/PhotographerDetail/pexels-burst-545032 3.png";
import img3 from "../../assets/PhotographerDetail/pexels-burst-545032 4.png";
import img4 from "../../assets/PhotographerDetail/pexels-burst-545032 5.png";
import img5 from "../../assets/PhotographerDetail/pexels-burst-545032 6.png";
import img6 from "../../assets/PhotographerDetail/Frame 67.png";
import { ReactComponent as Shop } from "../../assets/PhotographerDetail/Vector.svg";
import { Rate, Row, Col, Table } from "antd";
import map from "../../assets/PhotographerDetail/map 1.png";
import { useState } from "react";

const data = {
  name: "Thợ chụp ảnh James Webb",
  location: "Quận 1, HCM",
  detailAddress: "36, Lý Tự Trọng, Quận 1, TP. Hồ Chí Minh",
  rating: 5,
  hasBeenBooked: 60,
  image: [img1, img2, img3, img4, img5],
  description:
    "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum",
  coupons: ["Giảm 100k", "Giảm 50k", "Giảm 50k", "Giảm 50k"],
};

const PhotographerDetail = () => {
  const { photographerId } = useParams();
  const [servicesSelected, setServicesSelected] = useState([]);

  const tableData = [
    {
      key: "1",
      name: {
        name: "Chụp ngoại cảnh - Khu vực nội thành TP.HCM",
        image: img6,
      },
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney",
      price: {
        currPrice: "1.200.000đ",
        oldPrice: "550.000đ",
      },
      servicesSelected: true,
    },
    {
      key: "2",
      name: {
        name: "Chụp ngoại cảnh - Khu vực nội thành TP.HCM",
        image: img6,
      },
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of classical Latin literature from 45 BC,making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney",
      price: {
        currPrice: "1.200.000đ",
        oldPrice: "550.000đ",
      },
      servicesSelected: false,
    },
  ];

  const columns = [
    {
      title: "Dịch vụ",
      dataIndex: "name",
      render: (obj) => (
        <div className="d-flex flex-column">
          <img src={obj.image} alt="" />
          <p>{obj.name}</p>
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Giá cho thời gian bạn đã chọn",
      dataIndex: "price",
      render: (text) => (
        <div>
          <div className="service-price">
            <h3 style={{ color: "#E22828" }}>{text.currPrice}</h3>
            <p
              style={{
                color: "#828282",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "17px",
                textDecoration: "line-through",
              }}
            >
              {text.oldPrice}
            </p>
          </div>
          <p
            style={{
              color: "#828282",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "17px",
            }}
          >
            Đã bao gồm 50.000 thuế và phí
          </p>
          <div
            style={{
              padding: "3px 20px 3px 20px",
              backgroundColor: "#E22828",
              borderRadius: "4px",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "22px",
              }}
            >
              Giảm 50%
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Chọn dịch vụ",
      dataIndex: "servicesSelected",
      render: (text) =>
        text ? (
          <button
            style={{
              color: "#000",
              fontSize: "14px",
              fontWeight: "700",
              lineHeight: "20px",
              backgroundColor: "#E7E7E7",
              borderRadius: "8px",
              padding: "15px 18px",
            }}
          >
            Bỏ chọn
          </button>
        ) : (
          <button
            style={{
              color: "#E22828",
              fontSize: "14px",
              fontWeight: "700",
              lineHeight: "20px",
              backgroundColor: "transparent",
              borderRadius: "8px",
              border: "1px solid #E22828",
              padding: "14px 30px",
            }}
          >
            Chọn
          </button>
        ),
    },
  ];

  let tempCount = data.image.length;
  let ImageSection = (
    <div className="image-section d-flex justify-content-between">
      <div className="first-image">
        <img src={img1} alt="" />
      </div>
      <Row className="second-image-section" gutter={[16, 16]}>
        {data.image.slice(1).map((item, idx) => (
          <Col
            className="greater-than-four-images-section"
            key={idx}
            md={12}
            // xs={24}
            // onClick={() => handleImageModal(item)}
          >
            <div className="image-container">
              {idx === 4 && tempCount > 4 && (
                <div className="fourth-image-overlay d-flex justify-content-center align-items-center">
                  <h1>{tempCount - 3}</h1>
                  <PlusOutlined style={{ fontSize: "34px", color: "#fff" }} />
                </div>
              )}
              {idx < 4 && (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  key={idx}
                  src={item}
                  alt=""
                />
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );

  return (
    <section className="photographer-detail">
      <div className="photographer-detail__container container">
        <header className="photographer-detail__container__header">
          <div className="photographer-detail__container__header__info d-flex justify-content-between">
            <div className="photographer-detail__container__header__info__right-side d-flex flex-column">
              <div className="photographer-detail__container__header__info__right-side__name d-flex align-items-center">
                <p>{data.name}</p> <Check />
              </div>
              <div className="photographer-detail__container__header__info__right-side__locate d-flex align-items-center">
                <EnvironmentOutlined
                  style={{
                    height: "fit-content",
                    fontSize: "16px",
                    color: "#828282",
                  }}
                />
                <p>{data.location}</p>
              </div>
              <div className="photographer-detail__container__header__info__right-side__rating d-flex align-items-center">
                <div className="stars d-flex align-items-center">
                  <Rate
                    style={{ fontSize: "13px" }}
                    disabled
                    defaultValue={data.rating}
                  />
                  <div className="star-number">{data.rating}</div>
                </div>
                <div className="has-booked">
                  <p>Đã đặt {data.hasBeenBooked}</p>
                </div>
              </div>
            </div>
            <div className="photographer-detail__container__header__info__left-side d-flex align-items-start">
              <HeartOutlined
                style={{
                  fontSize: "25px",
                  color: "#E22828",
                  marginRight: "10px",
                }}
              />
              <MoreOutlined
                style={{
                  fontSize: "25px",
                }}
              />
            </div>
          </div>
          <div className="photographer-detail__container__header__image">
            {ImageSection}
          </div>
        </header>
        {/* <section className="photographer-detail__container__description"> */}
        <Row
          style={{ width: "100%", marginRight: "0", marginLeft: "0" }}
          gutter={[18]}
        >
          <Col style={{ padding: "0" }} md={16}>
            <Row className="photographer-detail__container__description">
              <Col md={24}>
                <h3>Mô tả</h3>
                <p>{data.description}</p>
              </Col>
            </Row>
            <Row className="photographer-detail__container__coupon">
              <Col md={24}>
                <h3>4 mã khuyến mãi</h3>
                <ul className="d-flex">
                  {data.coupons.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>
          <Col md={8} className="photographer-detail__container__map">
            <h3>Xem trên bản đồ</h3>
            <p>
              <EnvironmentOutlined
                style={{ fontSize: "16px", color: "#828282" }}
              />{" "}
              {data.detailAddress}
            </p>
            <img
              style={{
                width: "100%",
                height: "210px",
                objectFit: "cover",
                marginTop: "15px",
              }}
              src={map}
              alt=""
            />
          </Col>
        </Row>
        <Row style={{ marginLeft: "0", marginRight: "0" }} gutter={[18, 18]}>
          <Col
            style={{ paddingLeft: "0" }}
            md={16}
            className="photographer-detail__container__services"
          >
            <Table
              columns={columns}
              dataSource={tableData}
              bordered
              pagination={false}
            />
          </Col>
          <Col
            md={8}
            className="photographer-detail__container__chosen-services"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
          >
            <div style={{ width: "100%" }}>
              <div className="photographer-detail__container__chosen-services__header d-flex align-items-center">
                <p>Đã chọn 2 dịch vụ</p>
                <p>1.800.000đ</p>
              </div>
              <div className="photographer-detail__container__chosen-services__second-line d-flex align-items-center">
                <p>Bao gồm 50.000đ thuế và phí</p>
                <p>1.500.000đ</p>
              </div>
              <div className="photographer-detail__container__chosen-services__third-line d-flex align-items-center">
                <button>
                  <Shop />
                  <p>Thêm vào giỏ hàng</p>
                </button>
                <button>
                  <p>Đặt ngay</p>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        {/* </section> */}
      </div>
    </section>
  );
};

export default PhotographerDetail;
