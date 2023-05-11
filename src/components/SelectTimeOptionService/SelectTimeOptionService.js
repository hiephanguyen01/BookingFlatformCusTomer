import { DatePicker, Form, Radio, Space, TimePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertDateSendToDB } from "../../utils/convert";
import { ADD_TIME_ORDER } from "../../stores/types/studioPostType";

import "./selectTimeOptionService.scss";
import { handlerSelectServiceAction } from "../../stores/actions/studioPostAction";
import { DELETE_CHOOSE_SERVICE } from "../../stores/types/OrderType";
import axios from "axios";
import { roomService } from "../../services/RoomService";

function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = moment(startDate);

  while (currentDate <= endDate) {
    dateArray.push(currentDate.format("DD-MM-YYYY"));
    currentDate.add(steps, "d");
  }

  return dateArray;
}
function range(start, end) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}
function dateRangeHour(startDate, endDate) {
  const dateArray = [];
  let currentDate = moment(startDate).format("HH:mm:ss").slice(0, 2);
  for (
    let i = Number(currentDate);
    i <= Number(moment(endDate).format("HH:mm:ss").slice(0, 2));
    i++
  ) {
    dateArray.push(i);
  }
  return dateArray;
}

function uniqueInOrder(x) {
  return (Array.isArray(x) ? x : x.split("")).filter((c, i) => c !== x[i + 1]);
}

