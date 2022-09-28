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

export const convertDateSendToDB = (date) => {
  console.log(date);
  const convertDate = new Date(date);
  console.log(convertDate);
  const stringMoment = convertDate.toISOString();
  console.log(stringMoment.slice(11, 19));
  const thisMoment = new Date(`${stringMoment.slice(0, 23)}-07:00`);
  console.log(thisMoment);
  const modify = `${thisMoment.toISOString()}`;
  return modify;
};

export const convertTimeSendDB = (time) => {
  const splitTime = time.split(":");
  return `${
    parseInt(parseInt(splitTime[0]) - 7) > 9
      ? parseInt(splitTime[0]) - 7
      : `0${parseInt(splitTime[0]) - 7}`
  }:${splitTime[1]}`;
};
export const numberWithDot = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
