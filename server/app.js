//vue_server_000/app.js
//功能：服务器端程序
//1:下载四个模块
//  express			web服务器
//  mysql				mysql驱动
//  cors				处理跨域
//  express-session	会话session对象
//2:vue_server_000/进入命令行
//  npm i mysql express express-session cors
//3:加载四个第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require('body-parser');
const multer = require("multer");
const fs = require('fs'); // fs 可以用来添加上传文件的扩展名(重命名)
var uploadDir = './public/images/';
multer({ dest: uploadDir })
//4:配置数据库连接池:基本效率高保证
var pool = mysql.createPool({
   host: "127.0.0.1",
   user: "root",
   password: "123456",
   database: "traveler",
   port: 3306,
   connectionLimit: 20
})
//5:创建web服务器
var server = express();
//6:配置跨域  允许程序列表
//  http://127.0.0.1:8080
//  http://localhost:8080
server.use(cors({
   origin: ["http://127.0.0.1:8080", "http://localhost:8080", "http://localhost:8081"],
   credentials: true  //每次请求验证
}))
//7:配置session环境
server.use(session({
   secret: "128位安全字符串",
   resave: true,         //请求更新数据 
   saveUninitialized: true//保存初始数据
}));
//8:配置静态目录 pubic
//8.1:创建public
server.use(express.static("public"))
//9:启动监听端口  3000
server.listen(3000, () => {
   console.log("on 3000 port")
});
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//用户活动上传
server.post('/user/share/add', (req, res) => {
   // console.log(req.body.params)
   let arr = req.body.params.pic;
   // console.log(arr)
   // var path = './public/images/' + Math.random() * 10000 + Date.now() + '.jpg';
   var arr1 = [];
   for (var i = 0; i < arr.length; i++) {
      var dataBuffer = "";
      var path = './public/images/' + Math.random() * 10000 + Date.now() + '.jpg';
      dataBuffer = new Buffer(arr[i], 'base64');
      fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
         if (err) {
            console.log(err);
         } else {
            console.log('写入成功');
         }
      })
      var path1 = path.replace(/.\/public/, "");
      arr1.push(path1);
   }
   var pic = arr1.join("+")
   var sql1 = "INSERT INTO traveler_user_shareall(uid,uname,title,detail,pic,avatar) value(?,?,?,?,?,?)";
   var sql2 = "INSERT INTO traveler_user_share_detail(uid,uname,title,detail,pic,avatar,date) value(?,?,?,?,?,?,?)";
   var obj = req.body.params;
   pool.query(sql1, [obj.uid, obj.uname, obj.title, obj.detail, path1, obj.avatar], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
         console.log("插入成功")
      } else {
         console.log("失败")
      }
   })
   pool.query(sql2, [obj.uid, obj.uname, obj.title, obj.detail, pic, obj.avatar, "2019-11-11"], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "suc" })
      } else {
         res.send({ code: -1, msg: "def" })
      }
   })
}
)

