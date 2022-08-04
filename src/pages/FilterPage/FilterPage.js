import { Checkbox, Col, Divider, Form,  Radio, Row, Slider } from "antd";
import React from "react";
import FilterCard from "../../components/FilterCard/FilterCard";
import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
import "./FilterPage.scss";
const FilterPage = () => {
  const categories = [
    {
      id: 1,
      name: "Studio",
    },
    {
      id: 2,
      name: "Nhiếp ảnh",
    },
    {
      id: 3,
      name: "Trang phục",
    },
    {
      id: 4,
      name: "Make up",
    },
    {
      id: 5,
      name: "Người mẫu",
    },
    {
      id: 6,
      name: "Thiết bị",
    },
  ];
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const marks = {
    0: "0",
    5000000: {
      label: <strong>5tr</strong>,
    },
  };
  return (
    <div className="FilterPage">
      <div className="container">
        <Row>
          <Col span={6}>
            <Form {...layout}>
              {/* timefil */}
              <div className="box">
                <p className="text">Khung giờ bạn muốn đặt</p>
                <Divider />
                <SelectTimeOption />
              </div>
              {/* filter */}
              <div className="box">
                <p className="text">LỌC THEO</p>

                <Divider />
                <p className="text">Địa điểm</p>
                <Form.Item name="location">
                  <Checkbox.Group>
                    <Row>
                      <Col span={24}>
                        <Checkbox value="A2">AAAAAA</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="B2">BBBBBB</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="C2">CCCCCC</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="D2">DDDDDD</Checkbox>
                      </Col>
                      <Col span={24}>
                        <Checkbox value="E2">EEEEEE</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                <Divider />
                <p className="text">Danh mục</p>
                <Form.Item name="category">
                  <Checkbox.Group>
                    <Row>
                      {categories.map((val) => (
                        <Col span={24}>
                          <Checkbox key={val.id} value={val.id}>
                            {val.name}
                          </Checkbox>
                        </Col>
                      ))}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                <Divider />
                <p className="text">Giá</p>
                <Form.Item name="price">
                  <Radio.Group>
                    <Row>
                      <Col span={24}>
                        <Radio value="A">Giá cao nhất</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="B">Giá thấp nhất </Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="C">Giảm giá nhiều nhất</Radio>
                      </Col>
                      <Col span={24}>
                        <Slider
                          min={0}
                          max={5000000}
                          step={100000}
                          range
                          defaultValue={[0, 2500000]}
                          marks={marks}
                        />
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>

                <Divider />
                <p className="text">Đánh giá</p>
                <Form.Item name="rating">
                  <Radio.Group>
                    <Row>
                      <Col span={24}>
                        <Radio value="A3">Đánh giá nhiều nhất </Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="B3">Đánh giá cao nhất </Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value="C3">Đặt nhiều nhất</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Form>
          </Col>
          <Col span={18}>
            <FilterCard />
            <FilterCard />
            <FilterCard />
            <FilterCard />
            <FilterCard />
            <FilterCard />
            <FilterCard />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FilterPage;
