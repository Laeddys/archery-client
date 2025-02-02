export const convertDateToWords = (date: string | string[]) => {
  const [year, month, day] = date.toString().split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[parseInt(month, 10) - 1];
  const formattedDay = parseInt(day, 10).toString();
  const formattedDate = `${formattedDay} ${monthName} ${year}`;
  return formattedDate;
};
