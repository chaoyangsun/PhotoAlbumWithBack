var express = require('express');
var router = express.Router();
var PW = require("png-word");
var pw = new PW();
var fs = require("fs");
var users = {}
var arr = [];
router.get("/", function (req, res) {
  req.session.firstnum = res.locals.firstnum = Math.round(Math.random()*10);
  req.session.secondnum = res.locals.secondnum = Math.round(Math.random()*10);

  res.locals.user = req.session.user || "";
  res.locals.msg = req.session.msg || "";
  req.session.msg  = "";

  res.locals.state = req.session.state || 0;
  req.session.state = 0;
  res.locals.list = arr;
  res.render("message");
})

router.post("/login", function(req, res) {
  let {loginname, password, inum} = req.body;
  console.log(inum);
  console.log(req.session.inum);
  if (users[loginname] && users[loginname].password == password && (req.session.firstnum + req.session.secondnum) == Number(inum)) {
    req.session.user = {loginname};
    console.log(req.session.user);
    req.session.msg = "";
  }else {
    req.session.msg = "登录失败";
  }
  res.redirect("back");
})

router.get("/logout", function(req, res) {
  console.log("2222222222222222222");
  req.session.msg = "";
  req.session.user = undefined;
  res.redirect("back");
})

router.post("/reg", function(req, res, next) {
  let {loginname, password, confirm, inum2} = req.body;

  if (loginname && password && password === confirm && req.session.inum2 == Number(inum2)) {
    // req.session.user = {loginname};
    users[loginname] = {loginname, password};
    console.log(users);
    console.log(users[loginname]);
    req.session.msg = "注册成功";
  }else {
    req.session.msg = "注册失败";
    req.session.state = 1;
  }
  res.redirect("back");
})

router.get("/imgnum2", function (req, res) {
    let num = Math.round((Math.random() + 1+Math.random()*10)*100);
    req.session.inum2 = num;
    console.log("inum2 "+req.session.inum2);
    pw.createReadStream(`${num}`).pipe(res);
})

router.post("/leave", function(req, res) {
  let {leavemsg} = req.body;
  if (req.session.user && req.session.user.loginname && leavemsg) {
    req.session.leavemsg = req.session.user.loginname + ": " + leavemsg;
    arr.push(req.session.leavemsg);
  }
  res.redirect("back");
})

// function adminUser(req, res, next) {
//   if (req.session.user) {
//     next();
//   }
//   else {
//     next(new Error("没有权限"));
//   }
// }

module.exports = router;
