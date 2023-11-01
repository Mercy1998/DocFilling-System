
var models = require('../conn');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');


router.post('/entry',(res,req)=>{
    var sqlStr = "insert into score (org,cusNum,type,amount,staff,buytime,score) values ()"
    
})


module.exports = router;