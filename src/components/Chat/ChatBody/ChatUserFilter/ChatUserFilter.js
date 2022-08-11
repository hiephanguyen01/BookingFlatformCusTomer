import "./ChatUserFilter.scss";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useState } from "react";
import { Conversation } from "../ChatBody";
import { ChatUser } from "../ChatUser/ChatUser";

const { Option } = Select;
export const ChatUserFilter = () => {
  const [value, setValue] = useState(null);
  const onChange = (value,option) => {
    setValue(option.children.props.userInfo.Chatter1.Name)
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <Select
      className="Chat__body__user__search"
      showSearch
      placeholder="Tìm kiếm"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        /*  console.log(option) */
        option.children.props.userInfo.Chatter1.Name.toLowerCase().includes(
          input.toLowerCase()
        )
      }
      value={value}
    >
      {Conversation.map((itm, index) => {
        console.log(itm.id);
        return (
          <Option value={itm.id.toString()} key={index} onC>
            <ChatUser userInfo={itm} hideLastMess={true} />
          </Option>
        );
      })}
    </Select>
  );
};
