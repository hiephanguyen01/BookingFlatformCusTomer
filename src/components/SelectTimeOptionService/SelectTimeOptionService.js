import { DatePicker, Form, Radio, Slider, Space, TimePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterStudioService } from "../../stores/actions/studioPostAction";
import { SET_FILTER_SERVICE } from "../../stores/types/studioPostType";
import { convertDateSendToDB } from "../../utils/convert";

import "./selectTimeOptionService.scss";
const format = "DD.MM.YYYY HH:mm";

function dateRange(startDate, endDate, steps = 1) {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(moment(currentDate).format("l"));
    // Use UTC date to prevent problems with time zones and DST
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
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
const Option = ({ option, disabled, service }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);
  const dispatch = useDispatch();
  const [date, setDate] = useState(convertDateSendToDB(new Date()));
  const [data, setData] = useState(service);
  const [disableHour, setDisableHour] = useState([]);
  const [time, setTime] = useState([]);

  function firstAndLast(array) {
    const firstItem = array[0];
    const lastItem = array[array.length - 1];

    const objOutput = [firstItem, lastItem];

    return objOutput;
  }
  const handleOnchangeDate = (d, dString) => {
    setDate(dString);
    if (dString && filterService.OrderByTime === 0) {
      let hl = service?.Bookings?.filter((item) => {
        const dates = dateRange(
          moment(item.OrderByTimeFrom).format("l"),
          moment(item.OrderByTimeTo).format("l")
        );
        return dates.includes(moment(dString).format("l"));
      });
      setDisableHour(hl);
    }
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
      dispatch(
        setFilterStudioService(5, 1, {
          ...filterService,
          OrderByTime: 1,
          OrderByTimeFrom:
            convertDateSendToDB(date).slice(0, 11) + timeString[0] + ":00.000Z",
          OrderByTimeTo:
            convertDateSendToDB(date).slice(0, 11) + timeString[1] + ":00.000Z",
        })
      );
    }
  };
  const handleOnchangeDateRange = (ds, datesString) => {
    dispatch(
      setFilterStudioService(5, 1, {
        ...filterService,
        OrderByTime: 0,
        OrderByDateFrom:
          moment(datesString[0]).toISOString().slice(0, 11) + "00:00:00.000Z",
        OrderByDateTo:
          moment(datesString[1]).toISOString().slice(0, 11) + "00:00:00.000Z",
      })
    );
  };
  const disabledDates = [
    {
      start: moment("19.10.20222 13:00", format),
      end: moment("19.10.2022 15:00", format),
    },
    {
      start: moment("21.10.20222 13:00", format),
      end: moment("27.10.2022 15:00", format),
    },
  ];

  function uniqueInOrder(x) {
    return (Array.isArray(x) ? x : x.split("")).filter(
      (c, i) => c !== x[i + 1]
    );
  }

  function remove_duplicates_es6(arr) {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
  }
  const getDisabledHours = (date, type) => {
    let array = [];
    if (disableHour?.length > 0) {
      array = disableHour?.reduce((acc, item) => {
        let dates = dateRangeHour(
          moment(item.OrderByTimeFrom).format(),
          moment(item.OrderByTimeTo).format()
        );
        acc.push(...dates.slice(0, -1));
        return remove_duplicates_es6(acc);
      }, []);
    }
    return array;
  };
  switch (Number(filterService.OrderByTime)) {
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
              onChange={handleOnchangeDate}
              status={"error"}
              // defaultValue={moment(
              //   filterService?.OrderByTimeFrom,
              //   "YYYY-MM-DD"
              // )}
              inputReadOnly={true}
              disabled={disabled}
              disabledDate={(current) => {
                return (
                  service?.Bookings?.filter((item) => !item.OrderByTime)
                    .reduce((acc, item) => {
                      let dates2 = dateRange(
                        moment(item.OrderByDateFrom).format("l"),
                        moment(item.OrderByDateTo).format("l")
                      );
                      acc.push(...dates2);
                      return uniqueInOrder(acc);
                    }, [])
                    .some((date) =>
                      moment(moment(current).format("l")).isSame(moment(date))
                    ) ||
                  (current && current <= moment().subtract(1, "days"))
                );
              }}
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
                // defaultValue={[
                //   moment(filterService.OrderByTimeFrom.slice(11, 16), "HH"),
                //   moment(filterService.OrderByTimeTo.slice(11, 16), "HH"),
                // ]}
                inputReadOnly={true}
                disabledTime={(date, type) => ({
                  disabledHours: () => getDisabledHours(date, type) || [],
                })}
                disabled={disabled}
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
          >
            <DatePicker.RangePicker
              onChange={handleOnchangeDateRange}
              // defaultValue={[
              //   moment(filterService?.OrderByDateFrom, "YYYY-MM-DD"),
              //   moment(filterService?.OrderByDateTo, "YYYY-MM-DD"),
              // ]}
              disabled={disabled}
              inputReadOnly={true}
              disabledDate={(current) => {
                return (
                  service?.Bookings?.reduce((acc, item) => {
                    let dates = dateRange(
                      moment(item.OrderByTimeFrom).format("l"),
                      moment(item.OrderByTimeTo).format("l")
                    );
                    let dates2 = dateRange(
                      moment(item.OrderByDateFrom).format("l"),
                      moment(item.OrderByDateTo).format("l")
                    );
                    acc.push(...dates, ...dates2);
                    return uniqueInOrder(acc);
                  }, []).some((date) =>
                    moment(moment(current).format("l")).isSame(moment(date))
                  ) ||
                  (current && current <= moment().subtract(1, "days"))
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

const SelectTimeOptionService = ({ disabled, service }) => {
  const [data, setData] = useState(service);
  const { filterService } = useSelector((state) => state.studioPostReducer);
  // const [selection, setSelection] = useState(filterService.OrderByTime);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(service);
  }, [service]);

  const handleOnChangeSelection = (e) => {
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
        value={filterService.OrderByTime}
        disabled={disabled}
      >
        <Space direction="vertical">
          <Radio value={1}>Đặt theo giờ</Radio>
          <Radio value={0}>Đặt theo ngày</Radio>
        </Space>
      </Radio.Group>
      <Option service={data} disabled={disabled} />
    </div>
  );
};
export default SelectTimeOptionService;
