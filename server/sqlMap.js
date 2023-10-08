var sqlMap = {
    user:{
        add:'insert into admins(name,pwd) values (?,?)',
        check:'select * from admins where name=? and pwd=?'
    }
}

module.exports = sqlMap;