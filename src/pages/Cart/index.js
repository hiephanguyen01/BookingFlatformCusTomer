import { CheckCircleOutlined } from "@ant-design/icons";
import { Checkbox, Col, Divider, Row, Tabs } from "antd";
import React, { useState } from "react";
import "./cart.scss";

const plainOptions = [
  //   `<div stype={{background: "black"}}>123 </div>,
  "Pear",
  "Orange",
];
const defaultCheckedList = ["Apple", "Orange"];

const TAGS = [
  { id: "1", value: "Studio" },
  { id: "2", value: "Nhiếp ảnh" },
  { id: "3", value: "Thiết bị" },
  { id: "4", value: "Trang phục" },
  { id: "5", value: "Make up" },
  { id: "6", value: "Người mẫu" },
];

const Index = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  return (
    <div style={{ background: "#f5f5f5" }}>
      <div className="cart_container">
        <h3>Giỏ hàng</h3>
        <Row className="cart_row">
          <Col span={16} className="cart_col_left">
            <div className="cart_tab_pane">
              <Tabs defaultActiveKey="1" onChange={onChange}>
                {TAGS.map((tag, index) => (
                  <Tabs.TabPane tab={tag.value} key={tag.id}>
                    <div>
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                      >
                        Studio Wisteria{" "}
                        <CheckCircleOutlined style={{ color: "#03AC84" }} />
                      </Checkbox>
                      <Divider />
                      <Checkbox.Group
                        options={plainOptions}
                        value={checkedList}
                        onChange={onChange}
                      />
                    </div>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Col>
          <Col span={8} className="cart_col_right">
            <div className="d-flex justify-content-between">
              <div>Chọn mã khuyến mãi</div>
              <div>2 Mã khuyến mãi</div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
