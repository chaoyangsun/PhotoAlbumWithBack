//测试

// var b = "a";
//   eval("var " + b + "=new Array()");
//   eval(b + ".push(12)");//神一般的方法
//   // a.push(12);
//   console.log(a);

// let i = 1;
// let newImg = new Image();
// newImg.setAttribute("class", `aa`);
// newImg.setAttribute("src", `/img/${i}.png`);
// document.appendChild(newImg);

// Array.prototype.removeByValue = function(val) {
//   for(var i=0; i<this.length; i++) {
//     if(this[i] == val) {
//       this.splice(i, 1);
//       break;
//     }
//   }
// }
// var somearray = ["mon", "tue", "wed", "thur"]
// somearray.removeByValue("tue");

var a = [1,2,3];
console.log(a.slice(1));// 从索引1开始截取。
console.log(a.slice(1,2));// 从索引1可以截取到索引2之间的值
console.log(a.slice(0,2));// 从索引0开始截取到索引2之间的值
console.log(a.slice(-1));//从末尾-1索引截取一个值
console.log(a.slice(0,-1));// 从索引0开始截取到末尾索引-1的值
console.log(a.slice(1,5));
console.log(a);
