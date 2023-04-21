import moment from "moment";

const DATE_FORMAT = "MMMM D YYYY";

export const formatDate = (date: string): string => {
  return moment(date).format(DATE_FORMAT);
};
