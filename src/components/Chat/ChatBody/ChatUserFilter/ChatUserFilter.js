import "./ChatUserFilter.scss";
import { Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { chatService } from "../../../../services/ChatService";
import { FilterChatOption } from "./FilterChatOption";
import { useDispatch, useSelector } from "react-redux";
import {
  createConverAction,
  findConverAction,
} from "../../../../stores/actions/ChatAction";
import moment from "moment";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import { registerPartnerService } from "../../../../services/RegisterPartnerService";
import { TOGGLE_STATE } from "../../../../stores/types/messType";
const { Option } = Select;

export const ChatUserFilter = (props) => {
  const { initMountStateUser, setToggleState, setConversation } = props;
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const dispatch = useDispatch();
  const [partnerList, setPartnerList] = useState([]);
  const [value, setValue] = useState(null);

  const getAllNewConversation = async () => {
    const res = await chatService.getConversation(8, 1, UserMe.id, 1);
    initMountStateUser.current = res?.data?.data;
    setConversation(res?.data?.data);
    setToggleState(res?.data?.data[0]?.id);
    dispatch({ type: TOGGLE_STATE, payload: res?.data?.data[0]?.id });
  };

  const onChange = (value, option) => {
    setValue(option.children.props.info.PartnerName);
    (async () => {
      try {
        const { data } = await chatService.createConversation(
          option.children.props.info.id,
          UserMe.id
        );
        // console.log(data);
        socket.emit("send_message", {
          id: Math.random(),
          ConversationId: data.payload.id,
          createdAt: moment().toISOString(),
          Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
          Chatting: {
            id: data.payload.Partner.id,
            PartnerName: data.payload.Partner.PartnerName,
            Phone: data.payload.Partner.Phone ? data.payload.Partner.Phone : "",
            Email: data.payload.Partner.Email ? data.payload.Partner.Email : "",
          },
          Type: "text",
        });
        dispatch(createConverAction(data.payload.id));
        if (data.success) {
          await getAllNewConversation();
        }
      } catch (error) {
        dispatch(findConverAction(error.response.data.message.id));
      }
    })();
  };

  const onSearch = async (value) => {
    const { data } = await registerPartnerService.searchForRegisterPartner(
      value
    );
    // console.log(data.payload);
    if (data.payload.length > 0) {
      const fetchedData = data.payload.reduce(
        (total, curr) => {
          total = total.filter((val) => val.id !== curr.id);

          return [...total, curr];
        },
        [...partnerList]
      );
      setPartnerList([...fetchedData]);
    }
  };

  return (
    <Select
      notFoundContent={null}
      defaultActiveFirstOption={false}
      className="Chat__body__user__search"
      showSearch
      placeholder="Tìm kiếm"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={false}
      showArrow={false}
      value={value}
    >
      {partnerList?.map((itm, index) => {
        return (
          <Option value={itm?.id?.toString()} key={index}>
            <FilterChatOption info={itm} />
          </Option>
        );
      })}
    </Select>
  );
};
