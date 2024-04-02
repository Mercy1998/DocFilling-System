function toDate(rawDate) {
  let date = new Date(data.buyTime);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = (month > 9) ? month : ("0" + month);
  day = (day < 10) ? ("0" + day) : day;

  date = year + "/" + month + "/" + day;
  return date;
}
