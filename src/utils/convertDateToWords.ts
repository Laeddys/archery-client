export const convertDateToWords = (date: string) => {
  const [year, month, day] = date.split("-");

  const months = [
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

  const monthName = months[parseInt(month, 10) - 1];
  const formattedDay = parseInt(day, 10).toString();
  const formattedDate = `${formattedDay} ${monthName} ${year}`;
  return formattedDate;
};
