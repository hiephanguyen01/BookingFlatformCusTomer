import { DatePicker, Form, Radio, Space, TimePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterStudioService } from "../../stores/actions/studioPostAction";
import { SET_FILTER_SERVICE } from "../../stores/types/studioPostType";
import { convertDateSendToDB } from "../../utils/convert";

import "./selectTimeOptionService.scss";

const Option = ({ option, disabled }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);
  const dispatch = useDispatch();
  const [date, setDate] = useState(convertDateSendToDB(new Date()));
  const [time, setTime] = useState([]);
  const handleOnchangeDate = (d, dString) => {
    setDate(dString);
    if (time.length > 0) {
      dispatch(
        setFilterStudioService(5, 1, {
          ...filterService,
          OrderByTime: 0,
          OrderByTimeFrom:
            convertDateSendToDB(dString).slice(0, 11) + time[0] + ".000Z",
          OrderByTimeTo:
            convertDateSendToDB(dString).slice(0, 11) + time[1] + ".000Z",
        })
      );
      // dispatch({
      //   type: SET_FILTER_SERVICE,
      //   payload: {
      //     ...filterService,
      //     OrderByTime: 0,
      //     OrderByTimeFrom:
      //       convertDateSendToDB(dString).slice(0, 11) + time[0] + ".000Z",
      //     OrderByTimeTo:
      //       convertDateSendToDB(dString).slice(0, 11) + time[1] + ".000Z",
      //   },
      // });
    }
  };
  const handleOnchangeHour = (t, timeString) => {
    setTime(timeString);

    if (date !== "") {
      // dispatch({
      //   type: SET_FILTER_SERVICE,
      //   payload: {
      //     ...filterService,
      //     OrderByTime: 0,
      //     OrderByTimeFrom:
      //       convertDateSendToDB(date).slice(0, 11) + timeString[0] + ":00.000Z",
      //     OrderByTimeTo:
      //       convertDateSendToDB(date).slice(0, 11) + timeString[1] + ":00.000Z",
      //   },
      // });
      dispatch(
        setFilterStudioService(5, 1, {
          ...filterService,
          OrderByTime: 0,
          OrderByTimeFrom:
            convertDateSendToDB(date).slice(0, 11) + timeString[0] + ":00.000Z",
          OrderByTimeTo:
            convertDateSendToDB(date).slice(0, 11) + timeString[1] + ":00.000Z",
        })
      );
    }
  };
  const handleOnchangeDateRange = (ds, datesString) => {
    // setDates(datesString);
    // dispatch({
    //   type: SET_FILTER_SERVICE,
    //   payload: {
    //     ...filterService,
    //     OrderByTime: 1,
    //     OrderByDateFrom: convertDateSendToDB(datesString[0]),
    //     OrderByDateTo: convertDateSendToDB(datesString[1]),
    //   },
    // });
    dispatch(
      setFilterStudioService(5, 1, {
        ...filterService,
        OrderByTime: 1,
        OrderByDateFrom: convertDateSendToDB(datesString[0]),
        OrderByDateTo: convertDateSendToDB(datesString[1]),
      })
    );
  };

  switch (Number(filterService.OrderByTime)) {
    case 0:
      return (
        <div className="timeContainer">
          <Form.Item
            name="date"
            label="Chọn ngày"
            style={{
              width: "100%",
              marginRight: "20px",
              marginBottom: "8px",
            }}
          >
            <DatePicker
              onChange={handleOnchangeDate}
              defaultValue={moment(
                filterService?.OrderByTimeFrom,
                "YYYY-MM-DD"
              )}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item
            name="time"
            label="Chọn giờ:"
            style={{
              width: "100%",
              marginRight: "20px",
              marginBottom: "10px",
            }}
          >
            <div className="" style={{ width: "200px" }}>
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={handleOnchangeHour}
                style={{ marginRight: "10px" }}
                defaultValue={[
                  moment(filterService.OrderByTimeFrom.slice(11, 16), "HH:mm"),
                  moment(filterService.OrderByTimeTo.slice(11, 16), "HH:mm"),
                ]}
                disabled={disabled}
                minuteStep={60}
              />
            </div>
          </Form.Item>
        </div>
      );
    case 1:
      return (
        <div>
          <Form.Item
            name="time"
            label="Chọn ngày"
            style={{ width: "100%", marginRight: "20px", marginBottom: "10px" }}
          >
            <DatePicker.RangePicker
              onChange={handleOnchangeDateRange}
              defaultValue={[
                moment(filterService?.OrderByDateFrom, "YYYY-MM-DD"),
                moment(filterService?.OrderByDateTo, "YYYY-MM-DD"),
              ]}
              disabled={disabled}
            />
          </Form.Item>
        </div>
      );
    default:
      return <div></div>;
  }
};

const SelectTimeOptionService = ({ disabled }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);
  const [selection, setSelection] = useState(filterService.OrderByTime);

  const dispatch = useDispatch();

  const handleOnChangeSelection = (e) => {
    setSelection(e.target.value);
    // dispatch({
    //   type: SET_FILTER_SERVICE,
    //   payload: { ...filterService, OrderByTime: e.target.value },
    // });
    dispatch(
      setFilterStudioService(5, 1, {
        ...filterService,
        OrderByTime: e.target.value,
      })
    );
  };

  return (
    <div className="selectTimeOptionServiceContainer mb-20">
      <Radio.Group
        name="radiogroup"
        onChange={handleOnChangeSelection}
        style={{ padding: "0 0 20px" }}
        value={selection}
        disabled={disabled}
      >
        <Space direction="vertical">
          <Radio value={0}>Đặt theo giờ</Radio>
          <Radio value={1}>Đặt theo ngày</Radio>
        </Space>
      </Radio.Group>
      <Option option={selection} disabled={disabled} />
    </div>
  );
};
export default SelectTimeOptionService;
