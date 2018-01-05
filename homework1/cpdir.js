let fs = require("fs");
let path = require("path");
// console.log(__dirname);
let oldDirPath = path.join(__dirname, "oldTest");
// let newDirPath = "newTest";
let newDirPath = path.join(__dirname, "newTest");
// console.log(oldDirPath);

function cpdir(oldDirPath, newDirPath) {
  fs.mkdir(newDirPath, err => {
    if (err) {
      errFun(err);
    }
    // else {
    //   newDirPath = path.join(oldDirPath, item);
    // }
  });
  fs.readdir(oldDirPath, (err, files) => {
    if (err) {
      errFun(err);
    }else {
      files.forEach((item) => {
        judge(item);
      });
    }
  });

}
 cpdir(oldDirPath, newDirPath);

function judge(item) {
  let oldDirPath2 = path.join(oldDirPath, item);
  fs.stat(oldDirPath2, (err, stats) => {
    if (err) {
      errFun(err);
    }else {
      if (stats.isFile()) {//是文件直接copy
          console.log("item ======= " + oldDirPath2);
          let newDirPath2 = path.join(newDirPath, item);
        fs.copyFile(oldDirPath2, newDirPath2, (err) => {
          if (err) {
            errFun();
          }
        });
      }else {//是文件夹 继续 递归
        let newDirPath3 = path.join(newDirPath, item);
        console.log("oldDirPath2-----" + newDirPath3);
        cpdir(oldDirPath2,newDirPath3);
      }
    }
  });
}

function errFun(err) {
  console.log(err);
}
