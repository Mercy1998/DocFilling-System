import axios from 'axios';

// 时间处理
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
export function formatDateTime2(date) {
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }

  var year = date.getFullYear();
  var month = padZero(date.getMonth() + 1); // 月份是从0开始的
  var day = padZero(date.getDate());
  var hours = padZero(date.getHours());
  var minutes = padZero(date.getMinutes());
  var seconds = padZero(date.getSeconds());
  // var seconds = padZero(date.getSeconds());

  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes +':'+seconds  ;
}

// 保存到数据库
export function save2DB(title,data) {
  //拼接数据
  let totalStr = ''
  let dateNow = formatDateTime2(new Date())
  for (let key in data) {
    console.log(data[key])
    totalStr += data[key] + '|'
  }
  console.log("totalStr"+totalStr)
  axios.post("http://localhost:3000/api/user/save", {
        params: {
          title: title,
          content: totalStr,
          date:dateNow,
          provider:'Inspector1'
        }
      }
  ).then(function (res) {
    console.log("saveData:" + res)
    if (res.data.status == 200) {
      console.log(res.data.msg)
    }
  }).catch(function (err) {
    console.log(err)
  })
}
