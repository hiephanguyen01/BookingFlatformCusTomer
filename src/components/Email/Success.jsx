import React from "react";
import "./style.scss";
import logo from "./assets/Logo.svg";
import ss from "./assets/ss.svg";
import appstore from "./assets/appstore.svg";
import ggplay from "./assets/ggplay.svg";
import meme from "./assets/meme.svg";
const Success = () => {
  return (
    <div className="success">
      <div className="success__container">
        <div className="success__container__img">
          <img src={logo} alt="1" />
        </div>
        <div className="success__container__img">
          <img src={ss} alt="1" />
        </div>
        <div className="success__container__cfm">
          Đơn đặt của quý khách đã được xác nhận!
        </div>
        <div className="success__container__name">
          Quý khách Nguyen Thi Hoang Anh,
        </div>
        <div className="success__container__desc">
          Mã booking của quý khách là 12345678. Để quản ký đơn đặt, vui lòng sử
          dụng nền tảng Booking Studio để theo dõi dễ dàng hơn
        </div>
        <a href="" className="success__container__myorder">
          Đơn đặt của tôi
        </a>
        <div className="success__container__divider"></div>
        <div className="success__container__order">
          Wisteria Studio - chuyên cung cấp các dịch vụ quay, chụp hình cưới
        </div>
        <div className="success__container__order__card">
          <div className="success__container__order__card__img">
            <img
              src="https://am.bookingstudio.vn/api/image/1ea8f866-b8cf-c377-73a5-3a015a59e2b9"
              alt="1"
            />
          </div>
          <div className="success__container__order__card__text">
            <div className="success__container__order__card__text__addr">
              52 - 54B Ngõ Huyện, Phố Hàng Trống, Phường Hàng Trống, Hà Nội,
              Việt Nam
            </div>
            <div className="success__container__order__card__text__phone">
              02866868869
            </div>
          </div>
        </div>
        <div className="success__container__order">THÔNG TIN ĐƠN ĐẶT</div>
        <div className="success__container__info">
          <table>
            <tr>
              <td>Mã booking</td>
              <td>12345678</td>
            </tr>
            <tr>
              <td>Phòng</td>
              <td>Studio Wisteria - Phòng phối cảnh Hồng Kông</td>
            </tr>
            <tr>
              <td>Bắt đầu</td>
              <td>Ngày 14 tháng 02 năm 2022 08:00 AM </td>
            </tr>
            <tr>
              <td>Kết thúc</td>
              <td>Ngày 14 tháng 02 năm 2022 10:00 AM </td>
            </tr>
            <tr>
              <td>Người đặt</td>
              <td>Nguyen Thi Hoang Anh</td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>0914481315</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>hoanganhnguyen96kt@gmail.com</td>
            </tr>
            <tr>
              <td>Lời nhắn</td>
              <td>Không</td>
            </tr>
          </table>
        </div>
        <div className="success__container__order">THÔNG TIN THANH TOÁN</div>
        <div className="success__container__checkout">
          <div className="success__container__checkout__line">
            <div className="success__container__checkout__line__text">
              1 phòng x 2 giờ
            </div>
            <div className="success__container__checkout__line__text">
              400.000 VND
            </div>
          </div>
          <div className="success__container__checkout__line">
            <div className="success__container__checkout__line__text">
              Khuyến mãi
            </div>
            <div className="success__container__checkout__line__text">
              - 0 VND
            </div>
          </div>
          <div className="success__container__checkout__divider"></div>
          <div className="success__container__checkout__line">
            <div className="success__container__checkout__line__text">
              Tổng tạm tính
            </div>
            <div className="success__container__checkout__line__text">
              400.000 VND
            </div>
          </div>
          <div className="success__container__checkout__line">
            <div className="success__container__checkout__line__text">
              Tiền cọc
            </div>
            <div className="success__container__checkout__line__text">
              - 100.000 VND
            </div>
          </div>
          <div className="success__container__checkout__divider"></div>
          <div className="success__container__checkout__line">
            <div className="success__container__checkout__line__text bold">
              Tổng thanh toán (còn lại)
            </div>
            <div className="success__container__checkout__line__text bold">
              300.000 VND
            </div>
          </div>
        </div>
        <div className="success__container__noti">
          Bao gồm 40.000 VND thuế và phí.
          <br />
          Quý khách sẽ thanh toán 300.000 VND vào ngày 13/02/2022
        </div>
        <div className="success__container__checkout">
          <div className="success__container__checkout__line">
            <div className="success__container__checkout__line__text">
              Hình thức thanh toán
            </div>
            <div className="success__container__checkout__line__text">
              Thanh toán bằng tiền mặt
            </div>
          </div>
        </div>
        <div className="success__container__divider"></div>
        <div className="success__container__order">CHÍNH SÁCH HUỶ</div>
        <div className="success__container__privacy">
          <div className="success__container__privacy__col">
            <div className="success__container__privacy__col__bar green"></div>
            <div className="success__container__privacy__col__text">
              <div className="success__container__privacy__col__text__title t-green">
                Hủy miễn phí
              </div>
              <div className="success__container__privacy__col__text__normal">
                Cho đến 13/02/2022 11:59 PM
              </div>
            </div>
          </div>
          <div className="success__container__privacy__col">
            <div className="success__container__privacy__col__bar red"></div>
            <div className="success__container__privacy__col__text">
              <div className="success__container__privacy__col__text__title t-red">
                Hủy không hoàn tiền
              </div>
              <div className="success__container__privacy__col__text__normal">
                Từ 14/02/2022 00:00 AM
              </div>
            </div>
          </div>
        </div>
        <div className="success__container__noti">
          Quý khách có thể hủy đơn đặt cho đến 13/02/2022 11:50 PM mà không mất
          phí gì và được hoàn tiền 100% (nếu có thanh toán trước đó).
          <br />
          <br />
          Hủy đơn đặt sau thời gian trên hoặc vắng mặt sẽ không được hoàn tiền.
        </div>
        <div className="success__container__footer">
          <div className="success__container__footer__left">
            <div className="success__container__footer__left__title">
              TẢI ỨNG DỤNG BOOKING STUDIO
            </div>
            <div className="success__container__footer__left__download">
              <img src={appstore} alt="" />
              <img src={ggplay} alt="" />
            </div>
            <div className="success__container__footer__left__des">
              Theo dõi chúng tôi
            </div>
            <ul className="success__container__footer__left__icon">
              <li>
                <a href="">ICON</a>
              </li>
              <li>
                <a href="">ICON</a>
              </li>
              <li>
                <a href="">ICON</a>
              </li>
              <li>
                <a href="">ICON</a>
              </li>
              <li>
                <a href="">ICON</a>
              </li>
            </ul>
          </div>

          <div className="success__container__footer__right">
            <img src={meme} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
