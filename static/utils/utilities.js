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
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':'+seconds;
}
// 拼接内容
export function mergeForm(data){
  console.log("formData"+data)
  let totalStr = ''
  for (let key in data) {
    console.log(data[key])
    totalStr += key+":"+data[key] + '|'
  }
  return totalStr
}
export function mergeTable(data){
  console.log("mergeTable"+data)

  let totalStr = ''
  for(let i=0;i<data.length;i++){
    console.log(data[i])
    let obj = data[i]
    for(let key in obj){
      console.log(obj[key])
      totalStr += obj[key] + '|'
    }
  }
  console.log("totalStrData"+totalStr)
  return totalStr
}
// 保存到数据库
export function save2DB(title,data,provider) {
  //拼接数据
  let totalStr = ''
  let dateNow = formatDateTime2(new Date())
  for (let key in data) {
    console.log(data[key])
    totalStr += key+":"+data[key] + '|'
  }
  console.log("totalStr"+totalStr)
  axios.post("http://localhost:3000/api/user/save", {
        params: {
          title: title,
          content: totalStr,
          date:dateNow,
          provider:provider
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


export function getFormContent(data,id,provider,title){
  const params = {
    id:id,
    provider:provider,
    title:title
  }
  axios.get('http://localhost:3000/api/user/getContent',{
    params
  }).then( (res)=> {
    console.log("data:" + res.data)
    let form={}
    let objStr = res.data
    console.log("objStr"+objStr)
    let arr1 = objStr.split('|')
    console.log(arr1)
    for (let i = 0; i < arr1.length - 1; i++) {
      let arr2 = arr1[i].split(':')
      console.log(arr2)
      let key = arr2[0]
      form[key] = arr2[1]

    }
    data = form
    console.log("this.cInspector_form" + JSON.stringify(data))
  })
}
