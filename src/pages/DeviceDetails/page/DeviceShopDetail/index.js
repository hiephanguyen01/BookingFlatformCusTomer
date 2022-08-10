import { Rate, Row, Col, Tabs, Pagination } from "antd";
import React, { useState } from "react";
import "./deviceShopDetail.scss";

import ReadMoreDesc from "../../../../components/ReadMoreDesc";

import imgPost from "../../../../assets/dao/Frame 163.jpg";
import svgLocation from "../../../../assets/svg/location.svg";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Card } from "../../../../components/Card";

const TAGS = [
  { id: 1, value: "Phổ biến" },
  { id: 2, value: "Danh mục" },
  { id: 3, value: "Bán chạy" },
  { id: 4, value: "Mới nhất" },
];

const ASIDE_CATEGORY_ITEM = [
  { value: 0, name: "Váy cưới" },
  { value: 1, name: "Áo dài" },
  { value: 2, name: "Trang phục biểu diễn" },
  { value: 3, name: "Khác" },
];

const onShowSizeChange = (current, pageSize) => {
  console.log(current, pageSize);
};

const Index = () => {
  const [chooseAsideCategory, setChooseAsideCategory] = useState(0);

  return (
    <div
      className=""
      style={{
        maxWidth: "1440px",
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <div className="shop_container">
        <div className="w-100 pt-38 pb-49 px-28  banner_container">
          <Row className="">
            <Col lg={8} sm={24}>
              <img
                src={imgPost}
                style={{ height: "280px" }}
                className="me-32"
              />
            </Col>
            <Col lg={16} sm={24}>
              <div className="shop_name d-flex align-item-center">
                Cho thuê thiết bị FLUX{" "}
                <CheckCircleOutlined className="check_circle pt-10 ms-10" />
              </div>
              <div className="location">
                <img src={svgLocation} style={{ marginRight: "0.5rem" }} />
                Quận 1, TPHCM
              </div>
              <div className="d-flex align-items-center mb-20">
                <Rate disabled allowHalf defaultValue={5} className="rating " />
                <div className="d-flex align-items-center mt-3">
                  <span>5</span>
                  <div className="reserve ms-20">Đã đặt 60</div>
                </div>
              </div>
              <ReadMoreDesc>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </ReadMoreDesc>
            </Col>
          </Row>
        </div>
        <Row>
          <div className="w-100 mt-28 tab_panel">
            <Tabs defaultActiveKey="1" onChange={{}}>
              {TAGS.map((tag, index) => (
                <Tabs.TabPane tab={tag.value} key={tag.id}>
                  {tag.id === 1 && (
                    <Row style={{}}>
                      <div className="wrap_card w-100 mb-40" style={{}}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                          <Card />
                        ))}
                      </div>
                      <div className="d-flex justify-content-center w-100">
                        <Pagination
                          showSizeChanger={false}
                          onShowSizeChange={onShowSizeChange}
                          defaultCurrent={1}
                          total={200}
                        />
                      </div>
                    </Row>
                  )}
                  {tag.id === 2 && (
                    <Row className="tab_category">
                      <Col span={4} className="pe-20">
                        <div className="header_aside_category mt-20">
                          {tag.value}
                        </div>
                        <ul className="aside_category_list">
                          {ASIDE_CATEGORY_ITEM.map((item, index) => (
                            <li
                              key={index}
                              className={`aside_category_item ${
                                index === chooseAsideCategory ? "active" : ""
                              }`}
                              onClick={() => {
                                setChooseAsideCategory(index);
                              }}
                            >
                              {item.name}
                            </li>
                          ))}
                        </ul>
                      </Col>
                      <Col span={20}>
                        <div className="wrap_card w-100 mb-40" style={{}}>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                            (item, index) => (
                              <Card />
                            )
                          )}
                        </div>
                        <div className="d-flex justify-content-center">
                          <Pagination
                            showSizeChanger={false}
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={200}
                          />
                        </div>
                      </Col>
                    </Row>
                  )}

                  {tag.id === 3 && <>{tag.value}</>}
                  {tag.id === 4 && <>{tag.value}</>}
                </Tabs.TabPane>
              ))}
            </Tabs>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Index;
