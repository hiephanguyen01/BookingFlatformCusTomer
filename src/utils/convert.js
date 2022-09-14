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