function remove_duplicates_es6(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
const Option = ({ option, disabled, service }) => {
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { listTimeSelected, studioDetail, filterService } = useSelector(
    (state) => state.studioPostReducer
  );
  const dispatch = useDispatch();
  const [date, setDate] = useState(convertDateSendToDB(new Date()));
  const [disableHour, setDisableHour] = useState([]);
  const [disableDate, setDisableDate] = useState([]);
  const [filter, setFilter] = useState({});
  const [time, setTime] = useState([]);

  useEffect(() => {
    const listDate = service?.Bookings?.reduce((acc, item) => {
      let dates = dateRange(
        moment(item?.OrderByTimeFrom),
        moment(item?.OrderByTimeTo)
      );
      let dates2 = dateRange(
        moment(item?.OrderByDateFrom),
        moment(item?.OrderByDateTo)
      );
      acc.push(...dates, ...dates2);
      return uniqueInOrder(acc);
    }, []);
    setDisableDate(listDate);
  }, [service]);

  useEffect(() => {
    setFilter(listTimeSelected.find((item) => item.id === service.id));
  }, [listTimeSelected, service]);

  const handleOnchangeHour = async (t, timeString) => {
    if (date) {
      // const { data } = await axios(
      //   `http://localhost:3003/api/booking/scheduleAndPrice?from=${
      //     moment(date).toISOString()?.slice(0, 11) + "00:00:00.000Z"
      //   }&to=${
      //     moment(date).toISOString()?.slice(0, 11) + "00:00:00.000Z"
      //   }&roomId=${service.id}`
      // );
      let from = `${
        moment(date).toISOString()?.slice(0, 11) + "00:00:00.000Z"
      }`;
      let to = `${moment(date).toISOString()?.slice(0, 11) + "00:00:00.000Z"}`;
      const { data } = await roomService.getScheduleAndPrice(
        from,
        to,
        service.id
      );
      dispatch({
        type: "UPDATE_PRICE_SERVICE",
        payload: data,
      });
      console.log("toi oi dadyas32131");
      setTime(timeString);
      dispatch({
        type: ADD_TIME_ORDER,
        data: {
          id: service.id,
          OrderByTime: 1,
          OrderByTimeFrom:
            moment(date).toISOString().slice(0, 11) +
            timeString[0] +
            ":00.000Z",
          OrderByTimeTo:
            moment(date).toISOString().slice(0, 11) +
            timeString[1] +
            ":00.000Z",
          prices: data.prices,
        },
      });
      if (chooseServiceList.find((item) => item?.id === service?.id)) {
        console.log("toi oi dadyas");
        dispatch(
          handlerSelectServiceAction(service, {
            ...filterService,
            OrderByTimeFrom:
              moment(date).toISOString().slice(0, 11) +
              timeString[0] +
              ":00.000Z",
            OrderByTimeTo:
              moment(date).toISOString().slice(0, 11) +
              timeString[1] +
              ":00.000Z",
          })
        );
      }
    }
  };
  const handleOnchangeDateRange = async (ds, datesString) => {
    console.log("dsadsad", ds);

    if (ds) {
      // const { data } = await axios(
      //   `http://localhost:3003/api/booking/scheduleAndPrice?from=${
      //     moment(ds[0]).toISOString()?.slice(0, 11) + "00:00:00.000Z"
      //   }&to=${
      //     moment(ds[1]).toISOString()?.slice(0, 11) + "00:00:00.000Z"
      //   }&roomId=${service.id}`
      // );
      let from = `${
        moment(ds[0]).toISOString()?.slice(0, 11) + "00:00:00.000Z"
      }`;
      let to = `${moment(ds[1]).toISOString()?.slice(0, 11) + "00:00:00.000Z"}`;
      const { data } = await roomService.getScheduleAndPrice(
        from,
        to,
        service.id
      );
      console.log("prices", data.prices);
      dispatch({
        type: "UPDATE_PRICE_SERVICE",
        payload: data,
      });
      dispatch({
        type: ADD_TIME_ORDER,
        data: {
          id: service.id,
          OrderByTime: 0,
          OrderByDateFrom:
            moment(ds[0]).toISOString()?.slice(0, 11) + "00:00:00.000Z" || "",
          OrderByDateTo:
            moment(ds[1]).toISOString()?.slice(0, 11) + "00:00:00.000Z" || "",
          disableDate: disableDate || [],
          prices: data.prices,
        },
      });
      if (chooseServiceList.find((item) => item?.id === service?.id)) {
        dispatch(
          handlerSelectServiceAction(service, {
            ...filterService,
            OrderByDateFrom:
              moment(ds[0]).toISOString()?.slice(0, 11) + "00:00:00.000Z" || "",
            OrderByDateTo:
              moment(ds[1]).toISOString()?.slice(0, 11) + "00:00:00.000Z" || "",
          })
        );
      }
    }
  };

  switch (Number(option)) {
    case 1:
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
              onChange={(d, dString) => {
                dispatch({ type: DELETE_CHOOSE_SERVICE });
                if (time.length) {
                  dispatch({
                    type: ADD_TIME_ORDER,
                    data: {
                      id: service.id,
                      OrderByTime: 1,
                      OrderByTimeFrom:
                        moment(d).toISOString().slice(0, 11) +
                        time[0] +
                        ":00.000Z",
                      OrderByTimeTo:
                        moment(d).toISOString().slice(0, 11) +
                        time[1] +
                        ":00.000Z",
                    },
                  });
                }
                setDate(d);
                if (dString && option === 1) {
                  let hl = service?.Bookings?.filter((item) =>
                    item?.OrderByTimeFrom?.includes(
                      moment(d).format("YYYY-MM-DD")
                    )
                  );
                  let array = [];
                  if (studioDetail?.data?.MinutesOpenDefault > 0) {
                    array = range(0, studioDetail?.data?.HourOpenDefault);
                  } else {
                    array = range(0, studioDetail?.data?.HourOpenDefault - 1);
                  }
                  array = [
                    ...array,
                    ...range(studioDetail?.data?.HourCloseDefault + 1, 23),
                  ];
                  if (dString === moment(new Date()).format("DD-MM-YYYY")) {
                    array = [
                      ...array,
                      ...range(
                        studioDetail?.data?.HourOpenDefault,
                        moment().hours()
                      ),
                    ];
                  }

                  if (hl?.length > 0) {
                    array = hl?.reduce((acc, item) => {
                      acc = [...array];
                      let dates = dateRangeHour(
                        moment(item.OrderByTimeFrom).utc(),
                        moment(item.OrderByTimeTo).utc()
                      );
                      acc.push(...dates.slice(0, -1));
                      return remove_duplicates_es6(acc);
                    }, []);
                  }
                  dispatch({
                    type: ADD_TIME_ORDER,
                    data: {
                      id: service.id,
                      OrderByTime: 1,
                      disableTimeOrder: array,
                    },
                  });
                  setDisableHour(array);
                }
              }}
              status={"error"}
              allowClear={false}
              inputReadOnly={true}
              disabled={disabled}
              disabledDate={(current) => {
                return (
                  service?.Bookings?.filter((item) => !item.OrderByTime)
                    .reduce((acc, item) => {
                      let dates2 = dateRange(
                        moment(item.OrderByDateFrom),
                        moment(item.OrderByDateTo)
                      );
                      acc.push(...dates2);
                      return uniqueInOrder(acc);
                    }, [])
                    .some(
                      (date) => moment(current).format("DD-MM-YYYY") === date
                    ) ||
                  (current &&
                    moment(current).utc().toISOString() <=
                      moment().subtract(1, "days").toISOString())
                );
              }}
              format={"DD-MM-YYYY"}
              defaultValue={
                filter?.OrderByTimeFrom ? moment(filter?.OrderByTimeFrom) : ""
              }
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
            <div className="" style={{ width: "160px" }}>
              <TimePicker.RangePicker
                format="HH:mm"
                onChange={handleOnchangeHour}
                style={{ marginRight: "10px" }}
                defaultValue={[
                  filter?.OrderByTimeFrom
                    ? moment(filter?.OrderByTimeFrom).subtract(7, "h")
                    : "",
                  filter?.OrderByTimeTo
                    ? moment(filter?.OrderByTimeTo).subtract(7, "h")
                    : "",
                ]}
                inputReadOnly={true}
                // disabledTime={(date, type) => ({
                //   disabledHours: () => getDisabledHours(date, type),
                // })}
                disabledTime={(date, type) => ({
                  disabledHours: () => disableHour,
                })}
                disabled={
                  disabled
                    ? disabled
                    : listTimeSelected.find((item) => item.id === service.id)
                        ?.disableTimeOrder === undefined
                }
                minuteStep={60}
              />
            </div>
          </Form.Item>
        </div>
      );
    case 0:
      return (
        <div>
          <Form.Item
            name="time"
            label="Chọn ngày"
            style={{ width: "100%", marginRight: "20px", marginBottom: "10px" }}
            initialValue=""
          >
            <DatePicker.RangePicker
              onChange={handleOnchangeDateRange}
              defaultValue={[
                filter?.OrderByDateFrom ? moment(filter?.OrderByDateFrom) : "",
                filter?.OrderByDateTo ? moment(filter?.OrderByDateTo) : "",
              ]}
              format={"DD-MM-YYYY"}
              disabled={disabled}
              inputReadOnly={true}
              disabledDate={(current) => {
                return (
                  disableDate.some(
                    (date) => moment(current).format("DD-MM-YYYY") === date
                  ) ||
                  (current && current <= moment())
                );
              }}
            />
          </Form.Item>
        </div>
      );
    default:
      return <div></div>;
  }
};

