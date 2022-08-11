import { LoadingOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Pagination,
  Radio,
  Row,
  Select,
  Slider,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCard from "../../components/FilterCard/FilterCard";
import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
import { studioPostService } from "../../services/StudioPostService";
import { getFilterdStudioPost } from "../../stores/actions/studioPostAction";
import "./FilterPage.scss";
const { Option } = Select;
const FilterPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const filter = useSelector((state) => state.studioPostReducer.filter);
  const loading = useSelector((state) => state.studioPostReducer.loading);
  const pagination = useSelector((state) => state.studioPostReducer.pagination);
  const [newFilter, setNewFilter] = useState(filter);
  const [provinces, setProvinces] = useState([]);
  const studioPostList = useSelector(
    (state) => state.studioPostReducer.studioPostList
  );
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
  const onChangeFilterCategory = (e) => {
    setNewFilter({
      ...newFilter,
      category: e.target.value,
    });
  };
  const onChangeFilterProvince = (value) => {
    setNewFilter({
      ...newFilter,
      provinceIds: [value],
    });
  };
  const onChangeInput = (e) => {
    setNewFilter({
      ...newFilter,
      keyString: e.target.value,
    });
  };
  const onChangePriceOption = (e) => {
    setNewFilter({
      ...newFilter,
      priceOption: e.target.value,
    });
  };
  const onChangeSlideRange = (val) => {
    const [price1, price2] = val;
    setNewFilter({
      ...newFilter,
      price1,
      price2,
    });
  };
  const onChangePage = (value) => {
    console.log(value);
    dispatch(getFilterdStudioPost(5, value, newFilter));
  };
  const handleClearFilter = () => {
    setNewFilter({
      keyString: "",
      category: 1,
      priceOption: 0,
      price1: undefined,
      price2: undefined,
      provinceIds: [],
      ratingOption: 1,
    });
    form.resetFields();
  };
  useEffect(() => {
    (async () => {
      const res = await studioPostService.getAllProvince();
      setProvinces(res.data);
    })();
    if (newFilter) {
      dispatch(getFilterdStudioPost(5, 1, newFilter));
    }
  }, [dispatch, newFilter, filter]);

  return (
    <div className="FilterPage">
      <div className="container">
        <Row>
          <Col span={6}>
            <Form {...layout} onFinish={handleClearFilter} form={form}>
              {/* timefil */}
              <div className="box">
                <p className="text">Khung giờ bạn muốn đặt</p>
                <Divider />
                <SelectTimeOption />
              </div>
              {/* filter */}
              <div className="box">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <p className="text">LỌC THEO</p>
                  <Button htmlType="submit" type="primary">
                    Xoá bộ lọc
                  </Button>
                </div>

                <Divider />
                <Form.Item label="Tên" name="keyString">
                  <Input onChange={onChangeInput} />
                </Form.Item>

                <Form.Item label="Địa điểm" name="location">
                  <Select onChange={onChangeFilterProvince}>
                    {provinces &&
                      provinces.map((val) => (
                        <Option value={val.id}>{val.Name}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <Divider />
                <Form.Item label="Danh mục" name="category">
                  <Radio.Group
                    onChange={onChangeFilterCategory}
                    value={newFilter.category}>
                    <Row>
                      {categories &&
                        categories.map((val) => (
                          <Col span={24}>
                            <Radio key={val.id} value={val.id}>
                              {val.name}
                            </Radio>
                          </Col>
                        ))}
                    </Row>
                  </Radio.Group>
                </Form.Item>

                <Divider />
                <Form.Item label="Giá" name="price">
                  <Radio.Group onChange={onChangePriceOption}>
                    <Row>
                      <Col span={24}>
                        <Radio value={1}>Giá cao nhất</Radio>
                      </Col>
                      <Col span={24}>
                        <Radio value={2}>Giá thấp nhất </Radio>
                      </Col>
                      <Col span={24}>
                        <Slider
                          onAfterChange={onChangeSlideRange}
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
              studioPostList?.map((val) => (
                <FilterCard
                  data={val}
                  category={
                    categories.filter((val) => val.id === newFilter.category)[0]
                  }
                />
              ))
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                padding: "10px 10px",
              }}>
              <Pagination
                pageSize={pagination?.limit}
                defaultCurrent={1}
                total={pagination?.total}
                onChange={onChangePage}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FilterPage;
