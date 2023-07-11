import { Carousel, Image } from "antd";
import React, { useState } from "react";
import { memo } from "react";
import { convertImage } from "../../../../utils/convertImage";
import ReadMoreInfoService from "../../../../components/ReadMoreInfoService";
import expand from "../../../../assets/svg/expand.svg";
import chair from "../../../../assets/svg/chair.svg";
import conditional from "../../../../assets/svg/conditional.svg";
import { TeamOutlined } from "@ant-design/icons";
import { convertPrice } from "../../../../utils/convert";

import "./InfoServiceDesk.scss";

const InfoServiceDesk = ({ data }) => {
  const [visible, setVisible] = useState();
  return (
    <div style={{ maxWidth: "300px" }}>
      <Carousel autoplay style={{ width: "100%" }}>
        {data?.Image.map((val) => (
          <Image
            key={val}
            preview={{ visible: false }}
            src={convertImage(val)}
            onClick={() => setVisible(data?.id)}
          />
        ))}
      </Carousel>
      <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{
            visible: Boolean(visible === data?.id),
            onVisibleChange: (vis) => setVisible(vis),
          }}>
          {data?.Image.map((val) => (
            <Image src={convertImage(val)} />
          ))}
        </Image.PreviewGroup>
      </div>
      <div
        className="mt-10"
        style={{
          color: "#222222",
          fontSize: "16px",
          fontWeight: "700",
          textTransform: "uppercase",
        }}>
        {data?.Name}
      </div>
      <ReadMoreInfoService>
        <div
          className="mt-10"
          style={{
            color: "#222222",
            fontSize: "16px",
            fontWeight: "700",
          }}>
          <div>
            <img
              alt=""
              src={expand}
              className="me-10 mb-2"
              style={{ fontSize: "15px" }}
            />
            Kích thước
          </div>
          <ul className={"detail-description"}>
            <li>Diện tích {data?.Area}m2</li>
            <li>Chiều rộng {data?.Width}m</li>
            <li>Chiều dài {data?.Length}m</li>
            <li>Chiều cao trần {data?.Height}m</li>
          </ul>
        </div>
        <div
          className="mt-10"
          style={{
            color: "#222222",
            fontSize: "16px",
            fontWeight: "700",
          }}>
          <div>
            <img
              alt=""
              src={chair}
              className="me-10 mb-2"
              style={{ fontSize: "15px" }}
            />
            Thiết bị có sẵn
          </div>
          <ul className={"detail-description"}>
            {data?.HasBackground && <li>{data?.BackgroundDescription}</li>}
            {data?.HasLamp && <li>{data?.LampDescription}</li>}
            {data?.HasTable && <li>Bàn</li>}
            {data?.HasChair && <li>Ghế</li>}
            {data?.HasSofa && <li>Sofa</li>}
            {data?.HasFlower && <li>Hoa</li>}
            {data?.HasOtherDevice && <li>{data?.OtherDeviceDescription}</li>}
          </ul>
        </div>
        <div
          className="mt-10"
          style={{
            color: "#222222",
            fontSize: "16px",
            fontWeight: "700",
          }}>
          <div>
            <img
              alt=""
              src={conditional}
              className="me-10 mb-2"
              style={{ fontSize: "15px" }}
            />
            Tiện ích đi kèm
          </div>
          <ul className={"detail-description"}>
            {data?.HasAirConditioner && <li>Máy lạnh</li>}
            {data?.HasFan && <li>Quạt</li>}
            {data?.HasDressingRoom && <li>Phòng thay đồ riêng</li>}
            {data?.HasWC && <li>Nhà vệ sinh</li>}
            {data?.HasCamera && <li>Camera</li>}
            {data?.HasWifi && <li>Wifi</li>}
            {data?.HasMotorBikeParking && <li>Chổ để xe máy</li>}
            {data?.HasCarParking && <li>Chổ để xe ô tô</li>}
            {data?.HasSupporter && <li>Người hỗ trợ</li>}
          </ul>
        </div>
        <div
          className="mt-10"
          style={{
            color: "#222222",
            fontSize: "16px",
            fontWeight: "700",
          }}>
          <div>
            <TeamOutlined className="me-10 mb-2" style={{ fontSize: "15px" }} />
            Số lượng khách
          </div>
          <ul className={"detail-description"}>
            <li>Số lượng khách tối đa: {data?.MaximumCustomer} người</li>
            <li>Phụ thu: {convertPrice(data?.Surcharge)} VND/người</li>
          </ul>
        </div>
        <div style={{ marginTop: "5px" }}>
          <h5 style={{ margin: "0px" }}>Mô tả phòng</h5>
          <p
            style={{
              fontWeight: 400,
              fontSize: "16px",
              color: "#222222",
            }}>
            {data?.Description}
          </p>
        </div>
      </ReadMoreInfoService>
    </div>
  );
};

export default memo(InfoServiceDesk);
