//api路由
//userApi.js —— 测试用 API 示例

var models = require('../db');
var express = require('express');
var router = express.Router();//创建一个路由容器
var mysql = require('mysql');
var $sql = require('../sqlMap').default;
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1', msg: '操作失败'
        });
    }
    else {
        res.json(
            ret
        );
    }
};
// 增加用户接口   创建模块化路由处理程序
router.post('/addCourse', (req, res) => {
    //var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query('insert into classes(c_id,c_name,time,place,nm_money,p_limit,duration) values (?,?,?,?,?,?,?)',
    [params.c_id, params.c_name,params.time,params.place,params.nm_money,params.p_limit,params.duration], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

router.post('/blacklist',(req,res)=>{
    var params = req.body;
    console.log(params);
    conn.query('insert into blacklist(u_id,u_name,c_id,time) values (?,?,?,?)',
    [params.u_id,params.u_name,params.c_id,params.time],function(err,result){
        if(err){
            console.log(err);
        }
        if(result){
            jsonWrite(res,result);
        }
    })
})
router.get('/blacklist',(req,res)=>{
    conn.query('select * from  blacklist',function(err,row){
        if(err){
             console.log(err)            
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});
router.get('/course',(req,res)=>{
    conn.query('select * from  classes',function(err,row){
        if(err){
             console.log(err)            
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});
router.get('/signup',(req,res)=>{
    conn.query('select * from  signup',function(err,row){
        if(err){
             console.log(err)            
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});
router.get('/users',(req,res)=>{
    conn.query('select * from  users',function(err,row){
        if(err){
             console.log(err)            
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});

module.exports = router;

