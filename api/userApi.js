//api路由
//userApi.js —— 测试用 API 示例

//var models = require('../db');
var express = require('express');
var router = express.Router();
const {generateToken} = require('../token');
//var mysql = require('mysql');
// 连接数据库
//var conn = mysql.createConnection(models.mysql);
var conn = require('../db');
//conn.connect();
/*var jsonWrite = function (res, ret) {
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
};*/
// 增加用户接口
//登录
router.get('/login',(req,res)=>{
    let {u_id,password} = req.query;
    let sql =  `select * from users where u_id = ${u_id}`;
    conn.query(sql,function(err,row){
        if(err)res.json({status:-1,message:"登录失败",err});
        if(row[0].u_id == u_id && row[0].password == password){
            if(row[0].u_type == 1){
                res.json({status:1,message:"登录成功",data:row});
            }else if(row[0].u_type == 0){
                res.json({status:0,message:"登录成功",data:row});
            } 
        }
    })
})
/*router.get('/login',(req,res)=>{
    let {u_id,password} = req.query;
    let sql = `select * from users where u_id = ${u_id}`;
    conn.query(sql,function(err,row){
        if(err) res.json({status:-1,message:"登录失败",err});
        if(row[0].u_id == u_id && row[0].password == password){
            let token = generateToken(u_id,password);
            res.json({status:1,message:"登录成功",data:token});
            
        }else{
            res.json({status:-1,message:"用户名或者密码错误"});
        }
    })
})*/

router.get('/classes',(req,res)=>{
    conn.query('select * from  classes',function(err,row){
        return err? res.json({status:-1,message:"请求失败",err})
      :res.json({status:1,message:"请求成功",data:row});
    })
});
router.get('/getDayClass',(req,res)=>{
    let {Today} = req.query;
    let sql = `select * from classes where  date_format(time,'%Y-%m-%d') = "${Today}"`;
    conn.query(sql,function(err,row){
        return err? res.json({status:-1,message:"请求失败",err})
        :res.json({status:1,message:"请求成功",data:row});
    })
})
//课程详情页头部课程
router.get('/getClassById',(req,res)=>{
    let {c_id} = req.query;
    let sql = `select * from classes where c_id = ${c_id}`;
    conn.query(sql,function(err,row){
        return err? res.json({status:-1,message:"请求失败",err})
        :res.json({status:1,message:"请求成功",data:row});
    })
})
//主页显示预约课程人数
router.get('/getSignup',(req,res)=>{
    let sql = `select * from signup `;
    conn.query(sql,function(err,row){
        return err? res.json({status:-1,message:"请求失败",err})
      :res.json({status:1,message:"请求成功",data:row});
    })
})
//判断两次未上课
router.get('/getIsBlack',(request,response)=>{
    let {u_id} = request.query;
    let sql = `select * from blacklist where u_id =${u_id}`;
    conn.query(sql, function(err,res){
      return err? response.json({status:-1,message:"请求失败",err})
      :response.json({status:1,message:"请求成功",data:res.length>=2});
    })
  })
//详情页预约人员
router.get('/getSignupById',(req,res)=>{
    let {c_id} = req.query;
    let sql = `select * from signup where c_id = ${c_id}`;
    conn.query(sql,function(err,row){
        
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:row});
    })
})
//获取用户姓名
router.get('/getUname',(req,res)=>{
    let {u_id} = req.query;
    let sql = `select u_name from users where u_id = ${u_id}`;
    conn.query(sql,function(err,row){
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:row});
    })
})
//用户预约课程
router.post('/addSignup',(req,res)=>{
    let {id,c_id,c_name,u_id,u_name,appo_time} = req.body;
    let sql = `insert into signup(id,c_id,u_name,u_id,c_name,appo_time)values("${id}","${c_id}","${u_name}","${u_id}","${c_name}","${appo_time}") `;
    conn.query(sql,function(err,row){
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:row});
    })
})
//用户取消预约课程
router.delete('/signupDown',(req,res)=>{
    let {u_id ,c_id} = req.query;
    let sql = `delete from signup where c_id = ${c_id} and u_id = ${u_id}`;
    conn.query(sql,function(err,result){
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:result});
    })
})
//教师增加课程
router.post('/addCourse',(req,res)=>{
    let {c_id,c_name,time,place,nm_money,duration,p_limit} = req.body;
    let sql = `insert into classes(c_id,c_name,time,place,nm_money,duration,p_limit) values("${c_id}","${c_name}","${time}","${place}","${nm_money}","${duration}","${p_limit}")`;
    conn.query(sql,function(err,row){
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:row});
    })
})
//添加黑名单
router.post('/addBlacklist',(req,res)=>{
    let {u_id,u_name,c_id,time} = req.body;
    let sql = `insert into blacklist (u_id,u_name,c_id,time) values("${u_id}","${u_name}","${c_id}","${time}")`;
    conn.query(sql,function(err,row){
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:row});
    })
})
//是否在黑名单中
router.get('/getBlacklist',(req,res)=>{
    let {u_id,c_id} = req.query;
    let sql = `select * from blacklist where u_id = ${u_id} and c_id = ${c_id}`;
    conn.query(sql,function(err,row){
        return err?res.json({status:-1,message:'请求失败',err}):
        
        res.json({status:1,message:"请求成功",data:row.length>0});
    })
})
module.exports = router;

