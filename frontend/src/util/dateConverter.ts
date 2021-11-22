/* Converts date object to UNIX date format (seconds after 1970) */
export function convertDateToUnixDate(date: Date) {
  return Math.round(date.getTime() / 1000);
}

/* Converts UNIX date format to date object */
export function convertUnixDateToDate(unixNumber: number) {
  const date = new Date(unixNumber * 1000);
  return date;
}

/* Makes date object readable */
export function formatDateAsString(date: Date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "-" + month + "-" + day;
}
