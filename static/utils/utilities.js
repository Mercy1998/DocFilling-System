
export function formatDateTime(date) {
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1); // 月份是从0开始的
  var day = padZero(date.getDate());
  var hours = padZero(date.getHours());
  var minutes = padZero(date.getMinutes());
 // var seconds = padZero(date.getSeconds());

  return year + '年' + month + '月' + day + '日' + hours + '时' + minutes + '分' ;
}