const SelectTimeOptionService = ({ disabled, service, onClick }) => {
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);

  const [data, setData] = useState(service);
  const [selectTime, setSelectTime] = useState();
  const { listTimeSelected, filterService } = useSelector(
    (state) => state.studioPostReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setData(service);
    setSelectTime(listTimeSelected.find((item) => item.id === service.id));
  }, [service, listTimeSelected]);

  const handleOnChangeSelection = (e) => {
    dispatch({
      type: ADD_TIME_ORDER,
      data: {
        id: service.id,
        OrderByTime: e.target.value,
      },
    });
  };

  return (
    <div className="selectTimeOptionServiceContainer mb-20">
      <Radio.Group
        name="radiogroup"
        onChange={handleOnChangeSelection}
        style={{ padding: "0 0 20px" }}
        value={selectTime?.OrderByTime}
        disabled={
          disabled
            ? disabled
            : chooseServiceList.find((item) => item?.id === service?.id)
        }
      >
        <Space direction="vertical">
          <Radio value={1}>Đặt theo giờ</Radio>
          <Radio value={0}>Đặt theo ngày</Radio>
        </Space>
      </Radio.Group>
      <Option
        option={selectTime?.OrderByTime}
        service={data}
        disabled={disabled}
      />
    </div>
  );
};
export default SelectTimeOptionService;