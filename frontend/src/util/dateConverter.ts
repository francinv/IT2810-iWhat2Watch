export function convertDateToUnixDate(date: Date) {
  return Math.round(date.getTime() / 1000);
}

export function convertUnixDateToDate(unixNumber: number) {
  const date = new Date(unixNumber * 1000);
  //console.log(date.getFullYear());
  return date;
}

export function formatDateAsString(date: Date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return year + "-" + month + "-" + day;
}
