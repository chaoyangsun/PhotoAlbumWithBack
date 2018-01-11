var router = require("express").Router();
var multer = require("multer");
var uplaod = multer({
  dest:"upload"
});
var middle = upload.array("mfiles", 8);
var arr = [];

router.get("/", function(req, res) {
res.render("picture",{list:arr});
});

// <img src="../img/xxxx" >
router.get("/img/:imgname",function (req,res) {
   // 图片文件数据的［读取流］
   const rs = fs.createReadStream("upload/"+req.params.imgname);
   rs.pipe(res);
});

router.post("/up",middle,function (req,res) {
   arr.send(req.files);
});


module.exports = router;
