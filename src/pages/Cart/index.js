import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Tabs, message } from "antd";
import moment from "moment";
import queryString from "query-string";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CheckBox from "../../components/CheckBox";
import Promotion from "../../components/Promotion";
import { cartService } from "../../services/CartService";
import { orderService } from "../../services/OrderService";
import {
  addServiceList,
  addServiceToList,
  getCartItemByCategory,
} from "../../stores/actions/CartAction";
import { DEFINE_SERVICES_TO_LIST } from "../../stores/types/CartType";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { calculateTotal, calculateTotalUsePromo } from "../../utils/calculate";
import { compareItemChooseServiceListWithCartItem } from "../../utils/cartUtils";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import CartCategory from "./CartCategory";
import "./cart.scss";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, chooseServiceList } = useSelector((state) => state.CartReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const [chooseServices, setChooseServices] = useState([]);

  useEffect(() => {
    /**
     * GET cart items
     */
    if (searchParams.get("category")) {
      dispatch(getCartItemByCategory(searchParams.get("category")));
    } else {
      navigate("/home/cart?category=1");
    }
    // return () => {
    //   setChooseServices([]);
    // };
  }, [navigate, searchParams.get("category")]);

  useEffect(() => {
    dispatch({ type: DEFINE_SERVICES_TO_LIST, payload: [] });
  }, [dispatch]);

  const renderImageArgument = (orderItem, item) => {
    if (orderItem?.Image) {
      return orderItem?.Image;
    } else {
      return typeof item?.Image === "string" ? item?.Image : item?.Image[0];
    }
  };

  const handleOnChecked = (category, cartService, postId, postName) => {
    dispatch(
      addServiceToList({
        ...cartService,
        postId: postId,
        postName: postName,
        category,
      })
    );
  };

  const handleOnCheckedAll = async (categoryId, post) => {
    /**
     * Handles the event when the user checks or unchecks the "Check all" checkbox for a post.

      Params:
        categoryId: The ID of the category that the post belongs to.
        post: The post object === cart[category] items (look for it in Redux CartReducer).

      Returns:
        Void
     */
    let currentlyChosenServices = [...chooseServiceList];
    const checkAll = compareItemChooseServiceListWithCartItem(
      chooseServiceList,
      post
    );
    if (checkAll) {
      currentlyChosenServices = [];
    } else {
      currentlyChosenServices = [...post?.Services];
    }

    const checkTime = await Promise.all(
      [...currentlyChosenServices].map(async (item) => {
        const res = await orderService.checkOrderTimeExits({
          OrderByTime: item?.OrderByTime,
          OrderByTimeFrom: item?.OrderByTimeFrom,
          OrderByTimeTo: item?.OrderByTimeTo,
          OrderByDateFrom: item?.OrderByDateFrom,
          OrderByDateTo: item?.OrderByDateTo,
          ServiceId: item?.StudioRoom?.Id,
          Category: item?.Category,
        });
        return res?.data?.success;
      })
    );
    if (!checkTime.some((item) => item)) {
      dispatch(addServiceList([...currentlyChosenServices]));
    } else {
      message.warning("Đã có người chọn trong khoảng thời gian này!");
    }
  };

  const handleBtnDelete = useCallback(
    async (id) => {
      try {
        await cartService.removeServiceFromCart(id);
        dispatch(getCartItemByCategory(searchParams.get("category")));
        if (chooseServiceList.filter((item) => item.id === id).length > 0) {
          let newChooseServiceList = chooseServiceList.filter(
            (item) => item.id !== id
          );
          dispatch(addServiceList(newChooseServiceList));
        }
      } catch (error) {}
    },
    [dispatch, searchParams.get("category")]
  );

  const items = [
    {
      key: "1",
      label: "Studio",
      children: (
        // <Row gutter={[0, 6]}>
        //   {cart["studio"]?.map((orderItem, index) => (
        //     <Col span={24} className="wrapper" key={index}>
        //       <CheckBox
        //         key={index}
        //         name="allCheck"
        //         value="allCheck"
        //         onClick={() => handleOnCheckedAll(1, orderItem)}
        //         checked={
        //           chooseServiceList.length > 0 &&
        //           chooseServiceList.filter((item) => {
        //             return orderItem?.Services.some(
        //               (item2) => item?.Category === 1 && item?.id === item2?.id
        //             );
        //           }).length === orderItem?.Services?.length
        //         }
        //       >
        //         <div
        //           style={{
        //             fontWeight: "400",
        //             fontSize: "14px",
        //             lineHeight: "19px",
        //             color: "#3F3F3F",
        //           }}
        //         >
        //           {orderItem?.Name}
        //         </div>
        //       </CheckBox>
        //       {orderItem?.Services?.map((item, index) => (
        //         <CheckBox
        //           onClick={() =>
        //             handleOnChecked(1, item, orderItem?.Id, orderItem?.Name)
        //           }
        //           key={index}
        //           name={item?.id}
        //           value={item?.id}
        //           checked={chooseServiceList.some(
        //             (service) =>
        //               service?.id === item?.id &&
        //               service?.postId === orderItem?.Id &&
        //               service?.Category === 1
        //           )}
        //         >
        //           <Row
        //             className="checkbox_content w-100"
        //             align={"middle"}
        //             justify={"space-between"}
        //             gutter={[15, 10]}
        //           >
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row className="w-100 h-100" gutter={(0, 10)}>
        //                 <Col span={6} className="">
        //                   <img
        //                     src={convertImage(item?.StudioRoom?.Image1)}
        //                     className="w-100 h-80px"
        //                     style={{ objectFit: "cover", cursor: "pointer" }}
        //                     alt=""
        //                     onClick={() =>
        //                       navigate(`/home/studio/${orderItem?.Id}`)
        //                     }
        //                   />
        //                 </Col>
        //                 <Col span={18}>
        //                   <label
        //                     className="checkbox_label"
        //                     onClick={() =>
        //                       navigate(`/home/studio/${orderItem?.Id}`)
        //                     }
        //                   >
        //                     {item?.StudioRoom?.Name}
        //                   </label>
        //                 </Col>
        //               </Row>
        //             </Col>
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row
        //                 className="w-100 mb-20"
        //                 gutter={[0, 10]}
        //                 align={"top"}
        //                 justify={"space-between"}
        //               >
        //                 <Col span={12} className="checkbox_desc">
        //                   {item.OrderByTime ? (
        //                     <>
        //                       <div>
        //                         Ngày
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom)
        //                             .utc()
        //                             .format("DD/MM/YYYY")}
        //                         </span>
        //                       </div>
        //                       <div>
        //                         Giờ
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom)
        //                             .utc()
        //                             .format("HH:mm")}
        //                         </span>
        //                         {" - "}
        //                         <span>
        //                           {moment(item?.OrderByTimeTo)
        //                             .utc()
        //                             .format("HH:mm")}
        //                         </span>
        //                       </div>
        //                     </>
        //                   ) : (
        //                     <div>
        //                       Ngày
        //                       <span className="date">
        //                         {moment(item?.OrderByDateFrom)
        //                           .utc()
        //                           .format("DD/MM/YYYY")}
        //                       </span>
        //                       {" - "}
        //                       <span>
        //                         {moment(item?.OrderByDateTo)
        //                           .utc()
        //                           .format("DD/MM/YYYY")}
        //                       </span>
        //                     </div>
        //                   )}
        //                 </Col>
        //                 <Col span={12} className="checkbox_action">
        //                   <div onClick={() => handleBtnDelete(item?.id)}>
        //                     Xóa
        //                   </div>
        //                 </Col>
        //               </Row>
        //               <Row>
        //                 <Col span={24} className="">
        //                   <div className="price">
        //                     {convertPrice(item?.price)}đ
        //                   </div>
        //                 </Col>
        //               </Row>
        //             </Col>
        //           </Row>
        //         </CheckBox>
        //       ))}
        //     </Col>
        //   ))}
        // </Row>
        <CartCategory
          categoryId={1}
          postUrlEnpoint={"studio"}
          servicePackageName={"StudioRoom"}
          handleOnCheckedAll={handleOnCheckedAll}
          handleOnChecked={handleOnChecked}
          handleBtnDelete={handleBtnDelete}
        />
      ),
    },
    {
      key: "2",
      label: "Nhiếp ảnh",
      children: (
        // <Row gutter={[0, 6]}>
        //   {cart["photographer"]?.map((orderItem, index) => (
        //     <Col span={24} className="wrapper" key={index}>
        //       <CheckBox
        //         key={index}
        //         name="allCheck"
        //         value="allCheck"
        //         onClick={() =>
        //           handleOnCheckedAll(2, orderItem?.id, orderItem?.Services)
        //         }
        //         checked={
        //           chooseServices.filter(
        //             (item) =>
        //               item?.category === 2 && item?.postId === orderItem?.id
        //           ).length === orderItem?.Services?.length
        //         }
        //       >
        //         <div
        //           style={{
        //             fontWeight: "400",
        //             fontSize: "14px",
        //             lineHeight: "19px",
        //             color: "#3F3F3F",
        //           }}
        //         >
        //           {orderItem?.Name}
        //         </div>
        //       </CheckBox>
        //       {orderItem?.Services?.map((item, index) => (
        //         <CheckBox
        //           onClick={() =>
        //             handleOnChecked(2, item, orderItem?.Id, orderItem?.Name)
        //           }
        //           key={index}
        //           name={item?.id}
        //           value={item?.id}
        //           checked={chooseServices.some(
        //             (service) =>
        //               service?.id === item?.id &&
        //               service?.postId === orderItem?.id &&
        //               service?.category === 2
        //           )}
        //         >
        //           <Row
        //             className="checkbox_content w-100"
        //             align={"middle"}
        //             justify={"space-between"}
        //             gutter={[15, 10]}
        //           >
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row className="w-100 h-100" gutter={(0, 10)}>
        //                 <Col span={6} className="">
        //                   <img
        //                     src={item?.image}
        //                     className="w-100 h-80px"
        //                     style={{ objectFit: "cover" }}
        //                     alt=""
        //                   />
        //                 </Col>
        //                 <Col span={18}>
        //                   <label className="checkbox_label">{item?.Name}</label>
        //                 </Col>
        //               </Row>
        //             </Col>
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row
        //                 className="w-100 mb-20"
        //                 gutter={[0, 10]}
        //                 align={"top"}
        //                 justify={"space-between"}
        //               >
        //                 <Col span={12} className="checkbox_desc">
        //                   {item.OrderByTime ? (
        //                     <>
        //                       <div>
        //                         Ngày
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom).format(
        //                             "DD/MM/YYYY"
        //                           )}
        //                         </span>
        //                       </div>
        //                       <div>
        //                         Giờ
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom).format(
        //                             "HH:mm"
        //                           )}
        //                         </span>
        //                         {" - "}
        //                         <span>
        //                           {moment(item?.OrderByTimeTo).format("HH:mm")}
        //                         </span>
        //                       </div>
        //                     </>
        //                   ) : (
        //                     <div>
        //                       Ngày
        //                       <span className="date">
        //                         {moment(item?.OrderByDateFrom).format(
        //                           "DD/MM/YYYY"
        //                         )}
        //                       </span>
        //                       {" - "}
        //                       <span>
        //                         {moment(item?.OrderByDateTo).format(
        //                           "DD/MM/YYYY"
        //                         )}
        //                       </span>
        //                     </div>
        //                   )}
        //                 </Col>
        //                 <Col span={12} className="checkbox_action">
        //                   <div onClick={() => {}}>Xóa</div>
        //                 </Col>
        //               </Row>
        //               <Row>
        //                 <Col span={24} className="">
        //                   <div className="price">
        //                     {" "}
        //                     {convertPrice(item?.Price || item?.price)}đ
        //                   </div>
        //                 </Col>
        //               </Row>
        //             </Col>
        //           </Row>
        //         </CheckBox>
        //       ))}
        //     </Col>
        //   ))}
        // </Row>
        <CartCategory
          categoryId={2}
          postUrlEnpoint={"photographer"}
          servicePackageName={"PhotographerServicePackage"}
          handleOnCheckedAll={handleOnCheckedAll}
          handleOnChecked={handleOnChecked}
          handleBtnDelete={handleBtnDelete}
        />
      ),
    },
    {
      key: "3",
      label: "Trang phục",
      children: (
        // <Row gutter={[0, 6]}>
        //   {cart["clothes"]?.map((orderItem, index) => (
        //     <Col span={24} className="wrapper" key={index}>
        //       <CheckBox
        //         key={index}
        //         name="allCheck"
        //         value="allCheck"
        //         onClick={() =>
        //           handleOnCheckedAll(3, orderItem?.id, orderItem?.Services)
        //         }
        //         checked={
        //           chooseServices.filter(
        //             (item) =>
        //               item?.category === 3 && item?.postId === orderItem?.id
        //           ).length === orderItem?.Services?.length
        //         }
        //       >
        //         <div
        //           style={{
        //             fontWeight: "400",
        //             fontSize: "14px",
        //             lineHeight: "19px",
        //             color: "#3F3F3F",
        //           }}
        //         >
        //           {orderItem?.Name}
        //         </div>
        //       </CheckBox>
        //       {orderItem?.Services?.map((item, index) => (
        //         <CheckBox
        //           onClick={() => handleOnChecked(3, orderItem, item)}
        //           key={index}
        //           name={item?.id}
        //           value={item?.id}
        //           checked={chooseServices.some(
        //             (service) =>
        //               service?.id === item?.id &&
        //               service?.postId === orderItem?.id &&
        //               service?.category === 3
        //           )}
        //         >
        //           <Row
        //             className="checkbox_content w-100"
        //             align={"middle"}
        //             justify={"space-between"}
        //             gutter={[15, 10]}
        //           >
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row className="w-100 h-100" gutter={(0, 10)}>
        //                 <Col span={6} className="">
        //                   <img
        //                     src={orderItem?.Image1}
        //                     className="w-100 h-80px"
        //                     style={{ objectFit: "cover" }}
        //                     alt=""
        //                   />
        //                 </Col>
        //                 <Col span={18}>
        //                   <label className="checkbox_label">
        //                     {orderItem?.Name}
        //                   </label>
        //                 </Col>
        //               </Row>
        //             </Col>
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row
        //                 className="w-100 mb-20"
        //                 gutter={[0, 10]}
        //                 align={"top"}
        //                 justify={"space-between"}
        //               >
        //                 <Col span={12} className="checkbox_desc">
        //                   {item.OrderByTime ? (
        //                     <>
        //                       <div>
        //                         Ngày
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom).format(
        //                             "DD/MM/YYYY"
        //                           )}
        //                         </span>
        //                       </div>
        //                       <div>
        //                         Giờ
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom).format(
        //                             "HH:mm"
        //                           )}
        //                         </span>
        //                         {" - "}
        //                         <span>
        //                           {moment(item?.OrderByTimeTo).format("HH:mm")}
        //                         </span>
        //                       </div>
        //                     </>
        //                   ) : (
        //                     <div>
        //                       Ngày
        //                       <span className="date">
        //                         {moment(item?.OrderByDateFrom).format(
        //                           "DD/MM/YYYY"
        //                         )}
        //                       </span>
        //                       {" - "}
        //                       <span>
        //                         {moment(item?.OrderByDateTo).format(
        //                           "DD/MM/YYYY"
        //                         )}
        //                       </span>
        //                     </div>
        //                   )}
        //                 </Col>
        //                 <Col span={12} className="checkbox_action">
        //                   <div onClick={() => {}}>Xóa</div>
        //                 </Col>
        //               </Row>
        //               <Row>
        //                 <Col span={24} className="">
        //                   <div className="price">
        //                     {" "}
        //                     {convertPrice(item?.Price)}đ
        //                   </div>
        //                 </Col>
        //               </Row>
        //             </Col>
        //           </Row>
        //         </CheckBox>
        //       ))}
        //     </Col>
        //   ))}
        // </Row>
        <CartCategory
          categoryId={3}
          postUrlEnpoint={"clothes"}
          servicePackageName={"ClothesPost"}
          handleOnCheckedAll={handleOnCheckedAll}
          handleOnChecked={handleOnChecked}
          handleBtnDelete={handleBtnDelete}
        />
      ),
    },
    {
      key: "4",
      label: "Make up",
      children: (
        // <Row gutter={[0, 6]}>
        //   {cart["makeup"]?.map((orderItem, index) => (
        //     <Col span={24} className="wrapper" key={index}>
        //       <CheckBox
        //         key={index}
        //         name="allCheck"
        //         value="allCheck"
        //         onClick={() =>
        //           handleOnCheckedAll(4, orderItem?.id, orderItem?.Services)
        //         }
        //         checked={
        //           chooseServices.filter(
        //             (item) =>
        //               item?.category === 4 && item?.postId === orderItem?.id
        //           ).length === orderItem?.Services?.length
        //         }
        //       >
        //         <div
        //           style={{
        //             fontWeight: "400",
        //             fontSize: "14px",
        //             lineHeight: "19px",
        //             color: "#3F3F3F",
        //           }}
        //         >
        //           {orderItem?.Name}
        //         </div>
        //       </CheckBox>
        //       {orderItem?.Services?.map((item, index) => (
        //         <CheckBox
        //           onClick={() => handleOnChecked(4, orderItem?.id, item)}
        //           key={index}
        //           name={item?.id}
        //           value={item?.id}
        //           checked={chooseServices.some(
        //             (service) =>
        //               service?.id === item?.id &&
        //               service?.postId === orderItem?.id &&
        //               service?.category === 4
        //           )}
        //         >
        //           <Row
        //             className="checkbox_content w-100"
        //             align={"middle"}
        //             justify={"space-between"}
        //             gutter={[15, 10]}
        //           >
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row className="w-100 h-100" gutter={(0, 10)}>
        //                 <Col span={6} className="">
        //                   <img
        //                     src={item?.image}
        //                     className="w-100 h-80px"
        //                     style={{ objectFit: "cover" }}
        //                     alt=""
        //                   />
        //                 </Col>
        //                 <Col span={18}>
        //                   <label className="checkbox_label">{item?.Name}</label>
        //                 </Col>
        //               </Row>
        //             </Col>
        //             <Col lg={12} md={24} sm={24} xs={24} className="h-100">
        //               <Row
        //                 className="w-100 mb-20"
        //                 gutter={[0, 10]}
        //                 align={"top"}
        //                 justify={"space-between"}
        //               >
        //                 <Col span={12} className="checkbox_desc">
        //                   {item.OrderByTime ? (
        //                     <>
        //                       <div>
        //                         Ngày
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom).format(
        //                             "DD/MM/YYYY"
        //                           )}
        //                         </span>
        //                       </div>
        //                       <div>
        //                         Giờ
        //                         <span className="date">
        //                           {moment(item?.OrderByTimeFrom).format(
        //                             "HH:mm"
        //                           )}
        //                         </span>
        //                         {" - "}
        //                         <span>
        //                           {moment(item?.OrderByTimeTo).format("HH:mm")}
        //                         </span>
        //                       </div>
        //                     </>
        //                   ) : (
        //                     <div>
        //                       Ngày
        //                       <span className="date">
        //                         {moment(item?.OrderByDateFrom).format(
        //                           "DD/MM/YYYY"
        //                         )}
        //                       </span>
        //                       {" - "}
        //                       <span>
        //                         {moment(item?.OrderByDateTo).format(
        //                           "DD/MM/YYYY"
        //                         )}
        //                       </span>
        //                     </div>
        //                   )}
        //                 </Col>
        //                 <Col span={12} className="checkbox_action">
        //                   <div onClick={() => {}}>Xóa</div>
        //                 </Col>
        //               </Row>
        //               <Row>
        //                 <Col span={24} className="">
        //                   <div className="price">
        //                     {" "}
        //                     {convertPrice(item?.Price)}đ
        //                   </div>
        //                 </Col>
        //               </Row>
        //             </Col>
        //           </Row>
        //         </CheckBox>
        //       ))}
        //     </Col>
        //   ))}
        // </Row>
        <CartCategory
          categoryId={4}
          postUrlEnpoint={"makeup"}
          servicePackageName={"MakeupServicePackage"}
          handleOnCheckedAll={handleOnCheckedAll}
          handleOnChecked={handleOnChecked}
          handleBtnDelete={handleBtnDelete}
        />
      ),
    },
    {
      key: "5",
      label: "Thiết bị",
      children: (
        <Row gutter={[0, 6]}>
          {cart["device"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(5, orderItem?.id, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 5 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(5, orderItem?.id, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 5
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={item?.image}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {convertPrice(item?.Price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "6",
      label: "Người mẫu",
      children: (
        <Row gutter={[0, 6]}>
          {cart["model"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() => handleOnCheckedAll(6, orderItem)}
                checked={
                  chooseServiceList.length > 0 &&
                  chooseServiceList.filter((item) => {
                    return orderItem?.Services.some(
                      (item2) => item?.Category === 6 && item?.id === item2?.id
                    );
                  }).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() =>
                    handleOnChecked(6, item, orderItem?.id, orderItem?.Name)
                  }
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={
                    chooseServiceList.length > 0
                      ? chooseServiceList.some(
                          (service) =>
                            service?.id === item?.id && service?.Category === 6
                        )
                      : false
                  }
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          {/* {item?.Image !== undefined && ( */}
                          <img
                            src={convertImage(
                              renderImageArgument(orderItem, item)
                            )}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                            onClick={() =>
                              navigate(`/home/model/${orderItem?.Id}`)
                            }
                          />
                          {/* )} */}
                        </Col>
                        <Col span={18}>
                          <label
                            onClick={() =>
                              navigate(`/home/model/${orderItem?.Id}`)
                            }
                            className="checkbox_label"
                          >
                            {item?.ModelServicePackage?.Name}
                          </label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => handleBtnDelete(item?.id)}>
                            Xóa
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {convertPrice(item?.price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  const onChange = (key) => {
    setSearchParams({ category: key });
  };

  const onClickModal = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Promotion />,
    });
  };

  const handleButtonOrder = () => {
    try {
      if (chooseServiceList.length > 0) {
        // dispatch(addServiceList(chooseServices));
        const arr = chooseServiceList.map((item) => ({
          id: item?.id,
          category: item?.Category,
        }));
        const createQuery = queryString.stringify({
          cartItems: JSON.stringify(arr),
        });
        navigate(`order?${createQuery}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#f5f5f5" }}>
      <div className="cart_container">
        <h3>Giỏ hàng</h3>
        <Row className="cart_row" gutter={[12, 15]}>
          <Col lg={16} md={16} sm={24} xs={24} className="cart_col_left">
            <div className="cart_tab_pane">
              <Tabs defaultActiveKey="1" onChange={onChange} items={items} />
            </div>
          </Col>
          <Col lg={8} md={8} sm={24} xs={0} className="cart_col_right">
            <div
              className="card"
              style={{
                padding: "25px 25px ",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{
                  borderBottom: "0.6px solid #E7E7E7",
                  padding: "0 0 14px",
                  margin: "0 0 16px",
                }}
              >
                <div>Chọn mã khuyến mãi</div>

                <Space onClick={() => onClickModal()}>
                  Mã khuyến mãi
                  <RightOutlined />
                </Space>
              </div>
              <div style={{ padding: "16px 15px" }}>
                <Row
                  align={"middle"}
                  justify={"space-between"}
                  className="mb-8"
                  gutter={[0, 10]}
                >
                  <Col lg={14} md={24}>
                    <div className="text-middle" style={{ color: "#222222" }}>
                      Đã chọn {chooseServiceList.length} sản phẩm
                    </div>
                  </Col>
                  <Col lg={10} style={{ textAlign: "end" }}>
                    <div
                      className="text-description "
                      style={{
                        textDecoration: "line-through",
                        color: "#828282",
                      }}
                    >
                      {`${convertPrice(calculateTotal(chooseServiceList))}đ`}
                    </div>
                  </Col>
                </Row>
                <Row
                  align={"middle"}
                  justify={"space-between"}
                  gutter={[0, 10]}
                >
                  <Col lg={14}>
                    <div
                      className="text-description"
                      style={{ color: "#616161" }}
                    >
                      Bao gồm 50.000đ thuế và phí
                    </div>
                  </Col>
                  <Col lg={10} style={{ textAlign: "end" }}>
                    <div
                      className=""
                      style={{
                        color: "#E22828",
                        fontSize: "20px",
                        lineHeight: "28px",
                        fontWeight: "700",
                      }}
                    >
                      {`${convertPrice(
                        calculateTotalUsePromo(chooseServiceList)
                      )}đ`}
                    </div>
                  </Col>
                </Row>
              </div>
              <Button
                type="primary"
                style={{ borderRadius: "8px", height: "45px", width: "100%" }}
                onClick={handleButtonOrder}
              >
                Đặt ngay
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
