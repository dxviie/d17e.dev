import moment from "moment";

const DATE_FORMAT = "MMMM D YYYY";

export const formatDate = (date: string): string => {
  // specifying the locale makes sure we don't get hydration errors due to server/client locale mismatch
  return (
    moment(date)
      // @ts-ignore
      .locale("en", {
        months: [
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
        ],
        monthsShort: [
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
        ],
      })
      .format(DATE_FORMAT)
  );
};
