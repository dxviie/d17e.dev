import moment from "moment";

const DATE_FORMAT = "D YYYY";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date: string): string => {
  const myMoment = moment(date);
  return `{MONTHS[myMoment.month()]} ${myMoment.day()} ${myMoment.year()}`;
};
