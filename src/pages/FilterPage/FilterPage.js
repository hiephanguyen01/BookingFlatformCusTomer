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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCard from "../../components/FilterCard/FilterCard";
import EmptyPage from "../../components/layouts/EmptyPage";
import { studioPostService } from "../../services/StudioPostService";
import { getFilterStudioPost } from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import queryString from "query-string";
import "./FilterPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
const { Option } = Select;
const categories = [
  {
    id: "",
    value: "",
    name: "Tất cả",
  },
  {
    id: 1,
    value: "studio",
    name: "Studio",
  },
  {
    id: 2,
    value: "photographer",
    name: "Nhiếp ảnh",
  },
  {
    id: 3,
    value: "clothes",
    name: "Trang phục",
  },
  {
    id: 4,
    value: "makeup",
    name: "Make up",
  },
  {
    id: 5,
    value: "device",
    name: "Thiết bị",
  },
  {
    id: 6,
    value: "model",
    name: "Người mẫu",
  },
];
const FilterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const querySearch = queryString.parse(location?.search);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { filter, loading, pagination, studioPostList } = useSelector(
    (state) => state.studioPostReducer
  );
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await studioPostService.getAllProvince();
      setProvinces(res.data);
    })();
    initState();
  }, []);
  const initState = () => {
    dispatch(
      getFilterStudioPost(5, 1, {
        keyString: querySearch?.keyString || "",
        category: Number(querySearch?.category) || "",
        priceOption: Number(querySearch?.priceOption),
        price1: undefined,
        price2: undefined,
        provinceIds: Number(querySearch?.provinceIds) || [],
        ratingOption: Number(querySearch?.ratingOption) || 1,
      })
    );
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const marks = {
    0: convertPrice(0),
    5000000: {
      label: <strong>{convertPrice(5000000)}đ</strong>,
    },
  };
  const onChangeFilterCategory = (e) => {
    dispatch(
      getFilterStudioPost(
        5,
        1,
        { ...filter, category: e.target.value },
        currentUser,
        navigate
      )
    );
  };
  const onChangeFilterProvince = (value) => {
    dispatch(
      getFilterStudioPost(
        5,
        1,
        { ...filter, provinceIds: [value] },
        currentUser,
        navigate
      )
    );
  };
  const onChangeInput = (e) => {
    dispatch(
      getFilterStudioPost(
        5,
        1,
        { ...filter, keyString: e.target.value },
        currentUser,
        navigate
      )
    );
  };
  const onChangePriceOption = (e) => {
    dispatch(
      getFilterStudioPost(
        5,
        1,
        { ...filter, priceOption: e.target.value },
        currentUser,
        navigate
      )
    );
  };
  const onChangeRateOption = (e) => {
    dispatch(
      getFilterStudioPost(
        5,
        1,
        { ...filter, ratingOption: e.target.value },
        {},
        navigate
      )
    );
  };
  const onChangeSlideRange = (val) => {
    const [price1, price2] = val;
    dispatch(
      getFilterStudioPost(5, 1, { ...filter, price1, price2 }, {}, navigate)
    );
  };
  const onChangePage = (value) => {
    dispatch(getFilterStudioPost(5, value, filter), {}, navigate);
    window.scrollTo({ behavior: "smooth", top: ref?.current?.offsetTop });
  };
  const handleClearFilter = () => {
    dispatch(
      getFilterStudioPost(
        5,
        1,
        {
          keyString: "",
          category: "",
          priceOption: 1,
          price1: undefined,
          price2: undefined,
          provinceIds: [],
          ratingOption: 3,
        },
        {},
        navigate
      )
    );
    form.resetFields();
  };

  return (
    <div className="FilterPage">
      <div className="container">
        <Row>
          <Col span={6}>
            <Form {...layout} onFinish={handleClearFilter} form={form}>
              {/* timefil */}
              {/* <div className="box">
                <p className="text">Khung giờ bạn muốn đặt</p>
                <Divider />
                <div
                  className=""
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <TimePicker.RangePicker
                    format="HH:mm"
                    onChange={handleOnchangeHour}
                    size="large"
                    inputReadOnly={true}
                    defaultValue={[
                      moment(filter.OrderByTimeFrom.slice(11, 16), "HH:mm"),
                      moment(filter.OrderByTimeTo.slice(11, 16), "HH:mm"),
                    ]}
                    minuteStep={60}
                  />
                </div>
              </div> */}
              {/* filter */}
              <div className="box">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
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
                  <Select
                    showSearch
                    onChange={onChangeFilterProvince}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {provinces &&
                      provinces.map((val) => (
                        <Option value={val.id}>{val.Name}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <Divider />
                <Form.Item label="Danh mục" name="category">
                  <div className="category_radio_group">
                    <Radio.Group
                      onChange={onChangeFilterCategory}
                      value={filter.category}
                    >
                      {categories &&
                        categories.map((val) => (
                          <Radio key={val.id} value={val.id}>
                            {val.name}
                          </Radio>
                        ))}
                    </Radio.Group>
                  </div>
                </Form.Item>

                <Divider />
                <Form.Item label="Giá" name="price">
                  <div className="filter_price_container">
                    <Radio.Group
                      onChange={onChangePriceOption}
                      value={filter.priceOption}
                    >
                      <Row>
                        <Col span={24}>
                          <Radio value={2}>Giá cao nhất</Radio>
                        </Col>
                        <Col span={24}>
                          <Radio value={1}>Giá thấp nhất </Radio>
                        </Col>
                        <Col span={24}>
                          <Radio value={3}>Giảm giá nhiều nhất </Radio>
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
                  </div>
                </Form.Item>

                <Divider />
                <p className="text">Đánh giá</p>
                <Form.Item name="ratingOption">
                  <div className="filter_rating_container">
                    <Radio.Group
                      onChange={onChangeRateOption}
                      value={filter.ratingOption}
                    >
                      <Row>
                        <Col span={24}>
                          <Radio value={1}>Đánh giá nhiều nhất</Radio>
                        </Col>
                        <Col span={24}>
                          <Radio value={2}>Đánh giá cao nhất</Radio>
                        </Col>
                        <Col span={24}>
                          <Radio value={3}>Đặt nhiều nhất</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </div>
                </Form.Item>
              </div>
            </Form>
          </Col>
          <Col span={18} className="p-10">
            {loading ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    background: "white",
                    width: "fit-content",
                    borderRadius: "50%",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <LoadingOutlined style={{ fontSize: "40px" }} />
                </div>
              </div>
            ) : !studioPostList?.length ? (
              <EmptyPage />
            ) : (
              <div
                ref={ref}
                style={{ backgroundColor: "#fff" }}
                className="px-15 py-20"
              >
                {studioPostList?.map((val) => (
                  <FilterCard
                    data={val}
                    category={
                      categories.filter((val) => val.id === filter.category)[0]
                    }
                  />
                ))}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                padding: "10px 10px",
              }}
            >
              <Pagination
                pageSize={pagination?.limit || 0}
                current={pagination?.currentPage}
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
