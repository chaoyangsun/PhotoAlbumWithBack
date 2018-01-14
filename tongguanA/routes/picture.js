var router = require("express").Router();
var multer = require("multer");
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
  let arr3 = new Array();
  arr.push(req.files);
  arr2.push(req.files);
  arr3.push(req.files);

  res.send(arr3);
});

module.exports = router;
