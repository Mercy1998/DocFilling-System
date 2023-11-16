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
router.get('/login', (req, res) => {
  var name = req.query.name;
  var pwd = req.query.pwd;
  console.log(name);
  var sqlStr = "select * from admins where name='" + name + "' and pwd='" + pwd + "'";
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

//录入
router.post('/entry', (req, res) => {
  let sqlStr = "insert into score(org,cusNum,type,amount,staff,buytime,score) values (?,?,?,?,?,?,?)";
  const params = req.body["params"];
  console.log(params)
  const org = params.org
  const cusNum = params.cusNum
  const type = params.type
  const buyTime = params.buyTime
  const amount = params.amount
  const staff = params.staff
  const score = params.score
  console.log(org)
  console.log(score)
  conn.query(sqlStr, [org, cusNum, type, amount, staff, buyTime, score], function (err, results) {
    if (err) {
      return console.log("添加失败" + err.message)
    }
    res.send({
      status: 200,
      msg: "修改数据成功"
    })
  })


})

//导出
router.get("/MsgTable", (req, res) => {
  let data = []
  let sqlStr = 'select * from score'
  data.push([
    '机构名称',
    '客户号',
    '业务种类',
    '金额或户数',
    '营销人员姓名',
    '购买时间',
    '中收',
  ])
  const os = require('os')
  const homedir = os.homedir()

  conn.query(sqlStr, (err, result) => {
    if (result) {
      console.log(homedir)
      for (var i = 0; i < result.length; i++) {
        var arr = []
        var value = result[i]
        for (var j in value) {
          console.log(value[j])
          arr.push(value[j]);
        }
        data.push(arr);
      }
    }
    console.log(data)
    var buffer = xlsx.build([
      {
        name: 'sheet1',
        data: data
      }
    ]);

    let date = new Date()
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = (month > 9) ? month : ("0" + month);
    day = (day < 10) ? ("0" + day) : day;

    let today = year + "-" + month + "-" + day;

    fs.writeFileSync(homedir + '/Desktop/客户经理计分' + today + '.xlsx', buffer, {'flag': 'w'})
    res.send(result)
  })


})


//查询
// TODO: 查询条件分类 and/or
router.get("/search", (req, res) => {
  let data = []
  let sqlStr = 'select * from score where org=? or cusNum=? or type LIKE ? or amount=? or staff=? or buyTime=?'
  const params = req.query;
  console.log("params" + params)
  const org = params.org
  const cusNum = params.cusNum
  var type = params.type
  const buyTime = params.buyTime
  const amount = params.amount
  const staff = params.staff

  conn.query(sqlStr, [org, cusNum, type, amount, staff, buyTime], function (err, results) {
      if (err) {
        return console.log("查询失败" + err.message)
      }
      if (results) {
        for (var i = 0; i < results.length; i++) {
          var arr = []
          var value = results[i]
          for (var j in value) {
            console.log(value[j])
            arr.push(value[j]);
          }
          data.push(arr);
        }
      }
      console.log(data)
      res.send(data)
    }
  )
})

// 动态获取数据库数据
// value1   业务分类1
router.get('/getValue1', function (req, res) {
  let type = []
  let sqlStr = 'select distinct value1 from production'
  conn.query(sqlStr, function (err, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        let arr = []
        arr.push("t" + i)
        arr.push(result[i].value1)
        type.push(arr)
      }
      console.log(type)
    }
    res.send(type)
  })


})

//value2   所有数据
router.get('/getValue2', function (req, res) {
  let types = []

  let sqlStr = "select * from production"
  conn.query(sqlStr, function (err, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        let arr = []
        let value = ""
        arr.push(result[i].id)
        arr.push(result[i].value1)
        arr.push(result[i].value2)
        arr.push(result[i].count)
        if (result[i].value2 === null) {
          value = result[i].value1
        } else {
          value = result[i].value1 + result[i].value2
        }
        arr.push(value)

        types.push(arr)
      }

    }
    res.send(types)
  })
})

router.get('/getOrgs', function (req, res) {
  let orgs = []
  let sqlStr = "select name from org"
  conn.query(sqlStr, function (err, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        orgs.push(result[i].name)
      }
      console.log(orgs)
      res.send(orgs)
    }
  })
})

// 删除业务
router.post('/deleteCount', function (req, res) {
  let sqlStr = "delete from score where type = ?"
  let params = req.body["params"]
  let type = params.value
  console.log(type)
  conn.query(sqlStr, [type], (err, result) => {
    if (err) {
      return console.log("删除失败!" + err.message)
    }
    res.send({
      message: "删除数据成功"
    })
  })

})

//获取机构列表
router.get('/getAllOrgs',function(req,res){
  let orgs = []
  let sqlStr = "select * from org"
  conn.query(sqlStr, function (err, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        let arr =[]
        arr.push(result[i].id)
        arr.push(result[i].name)
        orgs.push(arr)
      }
      console.log(orgs)
      res.send(orgs)
    }
  })
})

//添加机构
router.post('/addOrg',function(req,res){
  let sqlStr = "insert into org(name) values (?)"
  let params = res.body["params"]
  let name = params.orgName
  conn.query(sqlStr,[name],(err,result)=>{
    if(err){
      return console.log("添加机构失败！",err.message)
    }
    res.send({
      message:"添加成功！"
    })
  })
})

//修改机构
router.post('/updateOrg',function(req,res){

})

module.exports = router;
