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
conn.connect((err)=>{
    if(err) throw err;
    console.log('连接成功')
});

router.get('/login',(req,res) => {
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

router.post('/entry',(req,res)=>{
    let sqlStr = "insert into score(org,cusNum,type,amount,staff,buytime,score) values (?,?,?,?,?,?,?)";
    const params = req.body["params"];
    console.log(params)
    const org=params.org
    const cusNum=params.cusNum
    const type=params.type
    const buyTime = params.buyTime
    const amount=params.amount
    const staff = params.staff
    const score=params.score
    console.log(org)
    console.log(score)
    conn.query(sqlStr,[org,cusNum,type,amount,staff,buyTime,score],function(err,results){
        if(err) {
            return console.log("添加失败"+err.message)
        }
        res.send({
            status:200,
            msg:"修改数据成功"
        })
    })

    
})

router.get("/MsgTable",(req,res)=>{
    let data= []
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

    conn.query(sqlStr,(err,result)=>{
        if(result){
            console.log(homedir)
            for(var i = 0;i<result.length;i++){
                var arr = []
                var value = result[i]
                for(var j in value){
                    console.log(value[j])
                    arr.push(value[j]);
                }
                data.push(arr);
            }
        }
        console.log(data)
        var buffer = xlsx.build([
            {
                name:'sheet1',
                data:data
            }
        ]);
        let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();

        month = (month>9) ? month : ("0" + month);
        day = (day < 10) ? ("0" + day) : day;

        let today= year + "-" + month + "-" + day;
      
        fs.writeFileSync(homedir+'/Desktop/客户经理计分'+today+'.xlsx',buffer,{'flag':'w'})
        res.send(result)
    })

    
})

// router.get('/delete',(req,res)=>{
//     let 
// })
module.exports = router;