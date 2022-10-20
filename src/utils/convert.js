import Moment from "moment";
export const convertTime = (time) => {
  if (time) {
    const thisMoment = new Date(`${time.slice(0, 23)}-07:00`);
    const modify = thisMoment.toISOString();
    Moment.locale("en");
    const dateFormat = modify.slice(0, 23);
    const TimeFormat = Moment(dateFormat).format("DD/MM/YYYY  HH:mm");
    return TimeFormat;
  } else {
    const TimeFormat = "";
    return TimeFormat;
  }
};

export const convertPrice = (price) => {
  let format;
  if (price) {
    format = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return 0;
  }
  return format;
};

export const convertDateSendToDB = (date, prevDayFlag) => {
  //prevDayFlag là Boolean
  let convertDate = new Date(date);
  convertDate = prevDayFlag
    ? new Date(convertDate.setDate(convertDate.getDate() - 1))
    : convertDate;

  const stringMoment = convertDate.toISOString();
  const thisMoment = new Date(`${stringMoment.slice(0, 23)}-07:00`);
  const modify = `${thisMoment.toISOString()}`;
  return modify;
};

export const convertTimeSendDB = (time) => {
  const splitTime = time.split(":");
  // console.log(parseInt(splitTime[0]));
  if (parseInt(splitTime[0]) < 7) {
    return `${
      parseInt(24 + (parseInt(splitTime[0]) - 7)) > 9
        ? 24 + (parseInt(splitTime[0]) - 7)
        : `0${24 + (parseInt(splitTime[0]) - 7)}`
    }:${splitTime[1]}#1`; //#1 là để xác định coi là có phải trừ qua ngày hôm sau hay không đối với các trường hợp giờ nhỏ hơn 7h
  } else {
    return `${
      parseInt(parseInt(splitTime[0]) - 7) > 9
        ? parseInt(splitTime[0]) - 7
        : `0${parseInt(splitTime[0]) - 7}`
    }:${splitTime[1]}#0`;
  }
};
export const numberWithDot = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const numberSlice = (x) => {
  return x
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    .slice(0, -4);
};

export const timeStructure = (date) => {
  return (
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    " " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
};

export const dateStructure = (date) => {
  return (
    date?.getDate() + "/" + (date?.getMonth() + 1) + "/" + date?.getFullYear()
  );
};