//我的分享
server.get("/user/share", (req, res) => {
   var uid = req.query.uid;
   var sql = "select * from traveler_user_shareall where uid = ?";
   pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         res.send({ code: 1, msg: "查看成功", result });
      } else {
         res.send({ code: -1, msg: "没有分享的活动" })
      }
   })
})
//用户删除我的分享
server.get("/user/share/delete", (req, res) => {
   var id = req.query.id;
   var sql = "delete from traveler_user_shareall where id = ?";
   pool.query(sql, [id], (err, result) => {
      if (err) throw err;
      var sql2 = "delete from traveler_user_share_detail where id = ?";
      pool.query(sql2, [id], (err, result) => {
         if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "删除成功" });
         } else {
            res.send({ code: -1, msg: "删除失败" })
         }
      })
   })
})
//用户登录
server.get("/user/login", (req, res) => {
   var uname = req.query.uname;
   var upwd = req.query.upwd;
   var isuser = req.query.isuser;
   console.log(1 + ":" + uname + ":" + upwd);
   //2:创建sql语句
   var sql = "SELECT uid,uname,avatar,isuser FROM traveler_user WHERE uname = ? AND upwd = ? and isuser = ?";
   //3:执行sql语句
   pool.query(sql, [uname, upwd, isuser], (err, result) => {
      //err 严重错误，程序停止
      if (err) throw err;
      //4:判断执行是否成功
      if (result.length == 0) {
         res.send({ code: -1, msg: "用户名或密码有误" });
      } else {
         //4.1登录成功后将登录凭证id保存到session对象中,如果服务器重新启动，session对象会丢失
         //4.2获取当前登录用户id
         console.log(result)
         var uid = result[0].uid;
         //4.3将用户id保存到session对象
         var avatar = result[0].avatar
         var isuser = result[0].isuser
         console.log(uname)
         req.session.uid = uid;
         // console.log(req.session);
         res.send({ code: 1, msg: "login suc", uid, uname, avatar, isuser });//发送uid到浏览器
      }
   })
})
//用户修改头像
server.post('/user/updateicon', (req, res) => {
   var uid = req.body.params.uid;
   var picBase64 = req.body.params.picBase64
   var dataBuffer = "";
   var path = './public/images/' + Math.random() * 10000 + Date.now() + '.jpg';
   dataBuffer = new Buffer(picBase64, 'base64');
   fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
      if (err) {
         console.log(err);
      } else {
         console.log('写入成功');
      }
   })
   var path1 = path.replace(/.\/public/, "");
   var sql = "UPDATE traveler_user SET avatar = ? where uid = ?";
   pool.query(sql, [path1, uid], (err, result) => {
      if (result.affectedRows > 0) {
         res.send({ code: 1, path1 })
      } else {
         res.send({ code: -1 })
      }
   })
})
//用户修改用户密码
server.get('/user/updateupwd', (req, res) => {
   var uid = req.query.uid;
   var opwd = req.query.oldpwd;
   var upwd = req.query.newpwd;
   var sql = "select * from traveler_user where uid = ? and upwd = ?"
   var sql1 = "UPDATE traveler_user SET upwd = ? where uid = ?"
   console.log(req.query)
   pool.query(sql, [uid, opwd], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         pool.query(sql1, [upwd, uid], (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
               res.send({ code: 1 })
            }
         })
      } else {
         res.send({ code: -1 })
      }
   })
})
//用户修改用户名
server.get('/user/updateuname', (req, res) => {
   var uid = req.query.uid;
   var uname = req.query.uname
   var sql = "UPDATE traveler_user SET uname = ? where uid = ?"
   console.log(req.query)
   pool.query(sql, [uname, uid], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
         res.send({ code: 1 })
      } else {
         res.send({ code: -1 })
      }
   })
})


//用户注册
server.post('/user/register', (req, res) => {
   //1.1获取数据
   console.log(req.body)
   var uname = req.body.params.uname;
   var upwd = req.body.params.upwd;
   var phone = req.body.params.phone
   var num = Math.floor(Math.random() * 10 + 1)
   var avatar = `/${num}.jpg`
   var isuser = req.body.params.isuser
   var sql = 'INSERT INTO traveler_user(uid,uname,upwd,avatar,isuser,phone) value(null,?,?,?,?,?)'
   //1.3执行SQL语句 
   pool.query(sql, [uname, upwd, avatar, isuser, phone], (err, result) => {
      if (err) throw err;
      console.log(result);
      //插入成功
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: 'register suc' });
      } else {
         res.send({ code: -1, msg: '注册失败' })
      }
   })
});

