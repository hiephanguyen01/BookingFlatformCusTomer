import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Pagination, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { orderService } from "../../../../services/OrderService";
import OrderStatusItem from "./conponents/OrderStatusItem/OrderStatusItem";
import "./orderStatus.scss";
const { TabPane } = Tabs;
const keyF = {
  1: { BookingStatus: 4, PaymentStatus: 1 },
  2: { BookingStatus: 4, PaymentStatus: [4, 3, 2] },
  3: { BookingStatus: 1, PaymentStatus: 3 },
  4: { BookingStatus: 2 },
};
const OrderStatus = () => {
  const [booking, setBooking] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageBooking, setPageBooking] = useState([]);
  const EntryDate = { startDate: "", endDate: "" };
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    // category: 1,
    BookingStatus: 1,
    EntryDate: JSON.stringify(EntryDate),
  });
  const onChange = (key) => {
    setFilter([]);
    setParams({ ...params, ...keyF[key], key });
  };
  const handleChange = (current, pageSize) => {
    const last = current * pageSize;
    const first = last - pageSize;
    if (filter.length) {
      setPageBooking(filter.slice(first, last));
    } else {
      setPageBooking(booking.slice(first, last));
    }
  };
  const onChangeInput = (e) => {
    const input = e.target.value.toLowerCase();
    const newData = booking.filter(
      (val) =>
        val.IdentifyCode.toLowerCase().includes(input) ||
        val.Item?.Name.toLowerCase().includes(input)
    );
    setCurrentPage(1);
    setFilter(newData);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await orderService.getAllOrderByUserId(params);
        setBooking(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [params]);

  useEffect(() => {
    if (filter.length) {
      setPageBooking(filter.slice(0, pageSize));
      setCurrentPage(1);
    } else {
      setPageBooking(booking.slice(0, pageSize));
      setCurrentPage(1);
    }
  }, [booking, filter]);

  return (
    <>
      <h4 className="OrderStatus__header">Lịch sử đơn đặt</h4>
      <div className="OrderStatus__body">
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
          <Tabs
            className="tab_search"
            defaultActiveKey={params.key}
            onChange={onChange}
            tabBarExtraContent={{
              right: (
                <Input
                  onChange={onChangeInput}
                  prefix={<SearchOutlined />}
                  className="input"
                  placeholder="Tìm đơn đặt theo mã booking, tên studio, thợ make up, thiết bị, trang phục,..."
                />
              ),
            }}>
            <TabPane tab="Chờ thanh toán" key={1}>
              {booking &&
                pageBooking.map((item, idx) => (
                  <OrderStatusItem
                    id={item.id}
                    BookingStatus={params.key}
                    key={idx}
                    item={item}
                    pageBooking={pageBooking}
                    setPageBooking={setPageBooking}
                  />
                ))}
            </TabPane>
            <TabPane tab="Sắp tới" key={2}>
              {booking &&
                pageBooking.map((item, idx) => (
                  <OrderStatusItem
                    id={item.id}
                    BookingStatus={params.key}
                    key={idx}
                    item={item}
                    pageBooking={pageBooking}
                    setPageBooking={setPageBooking}
                  />
                ))}
            </TabPane>
            <TabPane tab="Đã hoàn tất" key={3}>
              {booking &&
                pageBooking.map((item, idx) => (
                  <OrderStatusItem
                    id={item.id}
                    BookingStatus={params.key}
                    key={idx}
                    item={item}
                    pageBooking={pageBooking}
                    setPageBooking={setPageBooking}
                  />
                ))}
            </TabPane>
            <TabPane tab="Đã hủy" key={4}>
              {booking &&
                pageBooking.map((item, idx) => (
                  <OrderStatusItem
                    id={item.id}
                    BookingStatus={params.key}
                    key={idx}
                    item={item}
                    booking={booking}
                    setBooking={setBooking}
                  />
                ))}
            </TabPane>
          </Tabs>
        )}
      </div>
      {booking && (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            padding: "10px 10px",
          }}>
          <Pagination
            showSizeChanger={false}
            onChange={handleChange}
            pageSize={pageSize}
            defaultCurrent={currentPage}
            total={filter.length || booking.length}
          />
        </div>
      )}
    </>
  );
};

export default OrderStatus;
