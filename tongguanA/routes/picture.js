var router = require("express").Router();
var multer = require("multer");
var fs = require("fs");
var upload = multer({
  dest:"upload"
});

var middle = upload.array("mfiles");
let defaultAll = [];
//一个分页显示的照片数量
let count =6;

//大对象  存储所有的相册、照片
// var bigobj = {};
var bigobj = {defaultAll:{name:'全部',cName:"defaultAll",arrPhoto:defaultAll}};

//刷新
router.get("/", function (req, res) {
  // console.log(bigobj);
  res.send(bigobj);
});

//将图片 返回
router.get("/img/:imgname", function(req, res) {
  //图文数据的 读取流
  let fr = fs.createReadStream("upload/" +   req.params.imgname);
  //用管道 讲读取流 连接到 响应流
  fr.pipe(res);
});

//上传图片
router.post("/uparr", middle, function(req, res) {
  let cName = req.body.cName;
  let arr = [];
  // bigobj[cName].arrPhoto.push(req.files);
  req.files.forEach(s =>{
  bigobj[cName].arrPhoto.push(s);
  arr2.push(s);
  })

  let total = bigobj[cName].arrPhoto.length;
  let pageobj = {};
  // let arr = obj.arrPhoto.slice(start, end);
  pageobj = {total, arr};
  res.send(pageobj);
});

//创建相册
router.post("/createphotoalbum", function(req, res) {
  let arrPhoto = [];
  let {name, cName} = req.body;
  bigobj[cName] = {name,cName,arrPhoto}
  res.send(bigobj[cName]);
});

//点击
router.get("/clickphotoalbum", function(req, res) {
  // console.log(req.query.className);
  let cName = req.query.className;
  let currentPage = req.query.cPage;
  let obj = getSelectPageDada(bigobj[cName], currentPage);
  res.send(obj);
});

//删除相册
router.get("/delphotoalbum", function(req, res) {
  let cName = req.query.className;
  delete bigobj[cName];
  res.send();
});

  // 获取当前分页的数据 { total: 0, arr: [] }
function getSelectPageDada(obj, currentPage) {
  let total = obj.arrPhoto.length;
  let start = (currentPage - 1) * count;
  let end = currentPage * count;
  let pageobj = {};
  let arr = obj.arrPhoto.slice(start, end);
  pageobj = {total, arr};
  return pageobj;
}
module.exports = router;