//用户收藏的活动
server.get('/user/collect', (req, res) => {
   var uid = req.query.uid;
   var sql = "SELECT a.tid as atid,a.uid,b.tid as btid,a.aid,b.date1,b.pic,b.detail,b.avatar,b.merchant,b.title,b.price from traveler_user_order0 as a,traveler_active as b  WHERE a.tid = b.tid and a.uid= ?"
   pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         res.send({ code: 1, result })
      } else {
         res.send({ code: -1, result })
      }
   })
})
server.get('/user/collected', (req, res) => {
   var uid = req.query.uid;
   var tid = req.query.tid;
   var sql = "select * from traveler_user_order0 where uid = ? and tid = ?"
   pool.query(sql, [uid, tid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         res.send({ code: 1, msg: "已收藏" })
      } else {
         res.send({ code: -1, msg: "未收藏" })
      }
   })
})
//添加用户收藏的活动
server.get("/user/collect/add", (req, res) => {
   var tid = req.query.tid;
   var uid = req.query.uid
   var uname = req.query.uname
   var sql = 'INSERT INTO traveler_user_order0(tid,uid,uname) value(?,?,?)'
   pool.query(sql, [tid, uid, uname], (err, result) => {
      if (err) throw err;
      console.log(result)
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "收藏成功" })
      } else {
         res.send({ code: -1, msg: "收藏失败" })
      }
   })
})
//删除用户收藏的活动
server.get("/user/collect/delete", (req, res) => {
   var aid = req.query.aid;
   var sql = 'delete from traveler_user_order0 where aid = ?';
   pool.query(sql, [aid], (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "删除成功" });
      } else {
         res.send({ code: -1, msg: "删除失败" })
      }
   })
})
//用户参加的活动
server.get('/user/join', (req, res) => {
   var uid = req.query.uid;
   var sql = "SELECT a.tid as atid,a.uid,b.tid as btid,a.aid,b.date1,b.pic,b.detail,b.avatar,b.merchant,b.title,b.price from traveler_user_order1 as a,traveler_active as b  WHERE a.tid = b.tid and a.uid= ?"
   pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         res.send({ code: 1, result })
      } else {
         res.send({ code: -1, result })
      }
   })
})
//添加用户参加的活动
server.get("/user/join/add", (req, res) => {
   var tid = req.query.tid;
   var uname = req.query.uname;
   var uid = req.query.uid;
   var phone = req.query.phone
   console.log(req.query)
   var sql = 'INSERT INTO traveler_user_order1(tid,uname,uid,phone) value(?,?,?,?)'
   pool.query(sql, [tid, uname, uid, phone], (err, result) => {
      if (err) throw err;
      console.log(result)
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "报名成功" })
      } else {
         res.send({ code: -1, msg: "报名失败" })
      }
   })
})
//删除用户参加的活动
server.get("/user/join/delete", (req, res) => {
   var aid = req.query.aid;
   var sql = 'delete from traveler_user_order1 where aid = ?';
   pool.query(sql, [aid], (err, result) => {
      if (err) throw err;
      console.log(result);
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "删除成功" });
      } else {
         res.send({ code: -1, msg: "删除失败" })
      }
   })
})
//首页数据
// 1.轮播图数据
server.get("/index/carousel", (req, res) => {
   var sql = "select * from traveler_index_carousel";
   pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ code: 1, msg: "query suc", result })
   })
})
//所有用户分享的活动
// server.get("/index/share",(req,res)=>{
//    var sql = "select * from traveler_user_shareall";
//    pool.query(sql,(err,result)=>{
//       if(err)throw err;
//       res.send({code:1,msg:"query suc",result})
//    })
// })
//首页查看更多分享活动
server.get("/index/share/more", (req, res) => {
   var pno = req.query.pno;
   var ps = req.query.pageSize;
   if (!pno) { pno = 1 };
   if (!ps) { ps = 4 };
   var offset = (pno - 1) * ps;
   ps = parseInt(ps);
   var sql1 = "select * from traveler_user_shareall limit ?,?";
   pool.query(sql1, [offset, ps], (err, result) => {
      if (err) throw err;
      var data = result;
      var sql2 = "select count(id) as c from traveler_user_shareall";
      pool.query(sql2, (err, result) => {
         if (err) throw err;
         var pageCount = Math.ceil(result[0].c / ps);
         res.send(
            {
               code: 1,
               msg: "查询成功",
               rows: data,
               pageCount: pageCount
            })
      })
   })
})



//用户分享活动的详情
server.get("/index/share/detail", (req, res) => {
   var id = req.query.id
   console.log(id)
   var sql = "select * from traveler_user_share_detail where id = ?";
   pool.query(sql, [id], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         res.send({ code: 1, msg: "suc", result })
      } else {
         res.send({ code: -1, msg: "def" })
      }
   })
})
//活动页数据
server.get("/active", (req, res) => {
   var sql = "select * from traveler_active"
   pool.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send({ code: 1, msg: 'query suc', result })
   })
})
//活动页详情
server.get("/active/detail", (req, res) => {
   // console.log(req.query)
   var tid = req.query.tid;
   console.log(tid)
   var sql = "select * from traveler_active_detail where tid = ?"
   pool.query(sql, [tid], (err, result) => {
      if (err) throw err;
      res.send({ code: 1, msg: "suc", result })
   })
})

