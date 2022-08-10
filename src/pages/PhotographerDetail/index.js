import { useParams } from "react-router-dom";
import {
  EnvironmentOutlined,
  HeartOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import "./photographerDetail.scss";
import { ReactComponent as Check } from "../../assets/PhotographerDetail/check 2.svg";
import img1 from "../../assets/PhotographerDetail/pexels-burst-545032 2.png";
import img2 from "../../assets/PhotographerDetail/pexels-burst-545032 3.png";
import img3 from "../../assets/PhotographerDetail/pexels-burst-545032 4.png";
import img4 from "../../assets/PhotographerDetail/pexels-burst-545032 5.png";
import img5 from "../../assets/PhotographerDetail/pexels-burst-545032 6.png";
import { Rate } from "antd";

const data = {
  name: "Thợ chụp ảnh James Webb",
  location: "Quận 1, HCM",
  rating: 5,
  hasBeenBooked: 60,
  image: [img1, img2, img3, img4, img5],
};

const PhotographerDetail = () => {
  const { photographerId } = useParams();
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
          <div className="photographer-detail__container__header__image"></div>
        </header>
      </div>
    </section>
  );
};

export default PhotographerDetail;
