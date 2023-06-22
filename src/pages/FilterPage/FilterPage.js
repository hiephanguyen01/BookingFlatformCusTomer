import {
  ArrowLeftOutlined,
  CloseOutlined,
  DownOutlined,
  LoadingOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  Divider,
  Form,
  Grid,
  Input,
  Modal,
  Pagination,
  Radio,
  Row,
  Select,
  Slider,
} from "antd";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterCard from "../../components/FilterCard/FilterCard";
import EmptyPage from "../../components/layouts/EmptyPage";
import { studioPostService } from "../../services/StudioPostService";
import {
  getFilterStudioPost,
  getFilterStudioPostMobile,
} from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import queryString from "query-string";
import "./FilterPage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import ModalBottom from "../../components/ModalBottom/ModalBottom";
import { ReactComponent as FilterIcon } from "../../assets/header/filter.svg";
import toastMessage from "../../components/ToastMessage";
import { ReactComponent as CheckSVG } from "../../assets/svg/check.svg";

const { Option } = Select;
const PRICE_FILTER = [
  { value: 1, label: "Giá thấp nhất" },
  { value: 2, label: "Giá cao nhất" },
  { value: 3, label: "Giảm giá nhiều nhất" },
];
const CATEGORIES = [
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

const { useBreakpoint } = Grid;

const FilterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef(null);
  const querySearch = useMemo(
    () => queryString.parse(location?.search),
    [location?.search]
  );

  const screens = useBreakpoint();
  // console.log(location?.search, querySearch, screens);

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { filter, loading, pagination, studioPostList } = useSelector(
    (state) => state.studioPostReducer
  );
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const [provinces, setProvinces] = useState([]);
  const [filterProvinces, setFilterProvinces] = useState([]);
  const [searchProvince, setSearchProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [province, setProvince] = useState(
    Number(querySearch?.location) || querySearch?.provinces || ""
  );
  const [priceRange, setPriceRange] = useState(querySearch?.priceRange || []);
  const [chooseProvinceMobile, setChooseProvinceMobile] = useState(
    querySearch?.provinces?.length > 0 &&
      typeof querySearch?.provinces !== "string"
      ? querySearch?.provinces
      : [querySearch?.provinces] || []
  );
  const [chooseCategory, setChooseCategory] = useState(
    querySearch?.category?.length > 0 &&
      typeof querySearch?.category !== "string"
      ? querySearch?.category
      : isNaN(Number(querySearch?.category))
      ? []
      : [Number(querySearch?.category)]
  );
  const [choosePrice, setChoosePrice] = useState(
    +querySearch?.priceOption || 1
  );
  const [keyString, setKeyString] = useState(querySearch?.keyString || "");
  const [selectProvince, setSelectProvince] = useState(null);
  const [chooseDistrict, setChooseDistrict] = useState([]);

  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };

  const initState = useCallback(
    (query, device) => {
      console.log(device);
      if (device) {
        console.log("mobile");
        dispatch(
          getFilterStudioPostMobile(
            5,
            1,
            {
              keyString: query?.keyString || "",
              category:
                typeof query?.category === "string"
                  ? [query?.category]
                  : query?.category,
              priceOption: +query?.priceOption,
              priceRange: query?.priceRange || [],
              provinces: query?.provinces || [],
              districts: query?.districts?.length > 0 ? query?.districts : [],
              // ratingOption: +querySearch?.ratingOption || 1,
            },
            null,
            navigate
          )
        );
      } else {
        console.log("desktop");
        dispatch(
          getFilterStudioPost(
            5,
            1,
            {
              keyString: query?.keyString || "",
              category:
                +query?.category > 0 && +query?.category < 7
                  ? +query?.category
                  : "",
              priceOption: +query?.priceOption,
              priceRange: query?.priceRange || [],
              location: query?.location || "",
              ratingOption: +query?.ratingOption || 1,
            },
            null,
            navigate
          )
        );
      }
    },
    [navigate, dispatch]
  );

  useEffect(() => {
    if (Object.keys(screens).length > 0 && querySearch) {
      initState(querySearch, screens.xs);
    }
  }, [screens, querySearch, initState]);

  useEffect(() => {
    (async () => {
      const res = await studioPostService.getAllProvince();
      setProvinces(res.data);
      setFilterProvinces(res.data);
    })();
  }, []);

  useEffect(() => {
    if (provinces?.length > 0) {
      const province = provinces.find((p) => p.Name === filter?.location);
      province && form.setFieldsValue({ location1: +province?.Code || "" });
      setSelectProvince(province?.Code || null);
    }
  }, [filter, province]);

  useEffect(() => {
    if (selectProvince) {
      (async () => {
        const res = await studioPostService.getDistrictByProvince(
          selectProvince
        );
        setDistricts(res.data);
      })();
    }
  }, [selectProvince]);

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
    // const newFilter = { ...filter, category: e.target.value };
    // navigate(
    //   `/home/filter?${queryString.stringify(
    //     Object.keys(newFilter)?.reduce(
    //       (newFilter, key) =>
    //         newFilter[key] === "" || newFilter[key] === undefined
    //           ? { ...newFilter }
    //           : { ...newFilter, [key]: newFilter[key] },
    //       {}
    //     )
    //   )}`
    // );
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
    let newValue;
    const prov = provinces.find((p) => +p.Code === value);
    if (value === "") {
      setSelectProvince(null);
      setDistricts([]);
      dispatch(
        getFilterStudioPost(
          5,
          1,
          { ...filter, location: value },
          currentUser,
          navigate
        )
      );
    } else {
      setSelectProvince(value);
      if (prov?.Name?.includes("TP")) {
        newValue = prov.Name.split("TP")[1];
      } else {
        newValue = prov.Name;
      }
      dispatch(
        getFilterStudioPost(
          5,
          1,
          { ...filter, location: newValue },
          currentUser,
          navigate
        )
      );
    }
    form.setFieldsValue({ location: "" });
  };

  const onChangeFilterDistrict = (value) => {
    let newValue;
    const prov = provinces.find((p) => +p.Code === selectProvince);
    if (value.includes("quận")) {
      newValue = value.split("quận")[1];
    } else if (value.includes("huyện")) {
      newValue = value.split("huyện")[1];
    } else {
      newValue = value;
    }
    dispatch(
      getFilterStudioPost(
        5,
        1,
        { ...filter, location: newValue },
        currentUser,
        navigate
      )
    );
  };

  const onChangeInput = (e) => {
    const newQuery = {
      keyString: e.target.value,
      category: chooseCategory,
      priceOption: choosePrice,
      priceRange: priceRange,
      provinces: chooseProvinceMobile,
      districts: chooseDistrict,
    };
    navigate(
      `/home/filter?${queryString.stringify(
        Object.keys(newQuery)?.reduce(
          (newFilter, key) =>
            newQuery[key] === "" || newQuery[key] === undefined
              ? { ...newFilter }
              : { ...newFilter, [key]: newQuery[key] },
          {}
        )
      )}`
    );
    // dispatch(
    //   getFilterStudioPost(
    //     5,
    //     1,
    //     { ...filter, keyString: e.target.value },
    //     currentUser,
    //     navigate
    //   )
    // );
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
    dispatch(
      getFilterStudioPost(5, 1, { ...filter, priceRange: val }, {}, navigate)
    );
  };

  const onChangePage = (value) => {
    if (screens.xs) {
      dispatch(getFilterStudioPostMobile(5, value, filter), {}, navigate);
    } else {
      dispatch(getFilterStudioPost(5, value, filter), {}, navigate);
    }
    window.scrollTo({ behavior: "smooth", top: ref?.current?.offsetTop });
  };
  const handleClearFilter = () => {
    form.resetFields();
    setProvince("");
    setKeyString("");
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
          location1: province,
          ratingOption: 3,
        },
        {},
        navigate
      )
    );
  };

  const handleChooseProvinceMobile = (province) => {
    let newChooseProvince = [...chooseProvinceMobile];
    const checkProvince = newChooseProvince.findIndex(
      (item) => item === province?.Name
    );
    if (checkProvince !== -1) {
      newChooseProvince.splice(checkProvince, 1);
      const newDistricts = districts.filter(
        (item) => item.ProvinceCode === province.Code
      );
      const newChooseDistricts = [...chooseDistrict].filter(
        (item) => newDistricts.findIndex((itm) => itm.Name === item) > 0
      );
      setChooseDistrict(newChooseDistricts);
    } else {
      newChooseProvince.push(province.Name);
      setSelectProvince(province.Code);
    }
    setChooseProvinceMobile(newChooseProvince);
  };

  const handleChooseDistrict = (district) => {
    let newChooseDistricts = [...chooseDistrict];
    const checkDistrict = newChooseDistricts.findIndex(
      (item) => item === district?.Name
    );
    if (checkDistrict !== -1) {
      newChooseDistricts.splice(checkDistrict, 1);
    } else {
      newChooseDistricts.push(district.Name);
    }
    setChooseDistrict(newChooseDistricts);
  };

  const handleChooseCategoryMobile = (category) => {
    let newChooseCategory = [...chooseCategory];
    const checkCategory = newChooseCategory.findIndex(
      (item) => +item === category?.id
    );
    if (checkCategory !== -1) {
      newChooseCategory.splice(checkCategory, 1);
    } else {
      newChooseCategory.push(category.id);
    }
    setChooseCategory(newChooseCategory.filter((item) => item !== ""));
  };

  const onFinish = (values) => {
    let newFilter = {
      ...filter,
      category: values.category || "",
      keyString: values.keyString,
      priceOption: values.price || 1,
      ratingOption: 3,
    };

    if (screens.xs) {
      newFilter = {
        category: chooseCategory?.map((item) => item.id),
        provinces: chooseProvinceMobile?.map((item) => item.Name),
        keyString: values.keyString,
        priceOption: choosePrice.value || 1,
        priceRange: priceRange,
        districts: chooseDistrict.map((item) => item.Name),
      };
      dispatch(
        getFilterStudioPostMobile(
          5,
          1,
          newFilter,
          currentUser,
          navigate,
          setVisible
        )
      );
    } else {
      dispatch(
        getFilterStudioPost(5, 1, newFilter, currentUser, navigate, setVisible)
      );
    }
  };

  const handleChooseProvince = (province) => {
    let newChooseProvince = [...chooseProvinceMobile];
    const checkProvince = newChooseProvince.findIndex(
      (item) => item?.Code === province?.Code
    );
    if (checkProvince !== -1) {
      newChooseProvince.splice(checkProvince, 1);
      const newChooseDistricts = [...chooseDistrict].filter(
        (item) => item.ProvinceCode === province.Code
      );
      setChooseDistrict(newChooseDistricts);
    } else {
      newChooseProvince.push(province);
      setSelectProvince(province.Code);
    }
    setChooseProvinceMobile(newChooseProvince);
  };

  return (
    <div className="container" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="FilterPage">
        <Row
          gutter={[20, 20]}
          style={{ padding: `${screens.xs ? "" : "10px 0px"}` }}
        >
          {screens.xs && (
            <div className="filterHeader">
              <Row
                align="middle"
                justify="space-around"
                style={{ textAlign: "center" }}
              >
                <Col span={3}>
                  <ArrowLeftOutlined
                    style={{ fontSize: "18px" }}
                    onClick={() => navigate("/home")}
                  />
                </Col>
                <Col span={15}>
                  <Input
                    placeholder="Bạn đang tìm gì?"
                    prefix={<SearchOutlined />}
                    className="input-search "
                    defaultValue={keyString || ""}
                    onPressEnter={onChangeInput}
                  />
                </Col>
                <Col span={3}>
                  <FilterIcon
                    className="mt-6"
                    onClick={() =>
                      toastMessage(
                        "Chức năng này đang phát triển!",
                        "info",
                        1,
                        "",
                        {}
                      )
                    }
                  />
                </Col>
                <Col
                  span={3}
                  onClick={() =>
                    toastMessage(
                      "Chức năng này đang phát triển!",
                      "info",
                      1,
                      "",
                      {}
                    )
                  }
                >
                  <Badge count={0} size="default">
                    <ShoppingOutlined
                      style={{ fontSize: "25px", color: "#828282" }}
                    />
                  </Badge>
                </Col>
              </Row>
              <Divider className="my-15" />
              {/* Mobile */}
              <Col lg={0} md={0} sm={0} xs={24}>
                <div className="option d-flex mx-10" style={{ gap: 20 }}>
                  <ModalBottom
                    height={"40%"}
                    modalContent={
                      <div className="modal-province-filter-page">
                        <h3 className="px-10 mb-20">Địa điểm</h3>
                        <div className="px-10 mb-26">
                          {!selectProvince && (
                            <Input
                              placeholder={`${
                                selectProvince
                                  ? "Nhập tên quận, huyện"
                                  : "Nhập tên tỉnh, thành phố"
                              }`}
                              value={searchProvince || ""}
                              prefix={<SearchOutlined />}
                              className="input-search-province "
                              onChange={(e) => {
                                const filterProvince = provinces.filter((p) =>
                                  p.Name.toUpperCase().includes(
                                    e.target.value.toUpperCase()
                                  )
                                );
                                setSearchProvince(e.target.value);
                                setFilterProvinces(filterProvince);
                              }}
                            />
                          )}
                        </div>
                        <Row
                          gutter={[20, 20]}
                          style={{ textAlign: "center", margin: "0 auto" }}
                        >
                          {selectProvince ? (
                            <>
                              {districts.map((val) => (
                                <Col span={12}>
                                  <div
                                    key={val.id}
                                    className={`btn-province-item ${
                                      chooseDistrict?.find(
                                        (value) => value === val.Name
                                      )
                                        ? "active"
                                        : ""
                                    } `}
                                    onClick={() => {
                                      handleChooseDistrict(val);
                                    }}
                                  >
                                    {val.Name}
                                  </div>
                                </Col>
                              ))}
                            </>
                          ) : (
                            <>
                              {filterProvinces?.map((val) => (
                                <Col span={12}>
                                  <div
                                    key={val.id}
                                    className={`btn-province-item ${
                                      chooseProvinceMobile?.find(
                                        (value) => value === val.Name
                                      )
                                        ? "active"
                                        : ""
                                    } `}
                                    onClick={() => {
                                      handleChooseProvinceMobile(val);
                                    }}
                                  >
                                    {val.Name}
                                  </div>
                                </Col>
                              ))}
                            </>
                          )}
                        </Row>
                      </div>
                    }
                    close={true}
                    btnClose={
                      <CheckSVG
                        onClick={(e) => {
                          if (selectProvince) {
                            e.stopPropagation();
                            setSelectProvince(null);
                            setDistricts([]);
                          } else {
                            const newQuery = {
                              keyString: keyString,
                              category: chooseCategory,
                              priceOption: choosePrice,
                              priceRange: priceRange,
                              provinces: chooseProvinceMobile,
                              districts: chooseDistrict,
                            };
                            navigate(
                              `/home/filter?${queryString.stringify(
                                Object.keys(newQuery)?.reduce(
                                  (newFilter, key) =>
                                    newQuery[key] === "" ||
                                    newQuery[key] === undefined
                                      ? { ...newFilter }
                                      : { ...newFilter, [key]: newQuery[key] },
                                  {}
                                )
                              )}`
                            );
                            // dispatch(
                            //   getFilterStudioPostMobile(
                            //     5,
                            //     1,
                            //     {
                            //       keyString: "",
                            //       category: chooseCategory,
                            //       priceOption: choosePrice,
                            //       priceRange: priceRange,
                            //       provinces: chooseProvinceMobile,
                            //       districts: chooseDistrict,
                            //       // ratingOption: +querySearch?.ratingOption || 1,
                            //     },
                            //     null,
                            //     navigate
                            //   )
                            // );
                          }
                        }}
                      />
                    }
                  >
                    <Button className="btn-item-filter">
                      Địa điểm <DownOutlined className="icon" />
                    </Button>
                  </ModalBottom>
                  <ModalBottom
                    height={"35%"}
                    modalContent={
                      <div className="modal-category-filter-page">
                        <h3 className="px-10 mb-20">Danh mục</h3>
                        <Row
                          gutter={[20, 20]}
                          style={{ textAlign: "center", margin: "0 auto" }}
                        >
                          {CATEGORIES.slice(1, 7).map((val) => (
                            <Col span={12}>
                              <div
                                key={val.id}
                                className={`btn-category-item ${
                                  chooseCategory?.find(
                                    (value) => +value === val.id
                                  )
                                    ? "active"
                                    : ""
                                } `}
                                onClick={() => handleChooseCategoryMobile(val)}
                              >
                                {val.name}
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    }
                    extendProp={false}
                    close={true}
                    btnClose={
                      <CheckSVG
                        onClick={(e) => {
                          const newQuery = {
                            keyString: keyString,
                            category: chooseCategory,
                            priceOption: choosePrice,
                            priceRange: priceRange,
                            provinces: chooseProvinceMobile,
                            districts: chooseDistrict,
                          };
                          navigate(
                            `/home/filter?${queryString.stringify(
                              Object.keys(newQuery)?.reduce(
                                (newFilter, key) =>
                                  newQuery[key] === "" ||
                                  newQuery[key] === undefined
                                    ? { ...newFilter }
                                    : { ...newFilter, [key]: newQuery[key] },
                                {}
                              )
                            )}`
                          );
                          // dispatch(
                          //   getFilterStudioPostMobile(
                          //     5,
                          //     1,
                          //     {
                          //       keyString: "",
                          //       category: chooseCategory,
                          //       priceOption: choosePrice,
                          //       priceRange: priceRange,
                          //       provinces: chooseProvinceMobile,
                          //       districts: chooseDistrict,
                          //       // ratingOption: +querySearch?.ratingOption || 1,
                          //     },
                          //     null,
                          //     navigate
                          //   )
                          // );
                        }}
                      />
                    }
                  >
                    <Button className="btn-item-filter">
                      Danh mục <DownOutlined className="icon" />
                    </Button>
                  </ModalBottom>
                  <ModalBottom
                    modalContent={
                      <div className="modal-price-filter-page">
                        <h3 className="px-10 mb-20">Giá</h3>
                        <Row
                          gutter={[20, 20]}
                          style={{ textAlign: "center", margin: "0 auto" }}
                        >
                          {PRICE_FILTER.map((val) => (
                            <Col span={12}>
                              <div
                                key={val.value}
                                className={`btn-price-item ${
                                  choosePrice === val.value ? "active" : ""
                                }`}
                                onClick={() => setChoosePrice(val.value)}
                              >
                                {val.label}
                              </div>
                            </Col>
                          ))}
                        </Row>
                        <div className="px-10 my-20">
                          {priceRange?.length > 0 && (
                            <div style={{ fontSize: 18 }}>
                              {convertPrice(priceRange[0])} đ -{" "}
                              {convertPrice(priceRange[1])} đ
                            </div>
                          )}
                          <Row>
                            <Slider
                              className="w-100"
                              range
                              defaultValue={priceRange}
                              step={100000}
                              min={0}
                              max={5000000}
                              onChange={(value) => setPriceRange(value)}
                            />
                          </Row>
                        </div>
                      </div>
                    }
                    extendProp={false}
                    close={true}
                    btnClose={
                      <CheckSVG
                        onClick={(e) => {
                          const newQuery = {
                            keyString: keyString,
                            category: chooseCategory,
                            priceOption: choosePrice,
                            priceRange: priceRange,
                            provinces: chooseProvinceMobile,
                            districts: chooseDistrict,
                          };
                          navigate(
                            `/home/filter?${queryString.stringify(
                              Object.keys(newQuery)?.reduce(
                                (newFilter, key) =>
                                  newQuery[key] === "" ||
                                  newQuery[key] === undefined
                                    ? { ...newFilter }
                                    : { ...newFilter, [key]: newQuery[key] },
                                {}
                              )
                            )}`
                          );
                          // dispatch(
                          //   getFilterStudioPostMobile(
                          //     5,
                          //     1,
                          //     {
                          //       keyString: "",
                          //       category: chooseCategory,
                          //       priceOption: choosePrice,
                          //       priceRange: priceRange,
                          //       provinces: chooseProvinceMobile,
                          //       districts: chooseDistrict,
                          //       // ratingOption: +querySearch?.ratingOption || 1,
                          //     },
                          //     null,
                          //     navigate
                          //   )
                          // );
                        }}
                      />
                    }
                  >
                    <Button className="btn-item-filter">
                      Giá <DownOutlined className="icon" />
                    </Button>
                  </ModalBottom>
                </div>
              </Col>
            </div>
          )}
          <Col lg={6} md={24} sm={24} xs={0}>
            <Form {...layout} onFinish={handleClearFilter} form={form}>
              <Row className="w-100">
                <Col lg={24} md={24} sm={24} xs={24}>
                  <Row className="box" gutter={[10, 10]}>
                    <Col sm={12}>
                      <p className="text">LỌC THEO</p>
                    </Col>
                    <Col sm={12} style={{ textAlign: "end" }}>
                      <Button htmlType="submit" type="primary">
                        Xoá bộ lọc
                      </Button>
                    </Col>
                    <Divider />
                    <Col lg={24} md={12} sm={12} xs={12}>
                      <Form.Item label="Tên" name="keyString">
                        <Input
                          className={`${!screens?.lg && screens?.md && "w-70"}`}
                          style={{ borderRadius: "8px" }}
                          onChange={onChangeInput}
                          defaultValue={keyString}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={24} md={12} sm={12} xs={12}>
                      <Form.Item label="Tỉnh/Thành phố" name="location1">
                        <Select
                          className={`select_location `}
                          style={
                            !screens?.lg && screens?.md ? { width: "70%" } : {}
                          }
                          showSearch
                          onChange={onChangeFilterProvince}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          defaultValue={province}
                        >
                          <Option value={""}>Tất cả</Option>
                          {provinces &&
                            provinces.map((val) => (
                              <Option value={Number(val.Code)}>
                                {val.Name}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>

                      <Form.Item label="Quận/Huyện" name="location">
                        <Select
                          className={`select_location `}
                          style={
                            !screens?.lg && screens?.md ? { width: "70%" } : {}
                          }
                          disabled={!provinces.length}
                          showSearch
                          onChange={onChangeFilterDistrict}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          defaultValue={province}
                        >
                          <Option value={""}>Tất cả</Option>
                          {districts &&
                            districts.map((val) => (
                              <Option value={val.Name.toLowerCase()}>
                                {val.Name}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={24} md={8} sm={8} xs={24}>
                      <Divider />
                      <Form.Item label="Danh mục" name="category">
                        <div className="category_radio_group">
                          <Radio.Group
                            onChange={onChangeFilterCategory}
                            value={filter.category}
                          >
                            {CATEGORIES &&
                              CATEGORIES?.map((val) => (
                                <Radio key={val.id} value={val.id}>
                                  {val.name}
                                </Radio>
                              ))}
                          </Radio.Group>
                        </div>
                      </Form.Item>
                    </Col>

                    <Col lg={24} md={8} sm={8} xs={24}>
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
                                  defaultValue={priceRange}
                                  marks={marks}
                                />
                              </Col>
                            </Row>
                          </Radio.Group>
                        </div>
                      </Form.Item>
                    </Col>
                    <Col lg={24} md={8} sm={8} xs={24}>
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
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col lg={18} md={24} sm={24} xs={24}>
            <Row gutter={[0, 10]}>
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
                <>
                  <div
                    ref={ref}
                    style={{ width: "100%", backgroundColor: "#fff" }}
                    className="px-16 py-20"
                  >
                    {studioPostList?.map((val) => (
                      <FilterCard
                        data={val}
                        category={
                          CATEGORIES.filter(
                            (val) => val.id === filter.category
                          )[0]
                        }
                      />
                    ))}
                  </div>
                </>
              )}
              {studioPostList?.length > 0 && (
                <Col span={24}>
                  <div
                    style={{
                      padding: "10px 0px",
                      marginLeft: "auto",
                      textAlign: "end",
                    }}
                  >
                    <Pagination
                      pageSize={pagination?.limit || 0}
                      current={pagination?.currentPage}
                      total={pagination?.limit * pagination?.totalPages}
                      onChange={onChangePage}
                    />
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
        <Modal
          onCancel={handleCancel}
          className="search-modal mobile"
          width={"100%"}
          visible={visible}
          footer={[]}
          closable={false}
        >
          <div className="search-container pt-30">
            <Form onFinish={onFinish}>
              <Row className="w-100" justify="space-between" align="middle">
                <Col span={2}>
                  <CloseOutlined
                    className="mb-30"
                    onClick={() => setVisible(false)}
                  />
                </Col>
                <Col span={22}>
                  <Form.Item name="keyString">
                    <Input
                      placeholder="Bạn đang tìm gì?"
                      prefix={<SearchOutlined />}
                      className="input-search "
                    />
                  </Form.Item>
                </Col>
              </Row>
              <p className="filter">LỌC THEO</p>
              <div className="option d-flex justify-content-between">
                <ModalBottom
                  height={"40%"}
                  modalContent={
                    <div className="modal-province-filter-page">
                      <h3 className="px-10 mb-20">Địa điểm</h3>
                      <div className="px-10 mb-26">
                        <Input
                          placeholder="Bạn đang tìm gì?"
                          prefix={<SearchOutlined />}
                          className="input-search-province "
                        />
                      </div>
                      <Row
                        gutter={[20, 20]}
                        style={{ textAlign: "center", margin: "0 auto" }}
                      >
                        {selectProvince ? (
                          <>
                            {districts.map((val) => (
                              <Col span={12}>
                                <div
                                  key={val.id}
                                  className={`btn-province-item ${
                                    chooseDistrict?.find(
                                      (value) => value.Code === val.Code
                                    )
                                      ? "active"
                                      : ""
                                  } `}
                                  onClick={() => {
                                    handleChooseDistrict(val);
                                  }}
                                >
                                  {val.Name}
                                </div>
                              </Col>
                            ))}
                          </>
                        ) : (
                          <>
                            {provinces.map((val) => (
                              <Col span={12}>
                                <div
                                  key={val.id}
                                  className={`btn-province-item ${
                                    chooseProvinceMobile?.find(
                                      (value) => value?.Code === val?.Code
                                    )
                                      ? "active"
                                      : ""
                                  } `}
                                  onClick={() => {
                                    handleChooseProvince(val);
                                  }}
                                >
                                  {val.Name}
                                </div>
                              </Col>
                            ))}
                          </>
                        )}
                      </Row>
                    </div>
                  }
                  close={true}
                  btnClose={
                    <CheckSVG
                      onClick={(e) => {
                        if (selectProvince) {
                          e.stopPropagation();
                          setSelectProvince(null);
                          setDistricts([]);
                        }
                      }}
                    />
                  }
                >
                  <Button className="btn-item-filter">
                    Địa điểm <DownOutlined className="icon" />
                  </Button>
                </ModalBottom>
                <ModalBottom
                  height={"35%"}
                  modalContent={
                    <div className="modal-category-filter-page">
                      <h3 className="px-10 mb-20">Danh mục</h3>
                      <Row
                        gutter={[20, 20]}
                        style={{ textAlign: "center", margin: "0 auto" }}
                      >
                        {CATEGORIES.slice(1, 7).map((val) => (
                          <Col span={12}>
                            <div
                              key={val.id}
                              className={`btn-category-item ${
                                chooseCategory?.find(
                                  (value) => value.id === val.id
                                )
                                  ? "active"
                                  : ""
                              } `}
                              onClick={() => handleChooseCategoryMobile(val)}
                            >
                              {val.name}
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  }
                  extendProp={false}
                  close={true}
                  btnClose={<CheckSVG />}
                >
                  <Button className="btn-item-filter">
                    Danh mục <DownOutlined className="icon" />
                  </Button>
                </ModalBottom>
                <ModalBottom
                  modalContent={
                    <div className="modal-price-filter-page">
                      <h3 className="px-10 mb-20">Giá</h3>
                      <Row
                        gutter={[20, 20]}
                        style={{ textAlign: "center", margin: "0 auto" }}
                      >
                        {PRICE_FILTER.map((val) => (
                          <Col span={12}>
                            <div
                              key={val.value}
                              className={`btn-price-item ${
                                choosePrice === val.value ? "active" : ""
                              }`}
                              onClick={() => setChoosePrice(val)}
                            >
                              {val.label}
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <div className="px-10 my-20">
                        <div style={{ fontSize: 18 }}>
                          {convertPrice(priceRange[0])} đ -{" "}
                          {convertPrice(priceRange[1])} đ
                        </div>
                        <Row>
                          <Slider
                            className="w-100"
                            range
                            defaultValue={priceRange}
                            step={100000}
                            min={0}
                            max={5000000}
                            onChange={(value) => setPriceRange(value)}
                          />
                        </Row>
                      </div>
                    </div>
                  }
                  extendProp={false}
                  close={true}
                  btnClose={<CheckSVG />}
                >
                  <Button className="btn-item-filter">
                    Giá <DownOutlined className="icon" />
                  </Button>
                </ModalBottom>
                {/* <Form.Item
                  name="category"
                  style={{ width: "100%", marginRight: "20px" }}
                >
                  <Select defaultValue="-1" className="select-item">
                    <Option value="-1" disabled={true}>
                      Danh mục
                    </Option>
                    {CATEGORIES.map((val) => (
                      <Option key={val.id} value={val.id}>
                        {val.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="price" style={{ width: "100%" }}>
                  <Select defaultValue="" className="select-item">
                    <Option value="">Giá</Option>
                    <Option value={2}>Giá cao nhất</Option>
                    <Option value={1}>Giá thấp nhất </Option>
                    <Option value={3}>Giảm giá nhiều nhất </Option>
                  </Select>
                </Form.Item> */}
              </div>
              {/* <p className="time">Khung giờ bạn muốn đặt</p>

          <SelectTime /> */}
              <Form.Item
                style={{
                  textAlign: "center",
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "35px",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "50%" }}
                  className="btn-search"
                >
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Form>
            {/* {user ? (
            <div className="wrapper-user">
              <Dropdown overlay={menuSignOut} placement="topRight" arrow>
                <div className="user">
                  <Avatar src={user.Image ? img : noBody} />
                  <div className="text ms-8">
                    <p>Tài khoản</p>
                    <p>
                      {user?.Fullname ? user.Fullname : user.Email}
                      <DownOutlined
                        style={{
                          fontSize: "10px",
                          color: "#828282",
                          marginLeft: "3px",
                        }}
                      />
                    </p>
                  </div>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="wrapper-user">
              <Dropdown overlay={menuSignIn} placement="topRight" arrow>
                <div className="user">
                  <Avatar src={noBody} />
                  <div className="text">
                    {!user && <p>Đăng ký/Đăng nhập</p>}
                    <p>
                      {user ? user.Fullname : "Tài khoản"}
                      <DownOutlined
                        style={{ fontSize: "10px", color: "#828282" }}
                      />
                    </p>
                  </div>
                </div>
              </Dropdown>
            </div>
          )} */}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FilterPage;
