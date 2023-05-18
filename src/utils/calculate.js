export const calDate = (dateFrom, dateTo) => {
  const dayFrom = parseInt(dateFrom?.slice(8, 10));
  const dayTo = parseInt(dateTo?.slice(8, 10));
  const monthFrom = parseInt(dateFrom?.slice(5, 7));
  const monthTo = parseInt(dateTo?.slice(5, 7));
  const yearFrom = parseInt(dateFrom?.slice(0, 4));
  const yearTo = parseInt(dateTo?.slice(0, 4));
  if (yearFrom === yearTo) {
    if (monthFrom === monthTo) {
      return dayTo - dayFrom + 1;
    } else {
      let amountDay = 0;
      for (let i = monthFrom; i < monthTo; i++) {
        if (i === monthFrom) {
          const getAmountDayFrom = new Date(yearFrom, i, 0).getDate();
          amountDay += getAmountDayFrom - dayFrom + 1;
        } else {
          const getAmountDayFrom = new Date(yearFrom, i, 0).getDate();
          amountDay += getAmountDayFrom;
        }
      }
      return amountDay + dayTo;
    }
  } else {
    let sumDay = 0;
    for (let i = yearFrom; i <= yearTo; i++) {
      if (i === yearFrom) {
        let amountDay = 0;
        for (let j = monthFrom; j <= 12; j++) {
          if (j === monthFrom) {
            const getAmountDayFrom = new Date(i, j, 0).getDate();
            amountDay += getAmountDayFrom - dayFrom + 1;
          } else {
            const getAmountDayFrom = new Date(i, j, 0).getDate();
            amountDay += getAmountDayFrom;
          }
        }
        sumDay += amountDay;
      } else if (i === yearTo) {
        let amountDay = 0;
        for (let j = 1; j <= monthTo; j++) {
          if (j === monthTo) {
            amountDay += dayTo;
          } else {
            const getAmountDayFrom = new Date(i, j, 0).getDate();
            amountDay += getAmountDayFrom;
          }
        }
        sumDay += amountDay;
      } else {
        let amountDay = 0;
        for (let j = 1; j <= 12; j++) {
          const getAmountDayFrom = new Date(i, j, 0).getDate();
          amountDay += getAmountDayFrom;
        }
        sumDay += amountDay;
      }
    }
    return sumDay;
  }
};

export const calTime = (timeFrom, timeTo) => {
  const hourTo = parseInt(timeTo?.slice(11, 13));
  const minusTo = parseInt(timeTo?.slice(14, 16));
  const hourFrom = parseInt(timeFrom?.slice(11, 13));
  const minusFrom = parseInt(timeFrom?.slice(14, 16));
  let sumMinus = 0;
  for (let i = hourFrom; i <= hourTo; i++) {
    if (i === hourFrom) {
      sumMinus += 60 - minusFrom;
    } else if (i === hourTo) {
      sumMinus += minusTo;
    } else {
      sumMinus += 60;
    }
  }
  return Math.round(sumMinus / 60);
};

export const calTimeMinus = (timeFrom, timeTo) => {
  const hourTo = parseInt(timeTo?.slice(11, 13));
  const minusTo = parseInt(timeTo?.slice(14, 16));
  const hourFrom = parseInt(timeFrom?.slice(11, 13));
  const minusFrom = parseInt(timeFrom?.slice(14, 16));
  let sumMinus = 0;
  for (let i = hourFrom; i <= hourTo; i++) {
    if (i === hourFrom) {
      sumMinus += 60 - minusFrom;
    } else if (i === hourTo) {
      sumMinus += minusTo;
    } else {
      sumMinus += 60;
    }
  }
  return sumMinus;
};

export const priceService = (arr = [], OrderByTime) => {
  if (arr.length < 1) return null;
  const areAllEqual = arr.every(
    (num) =>
      (OrderByTime ? num.PriceByHour : num.PriceByDate) ==
      (OrderByTime ? arr[0].PriceByHour : arr[0].PriceByDate)
  );

  if (areAllEqual) {
    return OrderByTime
      ? arr[0].PriceByHour.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }).replace("₫", "đ")
      : arr[0].PriceByDate.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        }).replace("₫", "đ");
  } else {
    const result = arr.reduce(
      (acc, curr) => {
        const id = OrderByTime ? curr.PriceByHour : curr.PriceByDate;
        if (id < acc.min) {
          acc.min = id;
        } else if (id > acc.max) {
          acc.max = id;
        }
        return acc;
      },
      {
        min: OrderByTime ? arr[0].PriceByHour : arr[0].PriceByDate,
        max: OrderByTime ? arr[0].PriceByHour : arr[0].PriceByDate,
      }
    );
    return `
      ${result?.min
        ?.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })
        .replace("₫", "đ")} - ${result?.max
      ?.toLocaleString("vi", {
        style: "currency",
        currency: "VND",
      })
      .replace("₫", "đ")}`;
  }
};
