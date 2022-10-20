import { Form, TimePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterStudioPost } from "../../stores/actions/studioPostAction";
import { convertDateSendToDB } from "../../utils/convert";

const SelectTime = () => {
  const [date, setDate] = useState(convertDateSendToDB(new Date()));
  const [time, setTime] = useState([]);
  const { filter } = useSelector((state) => state.studioPostReducer);
  const dispatch = useDispatch();

  const handleOnchangeHour = (t, timeString) => {
    setTime(timeString);
    if (date !== "") {
      dispatch(
        getFilterStudioPost(5, 1, {
          ...filter,
          OrderByTime: 0,
          OrderByTimeFrom:
            convertDateSendToDB(date).slice(0, 11) + timeString[0] + ":00.000Z",
          OrderByTimeTo:
            convertDateSendToDB(date).slice(0, 11) + timeString[1] + ":00.000Z",
        })
      );
    }
  };
  return (
    <TimePicker.RangePicker
      style={{ marginBottom: "40px" }}
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
  );
};

export default SelectTime;
