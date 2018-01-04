let fs = require("fs");
let path = require("path");
// console.log(__dirname);
let oldDirPath = path.join(__dirname, "oldTest");
// let newDirPath = "newTest";
let newDirPath = path.join(__dirname, "newTest");
// console.log(oldDirPath);

function cpdir(oldDirPath, newDirPath) {
  fs.copyFile(oldDirPath, newDirPath, err => {
    if (err) {
      err();
    }
    // else {
    //   newDirPath = path.join(oldDirPath, item);
    // }
  });
  fs.readdir(oldDirPath, (err, files) => {
    if (err) {
      err(err);
    }else {
      files.forEach(item => {
        judge(item);
      });
    }
  });

}

function judge(item) {
  let oldDirPath2 = path.join(oldDirPath, item);
  fs.stat("oldDirPath2", (err, stats) => {
    if (err) {
      err(err);
    }else {
      if (stats.isFile()) {//是文件直接copy
        fs.copyFile(oldDirPath2, newDirPath, err => {
          if (err) {
            err();
          }
        })
      }else {//是文件夹 继续 递归
        let newDirPath2 = path.join(newDirPath, item);
        cpdir(oldDirPath2,newDirPath2);
      }
    }
  });
}

function err(err) {
  console.log(err);
}
