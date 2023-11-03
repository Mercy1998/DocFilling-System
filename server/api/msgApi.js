
// const { Result } = require('element-ui');
// var models = require('../conn');
// var express = require('express');
// var router = express.Router();
// var mysql = require('mysql');


// // 创建连接
// var conn = mysql.createConnection(models.mysql);
// // 获取连接
// conn.connect((err)=>{
//     if(err) throw err;
//     console.log('连接成功')
// });

// var jsonWrite = function(res, ret) {
//     if(typeof ret === 'undefined') {
//       res.json({
//         code: '1',
//         msg: '操作失败'
//       });
//     } else {
//       res.json(ret);
//     }
//   };

// router.post('/entry',(req,res)=>{
//     let sqlStr = "insert into score (org,cusNum,type,amount,staff,buytime,score) values (?,?,?,?,?,?,?)";
//     let params = req.body;
//     console.log(params)
    
//     conn.query(sqlStr,[params.org,params.cusNum,params.type,params.amount,params.staff,params.buyTime,params.score],function(err,results){
//         if(err) {
//             return console.log("添加失败"+err.message)
//         }
//         res.send({
//             status:200,
//             msg:"修改数据成功"
//         })
//     })

    
// })


// module.exports = router;