// 测试用API示例


var models = require('../conn');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

//连接数据库


var conn = mysql.createConnection(models.mysql);
conn.connect();

var jsonWrite = function (res,ret){
    if (typeof ret === 'undefined'){
        res.json({
            code:'1',msg:'操作失败'
        });
    }
    else {
        res.json(
            ret
        );
    }
}
// router.post('/login', (req, res) => {
//     var sql = $sql.user.add;
//     var params = req.body;
//     console.log(params);
//     conn.query(sql, [params.username, params.password], function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         if (result) {
//             jsonWrite(res, result);
//         }
//     })
// });


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


module.exports = router;