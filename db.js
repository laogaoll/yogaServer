// 数据库连接配置
//db.js——用来添加 mysql 配置
//根据mysql的IP，端口，用户名，密码，数据库名称自行修改
var mysql = require('mysql');
//创建连接池
var conn = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'Yoga',
    password:'111111',
    database:'yoga',
    useConnectionPooling:true,//使用连接池
    connectionLimit:20,//最大连接数
    charset:'utf8',//数据库服务器的编码方式
});
module.exports = conn;
/*module.exports = {
    mysql: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'yoga',
    port: '3306'
    }
}*/
    
