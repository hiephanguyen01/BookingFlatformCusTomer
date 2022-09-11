import "./ChatUserFilter.scss";
import { Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { chatService } from "../../../../services/ChatService";
import { FilterChatOption } from "./FilterChatOption";
const { Option } = Select;
export const ChatUserFilter = () => {
  const [listChat, setListChat] = useState([]);
  const [value, setValue] = useState(null);
  const onChange = (value, option) => {
    console.log(option);
    setValue(option.children.props.children);
  };
  const onSearch = (value) => {};
  useEffect(() => {
    (async () => {
      const res = await chatService.getConversation(15, 1, 5, 1);

      setListChat(res.data.data);
    })();
  }, []);
  return (
    <Select
      className="Chat__body__user__search"
      showSearch
      placeholder="Tìm kiếm"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={
        (input, option) => console.log(option)
        /* option.children.props.userInfo.Chatter1.Name.toLowerCase().includes(
          input.toLowerCase()
        ) */
      }
      value={value}
    >
      {listChat.map((itm, index) => {
        return (
          <Option value={itm.id.toString()} key={index}>
            <FilterChatOption  info = {itm}/>
          </Option>
        );
      })}
    </Select>
  );
};
