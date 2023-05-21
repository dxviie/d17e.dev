import moment from "moment";

const DATE_FORMAT = "MMMM D YYYY";

export const formatDate = (date: string): string => {
  // specifying the locale makes sure we don't get hydration errors due to server/client locale mismatch
  const formatted = moment(date).locale("en").format(DATE_FORMAT);
  return formatted;
};
