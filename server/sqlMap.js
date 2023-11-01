var sqlMap = {
    user:{
        add:'insert into admins(name,pwd) values (?,?)',
        save:'insert into score(org,cusNum,type,amount,staff,buyTime,score,inTime) values(?,?,?,?,?,?,?,?)',
        check:'select * from admins where name=? and pwd=?'
    }
}

module.exports = sqlMap;