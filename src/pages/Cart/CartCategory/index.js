import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import CheckBox from "../../../components/CheckBox";
import { convertImage } from "../../../utils/convertImage";
import { convertPrice } from "../../../utils/convert";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const CartCategory = (props) => {
  const {
    categoryId,
    postUrlEnpoint,
    servicePackageName,
    handleOnCheckedAll,
    handleOnChecked,
    handleBtnDelete,
  } = props;

  const { cart, chooseServiceList } = useSelector((state) => state.CartReducer);

  const navigate = useNavigate();

  return (
    <Row gutter={[0, 6]}>
      {cart[postUrlEnpoint]?.map((orderItem, index) => (
        <Col span={24} className="wrapper" key={index}>
          <CheckBox
            key={index}
            name="allCheck"
            value="allCheck"
            onClick={() => handleOnCheckedAll(categoryId, orderItem)}
            checked={
              chooseServiceList.length > 0 &&
              chooseServiceList.filter((item) => {
                return orderItem?.Services.some(
                  (item2) =>
                    item?.Category === categoryId && item?.id === item2?.id
                );
              }).length === orderItem?.Services?.length
            }
          >
            <div
              style={{
                fontWeight: "400",
                fontSize: "14px",
                lineHeight: "19px",
                color: "#3F3F3F",
              }}
            >
              {orderItem?.Name}
            </div>
          </CheckBox>
          {orderItem?.Services?.map((item, index) => (
            <CheckBox
              onClick={() =>
                handleOnChecked(
                  categoryId,
                  item,
                  orderItem?.Id,
                  orderItem?.Name
                )
              }
              key={index}
              name={item?.id}
              value={item?.id}
              checked={
                chooseServiceList.length > 0
                  ? chooseServiceList.some(
                      (service) =>
                        service?.id === item?.id &&
                        service?.Category === categoryId
                    )
                  : false
              }
            >
              <Row
                className="checkbox_content w-100"
                align={"middle"}
                justify={"space-between"}
                gutter={[15, 10]}
              >
                <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                  <Row className="w-100 h-100" gutter={(0, 10)}>
                    <Col span={6} className="">
                      <img
                        src={convertImage(item?.StudioRoom?.Image1)}
                        className="w-100 h-80px"
                        style={{ objectFit: "cover", cursor: "pointer" }}
                        alt=""
                        onClick={() =>
                          navigate(`/home/${postUrlEnpoint}/${orderItem?.Id}`)
                        }
                      />
                    </Col>
                    <Col span={18}>
                      <label
                        className="checkbox_label"
                        onClick={() =>
                          navigate(`/home/${postUrlEnpoint}/${orderItem?.Id}`)
                        }
                      >
                        {item[servicePackageName]?.Name}
                      </label>
                    </Col>
                  </Row>
                </Col>
                <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                  <Row
                    className="w-100 mb-20"
                    gutter={[0, 10]}
                    align={"top"}
                    justify={"space-between"}
                  >
                    <Col span={12} className="checkbox_desc">
                      {item.OrderByTime ? (
                        <>
                          <div>
                            Ngày
                            <span className="date">
                              {moment(item?.OrderByTimeFrom)
                                .utc()
                                .format("DD/MM/YYYY")}
                            </span>
                          </div>
                          <div>
                            Giờ
                            <span className="date">
                              {moment(item?.OrderByTimeFrom)
                                .utc()
                                .format("HH:mm")}
                            </span>
                            {" - "}
                            <span>
                              {moment(item?.OrderByTimeTo)
                                .utc()
                                .format("HH:mm")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div>
                          Ngày
                          <span className="date">
                            {moment(item?.OrderByDateFrom)
                              .utc()
                              .format("DD/MM/YYYY")}
                          </span>
                          {" - "}
                          <span>
                            {moment(item?.OrderByDateTo)
                              .utc()
                              .format("DD/MM/YYYY")}
                          </span>
                        </div>
                      )}
                    </Col>
                    <Col span={12} className="checkbox_action">
                      <div onClick={() => handleBtnDelete(item?.id)}>Xóa</div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} className="">
                      <div className="price">{convertPrice(item?.price)}đ</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CheckBox>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default CartCategory;
