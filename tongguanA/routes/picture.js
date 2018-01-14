var router = require("express").Router();
var multer = require("multer");
var fs = require("fs");
var upload = multer({
  dest:"upload"
});
var middle = upload.array("mfiles");
var arr = [];

//直接进入 加载图片
router.get("/", function (req, res) {
  console.log("getgetget");
  res.send(arr);
});

//将图片 返回
router.get("/img/:imgname", function(req, res) {
  //图文数据的 读取流
  let fr = fs.createReadStream("upload/" +   req.params.imgname);
  //用管道 讲读取流 连接到 响应流
  fr.pipe(res);
});

router.post("/uparr", middle, function(req, res) {
  // console.log(req.files);
  let arr2 = [];
  arr.push(req.files);
  arr2.push(req.files);
  res.send(arr2);
});

router.post("/createphotoalbum", function(req, res) {
  let {name, age} = req.body;
  let errors = "";
  if (!(name && name.length > 2)){
    errors = errors || {};
    errors.name = "name length must > 2"
  }
  if (!/^\d{1,2}$/.test(age)) {
    errors = errors || {};
    errors.age = "age must be s> 0 and < 99";
  }

  res.send(errors);
});

module.exports = router;