//商家发布活动
server.post('/active/merchant/publish', (req, res) => {
   // console.log(req.body.params)
   let arr = req.body.params.pic;
   // console.log(arr)
   // var path = './public/images/' + Math.random() * 10000 + Date.now() + '.jpg';
   var arr1 = [];
   for (var i = 0; i < arr.length; i++) {
      var dataBuffer = "";
      var path = './public/images/' + Math.random() * 10000 + Date.now() + '.jpg';
      dataBuffer = new Buffer(arr[i], 'base64');
      fs.writeFile(path, dataBuffer, function (err) {//用fs写入文件
         if (err) {
            console.log(err);
         } else {
            console.log('写入成功');
         }
      })
      var path1 = path.replace(/.\/public/, "");
      arr1.push(path1);
   }
   var pic = arr1.join("+")
   var sql1 = "INSERT INTO traveler_active_detail(title,detail,price,date1,date2,pic,merchant,avatar,uid) value(?,?,?,?,?,?,?,?,?)";
   var sql2 = "INSERT INTO traveler_active(title,detail,price,date1,pic,merchant,avatar,uid) value(?,?,?,?,?,?,?,?)";
   var obj = req.body.params;
   pool.query(sql1, [obj.title, obj.detail, obj.price, obj.date1, obj.date2, pic, obj.merchant, obj.avatar, obj.uid], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
         console.log("插入成功")
      } else {
         console.log("失败")
      }
   })
   pool.query(sql2, [obj.title, obj.detail, obj.price, obj.date1, path1, obj.merchant, obj.avatar, obj.uid], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "suc" })
      } else {
         res.send({ code: -1, msg: "def" })
      }
   })
}
)
//短信验证
//1.获取验证码
server.post('/getvcode', (req, res) => {
   //获取手机号码
   var tel = req.body.params;
   console.log(tel)
   const Core = require('@alicloud/pop-core');
   var client = new Core({
      accessKeyId: 'LTAI4FcqGEzSje32GndkdpfM',
      accessKeySecret: 'os5tyi98vjeAe6nrx5R8dcg3Ng6Fe4',
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25'
   });
   var code = '';
   for (var i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
   }
   var params = {
      "RegionId": "cn-hangzhou",
      "PhoneNumbers": `${tel}`,
      "SignName": "一拳一个嘤嘤怪",
      "TemplateCode": "SMS_177543263",
      "TemplateParam": `{'code': '${code}'}`
   }
   var requestOption = {
      method: 'POST'
   };
   client.request('SendSms', params, requestOption).then((result) => {
      console.log(JSON.stringify(result));
   }, (ex) => {
      console.log(ex);
   })
   var vcode = code;
   res.send({ code: 1, vcode: code })
})
//手机验证码登录
server.get('/phone/login', (req, res) => {
   var tel = req.query.tel
   var isuser = req.query.isuser;
   var sql = "select * from traveler_user where phone = ? and isuser = ?"
   pool.query(sql, [tel, isuser], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
         console.log(result);
         res.send({ code: 1, result })
      } else {
         res.send({ code: -1 })
      }
   })
})



// server.get('/test',(req, res)=>{
//    var uid = req.query.uid;
//    var sql = "SELECT a.tid as atid,a.uid,b.tid as btid,a.aid,b.date1,b.pic,b.detail,b.avatar,b.merchant,b.title,b.price from traveler_user_order0 as a,traveler_active as b  WHERE a.tid = b.tid and a.uid= ?"
//    pool.query(sql,[uid],(err,result)=>{
//       if(err) throw err;
//       if(result.length>0) {
//          res.send(result)
//       }
//    })
// })
 // var sql = "SELECT a.tid as atid,a.uid,b.tid as btid,a.aid,b.date1,b.pic,b.detail,b.avatar,b.merchant,b.title,b.price from traveler_user_order0 as a,traveler_active as b  WHERE a.tid = b.tid and a.uid=?";
         // pool.query(sql, (err, result) => {
         //    if (err) throw err;
         //    if (result.length > 0) {
         //       res.send({ result });
         //    } 
         // })