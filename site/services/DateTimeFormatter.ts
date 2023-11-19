import moment from "moment";

const DATE_FORMAT = "MMMM D YYYY";

export const formatDate = (date: string): string => {
  // specifying the locale makes sure we don't get hydration errors due to server/client locale mismatch
  // specifying locale wasn't enough... instead this was wrapped in a custom hook that only renders the date ofter hydration
  return moment(date).locale("en").format(DATE_FORMAT);
};
