import { DatePicker, Form, Radio, Space, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterStudioPost } from "../../stores/actions/studioPostAction";
import { convertDateSendToDB } from "../../utils/convert";

import "./selectTimeOption.scss";

const Option = ({ disabled }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);

  switch (Number(filterService?.OrderByTime)) {
    case 1:
      return (
        <div className="timeContainer">
          <Form.Item
            name="date"
            label="Chọn ngày"
            style={{
              width: "100%",
              marginRight: "20px",
              marginBottom: "8px",
            }}
          >
            <DatePicker
              defaultValue={moment(filterService?.OrderByTimeFrom)}
              format={"DD/MM/YYYY"}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name="time"
            label="Chọn giờ:"
            style={{
              width: "100%",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            <div className="" style={{ width: "200px" }}>
              <TimePicker.RangePicker
                format="HH:mm"
                style={{ marginRight: "10px" }}
                value={[
                  moment(filterService?.OrderByTimeFrom).utc(),
                  moment(filterService?.OrderByTimeTo).utc(),
                ]}
                disabled={disabled}
                minuteStep={60}
              />
            </div>
          </Form.Item>
        </div>
      );
    case 0:
      return (
        <div>
          <Form.Item
            name="time"
            label="Chọn ngày"
            style={{
              width: "100%",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            <DatePicker.RangePicker
              defaultValue={[
                moment(filterService?.OrderByDateFrom),
                moment(filterService?.OrderByDateTo),
              ]}
              format="DD-MM-YYYY"
              disabled={disabled}
              disabledDate={(current) => {
                return current && current <= moment().subtract(1, "days");
              }}
            />
          </Form.Item>
        </div>
      );
    default:
      return <div></div>;
  }
};

const SelectTimeOption = ({ disabled }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);

  return (
    <div className="selectTimeOptionContainer">
      <Radio.Group
        name="radiogroup"
        style={{ padding: "0 0 20px" }}
        value={filterService.OrderByTime}
        disabled={disabled}
      >
        <Space direction="vertical">
          <Radio value={1}>Đặt theo giờ</Radio>
          <Radio value={0}>Đặt theo ngày</Radio>
        </Space>
      </Radio.Group>
      <Option disabled={disabled} />
    </div>
  );
};
export default SelectTimeOption;
