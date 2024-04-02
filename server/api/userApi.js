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


module.exports = router;
