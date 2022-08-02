import { DatePicker, Form, Radio, Space, TimePicker } from "antd";
import { useState } from "react";

const Option = ({ option }) => {
  switch (option) {
    case 1:
      return (
        <div>
          <Form.Item
            name="date"
            label="Chọn ngày"
            style={{ width: "100%", marginRight: "20px" }}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="time"
            label="Chọn giờ:"
            style={{ width: "100%", marginRight: "20px" }}>
            <TimePicker.RangePicker />
          </Form.Item>
        </div>
      );
    case 2:
      return (
        <div>
          <Form.Item
            name="time"
            label="Chọn ngày"
            style={{ width: "100%", marginRight: "20px" }}>
            <DatePicker.RangePicker />
          </Form.Item>
        </div>
      );
    default:
      return <div></div>;
  }
};

const SelectTimeOption = () => {
  const [selection, setSelection] = useState(0);
  return (
    <>
      <Radio.Group
        name="radiogroup"
        onChange={(e) => setSelection(e.target.value)}
        style={{ padding: "0 0 20px" }}>
        <Space direction="vertical">
          <Radio value={1}>Đặt theo giờ</Radio>
          <Radio value={2}>Đặt theo ngày</Radio>
        </Space>
      </Radio.Group>
      <Option option={selection} />
    </>
  );
};
export default SelectTimeOption;
