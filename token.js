const jwt = require('jsonwebtoken');
const secretKey='yoga_server'//秘匙

//生成token
const generateToken = (u_id,password)=>{
    let token = jwt.sign(
        {u_id,password},
        secretKey,
       {expiresIn:60 * 60}//令牌过期时间 一小时
    )
    return token;
}

// token鉴权
const verifyToken = (req,res,next) =>{
    if(req.headers.authorization){
      let token = req.headers.authorization.split(' ')[1];
      try{
        jwt.verify(token,secretKey);
        next();
      }catch(err){
        res.status(401).send("登录信息失效，请重新登录");
        return;
      }
    }else{
      res.status(401).send("登录信息失效，请重新登录");
    }
  }
  
  module.exports = {
    generateToken,
    verifyToken,
  }
/*  const jwt = require("jsonwebtoken");
const secret = "aaa"; // 私钥，用于加密时混淆

//jwt生成token
const token = jwt.sign(
  {
    name: 123,
  },
  secret,
  {
    expiresIn: 60, //秒到期时间
  }
);
console.log(token);
//解密token
jwt.verify(token, secret, function (err, decoded) {
  if (!err) {
    console.log(decoded.name); //会输出123，如果过了60秒，则有错误。
  }
});*/
