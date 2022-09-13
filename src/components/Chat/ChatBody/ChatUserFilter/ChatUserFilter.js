import "./ChatUserFilter.scss";
import { Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { chatService } from "../../../../services/ChatService";
import { FilterChatOption } from "./FilterChatOption";
import { useDispatch } from "react-redux";
import {
  createConverAction,
  findConverAction,
} from "../../redux/action/FindConverAction";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import { UserMe } from "../ChatContent/ChatContent";
const { Option } = Select;
export const ChatUserFilter = () => {
  const dispatch = useDispatch();
  const [listChat, setListChat] = useState([]);
  const [value, setValue] = useState(null);
  const onChange = (value, option) => {
    setValue(option.children.props.info.PartnerName);
    (async () => {
      try {
        const create = await chatService.createConversation(
          option.children.props.info.id,
          UserMe.id
        );
        const chat = await chatService.sendMessage({
          ConversationId: create.data.id,
          Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
          Partner: true,
        });
        console.log();
        socket.emit("send_message", {
          id: chat.data.id,
          ConversationId: create.data.id,
          createdAt: chat.data.createdAt,
          Content: chat.data.Content,
          Chatting: {
            id: create.data.Partner.id,
            PartnerName: create.data.Partner.PartnerName,
            Phone: create.data.Partner.Phone ? create.data.Partner.Phone : "",
            Email: create.data.Partner.Email ? create.data.Partner.Email : "",
          },
        });
        dispatch(createConverAction(create.data.id));
      } catch (error) {
        dispatch(findConverAction(error.response.data.message.id));
      }
    })();
  };
  const onSearch = (value) => {};
  useEffect(() => {
    (async () => {
      const res = await chatService.getListPartner();
      setListChat(res.data);
    })();
  }, []);
  return (
    <Select
      notFoundContent={
        <div className="no-found-search">Không tìm thấy người dùng</div>
      }
      className="Chat__body__user__search"
      showSearch
      placeholder="Tìm kiếm"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.props.info.PartnerName.toLowerCase().includes(
          input.toLowerCase()
        )
      }
      value={value}
    >
      {listChat.map((itm, index) => {
        return (
          <Option value={itm.id.toString()} key={index}>
            <FilterChatOption info={itm} />
          </Option>
        );
      })}
    </Select>
  );
};
