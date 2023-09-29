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
  /**Converts a price to a string with a decimal separator every 3 digits.

  * Args:
  *  price: A number representing the price.

  * Returns:
  *  A string representing the formatted price.
  */
  if (Number.isNaN(price)) {
    price = 0;
  }
  let format;
  if (!isNaN(price)) {
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

// export const convertTimeSendDB = (time) => moment(time).add(7, "hour");

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
export const addLinebreaks = (anyString = "") => {
  return anyString?.replaceAll("\n", "<br />\r\n");
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const convertTimeUTC = (datetime, date) => {
  if (date) {
    return Moment(datetime).subtract(7, "hours").format("DD-MM-YYYY  HH:mm A");
  }
  return Moment(datetime).subtract(7, "hours").format("DD-MM-YYYY");
};
