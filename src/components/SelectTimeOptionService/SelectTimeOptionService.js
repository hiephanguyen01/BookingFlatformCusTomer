import { DatePicker, Form, Radio, Space, TimePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterStudioService } from "../../stores/actions/studioPostAction";
import { SET_SERVICE_SELECT } from "../../stores/types/studioPostType";
import { convertDateSendToDB } from "../../utils/convert";
import { ADD_TIME_ORDER } from "../../stores/types/studioPostType";

import "./selectTimeOptionService.scss";

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

function uniqueInOrder(x) {
  return (Array.isArray(x) ? x : x.split("")).filter((c, i) => c !== x[i + 1]);
}

function remove_duplicates_es6(arr) {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
const Option = ({ option, disabled, service }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);
  const dispatch = useDispatch();
  const [date, setDate] = useState(convertDateSendToDB(new Date()));
  const [disableHour, setDisableHour] = useState([]);
  const [time, setTime] = useState([]);

  const handleOnchangeDate = (d, dString) => {
    console.log("dang chin", service.id);
    setDate(dString);
    // console.log("gio UTC", moment.utc(moment(date).utc()).format());
    if (dString && filterService.OrderByTime === 1) {
      let hl = service?.Bookings?.filter((item) => {
        const dates = dateRange(
          moment(item.OrderByTimeFrom).format("l"),
          moment(item.OrderByTimeTo).format("l")
        );
        return dates.includes(moment(dString).format("l"));
      });
      console.log("so gio da chon ", hl);
      setDisableHour(hl);
    }
    // if (time.length > 0) {
    //   dispatch(
    //     setFilterStudioService(5, 1, {
    //       ...filterService,
    //       OrderByTime: 1,
    //       OrderByTimeFrom:
    //         convertDateSendToDB(dString).slice(0, 11) + time[0] + ".000Z",
    //       OrderByTimeTo:
    //         convertDateSendToDB(dString).slice(0, 11) + time[1] + ".000Z",
    //     })
    //   );
    //   // dispatch({
    //   //   type: SET_FILTER_SERVICE,
    //   //   payload: {
    //   //     ...filterService,
    //   //     OrderByTime: 0,
    //   //     OrderByTimeFrom:
    //   //       convertDateSendToDB(dString).slice(0, 11) + time[0] + ".000Z",
    //   //     OrderByTimeTo:
    //   //       convertDateSendToDB(dString).slice(0, 11) + time[1] + ".000Z",
    //   //   },
    //   // });
    // }
  };
  const handleOnchangeHour = (t, timeString) => {
    setTime(timeString);
    if (date !== "") {
      dispatch({
        type: ADD_TIME_ORDER,
        data: {
          ...filterService,
          id: service.id,
          OrderByTime: 1,
          OrderByTimeFrom:
            convertDateSendToDB(date).slice(0, 11) + timeString[0] + ":00.000Z",
          OrderByTimeTo:
            convertDateSendToDB(date).slice(0, 11) + timeString[1] + ":00.000Z",
        },
      });
      // dispatch(
      //   setFilterStudioService(5, 1, {
      //     ...filterService,
      //     OrderByTime: 1,
      //     OrderByTimeFrom:
      //       convertDateSendToDB(date).slice(0, 11) + timeString[0] + ":00.000Z",
      //     OrderByTimeTo:
      //       convertDateSendToDB(date).slice(0, 11) + timeString[1] + ":00.000Z",
      //   })
      // );
    }
  };
  const handleOnchangeDateRange = (ds, datesString) => {
    dispatch({
      type: ADD_TIME_ORDER,
      data: {
        ...filterService,
        id: service.id,
        OrderByTime: 0,
        OrderByDateFrom:
          moment(datesString[0]).toISOString().slice(0, 11) + "00:00:00.000Z",
        OrderByDateTo:
          moment(datesString[1]).toISOString().slice(0, 11) + "00:00:00.000Z",
      },
    });
    // dispatch(
    //   setFilterStudioService(5, 1, {
    //     ...filterService,
    //     OrderByTime: 0,
    //     OrderByDateFrom:
    //       moment(datesString[0]).toISOString().slice(0, 11) + "00:00:00.000Z",
    //     OrderByDateTo:
    //       moment(datesString[1]).toISOString().slice(0, 11) + "00:00:00.000Z",
    //   })
    // );
  };

  function range(start, end) {
    const result = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }
  const getDisabledHours = (date1, type) => {
    console.log(date);
    console.log(
      "day today",
      moment(date).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")
    );
    console.log(
      moment(date).format("YYYY-MM-DD"),
      moment(Date.now()).format("YYYY-MM-DD")
    );
    let array = [];
    if (
      moment(date).format("YYYY-MM-DD") ==
      moment(new Date()).format("YYYY-MM-DD")
    ) {
      array = range(0, moment().hours());
      console.log("first", array);
    }

    if (disableHour?.length > 0) {
      array = disableHour?.reduce((acc, item) => {
        acc = array;
        let dates = dateRangeHour(
          moment(item.OrderByTimeFrom).format(),
          moment(item.OrderByTimeTo).format()
        );
        acc.push(...dates.slice(0, -1));
        return remove_duplicates_es6(acc);
      }, []);
    }
    console.log(array);
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
              // defaultValue={moment(filterService?.OrderByTimeFrom)}
              // format={"YYYY-MM-DD"}
              // format={"DD/MM/YYYY"}
              allowClear={false}
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
                //   moment(filterService?.OrderByTimeFrom),
                //   moment(filterService?.OrderByTimeTo),
                // ]}
                inputReadOnly={true}
                disabledTime={(date, type) => ({
                  disabledHours: () => getDisabledHours(date, type),
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
              // format={"DD/MM/YYYY"}
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

const SelectTimeOptionService = ({ disabled, service, onClick }) => {
  const [data, setData] = useState(service);
  const { filterService } = useSelector((state) => state.studioPostReducer);
  // const [selection, setSelection] = useState(filterService.OrderByTime);
  // const handlerServiceSelect = (data) => {
  //   console.log(data.id);
  //   // dispatch({ type: SET_SERVICE_SELECT, payload: data.id });
  // };
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
    <div
      // onClick={() => {
      //   dispatch({ type: SET_SERVICE_SELECT, payload: service.id });
      // }}
      className="selectTimeOptionServiceContainer mb-20"
    >
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
