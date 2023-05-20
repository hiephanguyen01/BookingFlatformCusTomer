import React, { memo, useState } from "react";
import { Button, Input, AutoComplete, Checkbox, Tag, Row, Col } from "antd";

import "./modalChooseService.scss";
import { LoadingOutlined, SearchOutlined, StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../../../stores/types/modalTypes";
import { useEffect } from "react";
import { postDaoService } from "../../../../services/PostDaoService";
import { convertImage } from "../../../../utils/convertImage";
import { convertPrice } from "../../../../utils/convert";
import { setRelatedService } from "../../../../stores/actions/PostDaoAction";

const ModalChooseService = ({
  hasTags,
  PostId,
  relatedServices,
  setRelatedServices,
}) => {
  // const { relatedService } = useSelector((state) => state.postDaoReducer);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [services, setServices] = useState([]);
  const [selectService, setSelectService] = useState([...relatedServices]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectService([...relatedServices]);
  }, [relatedServices]);

  useEffect(() => {
    setSearch("");
    //   setSelectService([]);
    //   setRelatedServices([]);
  }, [hasTags]);

  useEffect(() => {
    setLoading(true);
    const getRelatedService = async () => {
      const { data } = await postDaoService.filterRelatedService(
        hasTags,
        search
      );
      setServices([...data.data]);
      setOptions(
        data.data.map((item) => ({
          value: item.Name,
        }))
      );
      setLoading(false);
    };
    getRelatedService();
  }, [search, hasTags]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const onSelect = (value) => {
    setSearch(value);
  };

  const handleCheckBox = (service) => {
    let newSelectService = [...selectService];
    if (newSelectService.filter((item) => item.id === service.id).length > 0) {
      newSelectService = newSelectService.filter(
        (item) => item.id !== service.id
      );
    } else {
      newSelectService.push({ ...service });
    }
    setSelectService(newSelectService);
  };
  const handleCmtRelatedService = async () => {
    // dispatch(setRelatedService([...relatedServices]));
    setRelatedServices(selectService);
    // const newData = selectService.reduce(
    //   (arr, item) => [...arr, { category: item.category, serviceId: item.id }],
    //   []
    // );
    // try {
    //   const res = await postDaoService.createComment({
    //     PostId,
    //     Content:
    //       (chooseCommentDefault.Content || "") +
    //       "---" +
    //       newData.map((item) => JSON.stringify(item)).join("//") +
    //       "//",
    //   });
    //   if (res) {
    //     handleState();
    //   }
    // } catch (error) {
    //   toastMessage("Add related service fail!", "error");
    // }
  };

  const handleCloseTag = (e, tag) => {
    e.preventDefault();
    // newSelectService = newSelectService.filter((item) => item.id !== tag.id);
    setRelatedServices(relatedServices.filter((item) => item.id !== tag.id));
  };
  return (
    <div className="search-container">
      <AutoComplete
        className="search-wrap"
        options={options}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSearch={handleSearch}
        onSelect={onSelect}
        value={search}
      >
        <Input.Search
          prefix={
            <SearchOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
          }
          size="large"
          placeholder="Tìm studio, người mẫu,..."
        />
      </AutoComplete>
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
      ) : (
        <>
          <div className="search-body">
            <div className="number-service-select">
              {selectService.length} bài đăng được chọn
            </div>
            <ul className="service-list">
              <ul className="choose-service-list">
                {selectService.map((item, index) => (
                  <Tag
                    key={index}
                    closable
                    onClose={(e) => handleCloseTag(e, item)}
                    className="choose-service-list-tag"
                  >
                    {item.Name}
                  </Tag>
                ))}
              </ul>
              {services.map((item, index) => (
                <Row
                  key={index}
                  className="service-list-item"
                  gutter={[15, 0]}
                  align="middle"
                >
                  <Col className="h-100" span={8}>
                    <img
                      className="service-image"
                      src={convertImage(item?.Image[0])}
                      alt=""
                    />
                  </Col>
                  <Col
                    className="h-100 d-flex align-items-center"
                    span={13}
                    justify="center"
                  >
                    {" "}
                    <div className="service-content">
                      <h5 className="service-content-name">{item.Name}</h5>
                      <p className="service-content-price">
                        {convertPrice(item.Price)}
                        {item.PriceUnit || "/ giờ"}
                      </p>
                      <div className="service-content-rating">
                        <StarFilled className="service-content-rating-start me-5" />
                        <span>{item.TotalRate}</span> |{" "}
                        <span>Đã đặt {item.BookingCount}</span>
                      </div>
                    </div>
                  </Col>
                  <Col className="h-100 d-flex align-items-center" span={3}>
                    {" "}
                    <Checkbox
                      className="check-box"
                      checked={
                        selectService.some(
                          (itm) =>
                            item.id === itm.id && item.category === itm.category
                        )
                          ? true
                          : false
                      }
                      onChange={() => handleCheckBox(item)}
                    ></Checkbox>
                  </Col>
                </Row>
              ))}
            </ul>
          </div>
          <div className="search-footer">
            <Button
              className="h-40px me-20"
              onClick={() => {
                dispatch({ type: HIDE_MODAL });
                // dispatch(setRelatedService([]));
                setRelatedServices([]);
              }}
            >
              Hủy
            </Button>
            <Button
              className="h-40px px-50"
              type="primary"
              onClick={() => {
                dispatch({ type: HIDE_MODAL });
                handleCmtRelatedService();
              }}
            >
              Xong
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(ModalChooseService);
