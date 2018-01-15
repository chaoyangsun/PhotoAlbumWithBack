var router = require("express").Router();
var multer = require("multer");
var fs = require("fs");
var upload = multer({
  dest:"upload"
});

var middle = upload.array("mfiles");
var arr = [];
var bigarr = [];
let defaultAll = [];
//大对象  存储所有的相册、照片
// var bigobj = {};
var bigobj = {defaultAll:{name:'全部',cName:"defaultAll",arrPhoto:defaultAll}};
//直接进入 加载图片
router.get("/", function (req, res) {
  // if (Object.keys(bigobj).length == 0) {
  //     res.send("");
  // }else {
  //     res.send(bigobj);
  // }
  console.log(bigobj);
  res.send(bigobj);
  // res.send(arr);
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
  let arrPhoto = [];
  let {name, cName} = req.body;
  bigobj[cName] = {name,cName,arrPhoto}
  // console.log(bigobj[cName]);
  // console.log(bigobj);
  res.send(bigobj[cName]);
});

router.get("/clickphotoalbum", function(req, res) {
  console.log(req.query.className);
  // let arrPhoto = [];
  // let {cName} = req.body;
  let cName = req.query.className;
  res.send(bigobj[cName]);
});

router.get("/delphotoalbum", function(req, res) {
  console.log(bigobj);
  let cName = req.query.className;
  delete bigobj[cName];
  console.log(bigobj);
  res.send();
});

module.exports = router;
