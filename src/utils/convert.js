import Moment from "moment";

export const convertTime = (time) => {
  if (time !== null) {
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
  const convertDate = new Date(date);
  const stringMoment = convertDate.toISOString();
  const thisMoment = new Date(`${stringMoment.slice(0, 23)}-07:00`);
  const modify = `${thisMoment.toISOString()}`;
  return modify;
};

export const convertTimeSendDB = (time) => {
  const splitTime = time.split(":");
  console.log(splitTime);
  return `${
    parseInt(splitTime[0]).toString().length > 1
      ? parseInt(splitTime[0])
      : `0${parseInt(splitTime[0]) - 7}`
  }:${splitTime[1]}`;
};
