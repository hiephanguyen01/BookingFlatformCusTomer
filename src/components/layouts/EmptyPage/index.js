import "./emptyPage.scss";
import { ReactComponent as Damage } from "../../../assets/damage 1.svg";

const EmptyPage = () => {
  return (
    <div className="empty-page d-flex flex-column justify-content-center align-items-center">
      <Damage />
      <h3>Không tìm thấy kết quả</h3>
      <p>
        Booking Studio không tìm thấy kết quả khớp với sự tìm kiếm của quý khách
      </p>
    </div>
  );
};

export default EmptyPage;
