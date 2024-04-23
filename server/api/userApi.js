// 测试用API示例


const models = require('../conn');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const xlsx = require('node-xlsx');
const fs = require('fs');


//连接数据库

// 创建连接
var conn = mysql.createConnection(models.mysql);
// 获取连接
conn.connect((err) => {
  if (err) throw err;
  console.log('连接成功')
});


//登录数据
router.get('/Login', (req, res) => {
  const name = req.query.name;
  const pwd = req.query.pwd;
  const identity = req.query.identity
  console.log(name);
  console.log(pwd);
  console.log(identity)
  var sqlStr = "select * from users where username ='" + name + "' and password='" + pwd + "' and role='"+identity+"'";
  conn.query(sqlStr, (err, result) => {
    console.log(result)
    let state = {}
    if (result.length != 0) {
      state.state = 1;
      res.json(state);
      res.end()
    } else {
      state.state = 0;
      res.json(state);
      console.log(result)
    }
  });

});

// 保存数据
router.post('/save',(req,res)=>{
  let sqlStr = "insert into docs(title,content,isCheck,date,provider) values (?,?,?,?,?)";
  const params = req.body["params"];
  console.log(params)
  const title=params.title
  const content=params.content
  const date = params.date
  const provider = params.provider
  const isCheck="否"

  console.log(title)
  console.log(content)
  conn.query(sqlStr,[title,content,isCheck,date,provider],function(err,results){
    if(err) {
      return console.log("添加失败"+err.message)
    }
    res.send({
      status:200,
      msg:"修改数据成功"
    })
  })


})
//文书数量获取
router.get('/getCount',(req,res)=>{
  let count = []
  let sqlStr = "SELECT \n" +
      "SUM(CASE title WHEN '现场提取笔录' THEN 1 ELSE 0 END) AS s1,\n" +
      "SUM(CASE title WHEN '电子数据固定提取清单' THEN 1 ELSE 0 END) AS s2,\n" +
      "SUM(CASE title WHEN '网络提取笔录' THEN 1 ELSE 0 END) AS s3,\n" +
      "SUM(CASE title WHEN '扣押清单' THEN 1 ELSE 0 END) AS s4,\n" +
      "SUM(CASE title WHEN '电子数据检查笔录' THEN 1 ELSE 0 END) AS s5,\n" +
      "SUM(CASE title WHEN '远程勘验笔录' THEN 1 ELSE 0 END) AS s6,\n" +
      "SUM(CASE title WHEN '电子数据固定提取清单' THEN 1 ELSE 0 END) AS s7,\n" +
      "SUM(CASE title WHEN '侦察实验笔录' THEN 1 ELSE 0 END) AS s8,\n" +
      "SUM(CASE title WHEN '办案协作函' THEN 1 ELSE 0 END) AS s9,\n" +
      "SUM(CASE title WHEN '调取证据通知书' THEN 1 ELSE 0 END) AS s10,\n" +
      "SUM(CASE title WHEN '协助冻结/解除冻结电子数据通知书' THEN 1 ELSE 0 END) AS s11\n" +
      "FROM\n" +
      "docs;"
  conn.query(sqlStr, function (err, result) {
    if (result){
      console.log(result)
      for (let key in result[0]){
        count.push(result[0][key])
      }
      console.log(count)
    }
    res.send(count)
  })

})

//获得所有文书列表
router.get('/getSearchTable',(req,res)=>{
  let dataList = []
  const params = req.query;
  console.log("params" + params)
  const searchWord = params.content
  let sqlStr = "select * from docs where title= '"+searchWord+"'or content like '%"+searchWord+"%'";
  conn.query(sqlStr,[searchWord,searchWord],function (err,result){
    if (err) {
      return console.log("查询失败" + err.message)
    }
    if(result){
      console.log(result)
      for (let i =0;i<result.length;i++){
        let arr = []
        arr.push(result[i].title)
        arr.push(result[i].isCheck)
        arr.push(result[i].date)
        arr.push(result[i].provider)
        dataList.push(arr)
      }
      console.log(dataList)
    }
    res.send(dataList)
  })


})
// 获得已审批列表
router.get('/getChecked',(req,res)=>{
  let dataList = []
  const params = req.query;
  console.log("params" + params)
  let sqlStr ="select * from docs where isCheck='是'";
  conn.query(sqlStr,function (err,result){
    if (err) {
      return console.log("查询失败" + err.message)
    }
    if(result){
      console.log(result)
      for (let i =0;i<result.length;i++){
        let arr = []
        arr.push(result[i].title)
        arr.push(result[i].content)
        arr.push(result[i].isCheck)
        arr.push(result[i].date)
        arr.push(result[i].provider)
        dataList.push(arr)
      }
      console.log(dataList)
    }
    res.send(dataList)
  })
})

//获得未审批列表
router.get('/getNotChecked',(req,res)=>{
  let dataList = []
  const params = req.query;
  console.log("params" + params)
  let sqlStr ="select * from docs where isCheck='否'";
  conn.query(sqlStr,function (err,result){
    if (err) {
      return console.log("查询失败" + err.message)
    }
    if(result){
      console.log(result)
      for (let i =0;i<result.length;i++){
        let arr = []
        arr.push(result[i].title)
        arr.push(result[i].content)
        arr.push(result[i].isCheck)
        arr.push(result[i].date)
        arr.push(result[i].provider)
        dataList.push(arr)
      }
      console.log(dataList)
    }
    res.send(dataList)
  })
})
//修改审批状态
router.post('/changeChecked',(req,res)=>{
  //update

})
module.exports = router;
