let fs = require("fs");
let path = require("path");
// console.log(__dirname);
let oldPath = path.join(__dirname, "oldTest");
// let newDirPath = "newTest";
let newPath = path.join(__dirname, "newTest");
// console.log(oldDirPath);

function cpdir(oldDirPath, newDirPath) {
  fs.mkdir(newDirPath, err => {
    if (err) {
      errFun(err);
    }
  });
  fs.readdir(oldDirPath, (err, files) => {
    if (err) {
      errFun(err);
    } else {
      console.log(files);
      files.forEach((item) => {
        judge(item, oldDirPath, newDirPath);
      });
    }
  });

}
cpdir(oldPath, newPath);

function judge(item, oldDirPath, newDirPath) {
  let oldDirPath2 = path.join(oldDirPath, item);
  fs.stat(oldDirPath2, (err, stats) => {
    if (err) {
      errFun(err);
    } else {
      if (stats.isFile()) { //是文件直接copy
        let newDirPath2 = path.join(newDirPath, item);
        fs.copyFile(oldDirPath2, newDirPath2, (err) => {
          if (err) {
            errFun();
          }
        });
      } else { //是文件夹 继续 递归
        let newDirPath3 = path.join(newDirPath, item);
        cpdir(oldDirPath2, newDirPath3);
      }
    }
  });
}

function errFun(err) {
  console.log(err);
}
