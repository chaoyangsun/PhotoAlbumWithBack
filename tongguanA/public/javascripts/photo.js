//一个分页显示的照片数量
let count = 6;
//当前页
let currentPage = 1;
//选中的页码dom
let preSelectPageBtnDom;
//当前点击的相册边栏
let currentSelectingLeftDom;
// 当前展示的相册内容
let currentContent;
//默认的相册
let defaultLeft = document.querySelector(".left > div:first-child");
currentSelectingLeftDom = defaultLeft;

//默认的相册内容
let defaultMain = document.querySelector(".main > div:last-of-type");

currentContent = defaultMain;

let adoms = document.querySelectorAll("nav > a");
let content = document.querySelector(".content");

let navPhoto = document.querySelector(".photo_album");
navPhoto.style.backgroundColor = "#ddd";
navPhoto.style.color = "#333";
let strBtn = `
<li><a href="#"></a></li>
`;

let str = `
<div class="img">
  <img src="../images/product.png" alt="" class="photo">
  <img src="../images/del.png" alt="" class="del_photo">
</div>
`;
// let imgIndex = 0;
// //初始化
// function init() {
//   for (var i = 1; i < 12; i++) {
//     if (currentContent.childElementCount == 0) {
//       console.log("111111111111");
//       setPage();
//     }
//
//     document.querySelector(".main > header+div ").insertAdjacentHTML("beforeEnd", str);
//     let divdom = document.querySelector(".main > header+div > div:last-of-type");
//     let del_photoDom = divdom.querySelector("img:last-child");
//     del_photoDom.setAttribute("class", "del_hid");
//     let newImg = divdom.querySelector("img:first-child");
//     newImg.setAttribute("class", `${++imgIndex}`);
//     newImg.setAttribute("src", `../images/${i}.png`);
//     addArr(divdom);
//   }
// }
// init();
//
//导航栏点击事件
adoms.forEach(item => {
  item.addEventListener("click", function() {
    clickNav(item);
  });
});

let preDom = navPhoto;

function clickNav(item) {
  if (preDom) {
    preDom.style.backgroundColor = "rgb(250,250,250)";
    preDom.style.color = "#3366FF";
  }
  preDom = item;
  item.style.backgroundColor = "#ddd";
  item.style.color = "#333";

  switch (item.className) {
    case "photo_album":
      content.style.display = "block"; //显示相册
      currentPage = 1;
      break;
    default:
      content.style.display = "none"; //点击其他 隐藏相册
      currentPage = 2;
  }
}

//获取当前分页的数据
function showSelectPageData(total) { // TODO:
  let start = (currentPage - 1) * count;
  let end = currentPage * count;
  console.log(start + " -- " + end);
  for (let i = 1; i <= total; i++) {
    let dom = currentContent.querySelector(`div:nth-of-type(${i})`);
    if (i > start & i <= end) {
      dom.setAttribute("class", "img_show");
    } else {
      dom.setAttribute("class", "img_hidden");
    }
  }
}

// 分页 动态处理 页码按钮
function goPage(total, p) {
  //处理 隐藏与显示
  let uldom = document.querySelector("footer > ul");
  if (total === 0) {
    uldom.setAttribute("class", "pagination_hid");
    return;
  } else {
    uldom.setAttribute("class", "pagination");
  }
  //
  //处理 按钮的删减
  let num = document.querySelector("footer > ul").childElementCount;
  if (num > p + 4) {
    for (var i = p + 2 + 1; i <= num - 2; i) {
      document.querySelector(`footer > ul > li:nth-child(${i})`).remove();
      num = document.querySelector("footer > ul").childElementCount;
    }
  }

  //处理 页码的增加与点击
  num = document.querySelector("footer > ul").childElementCount;
  for (let i = num - 4 + 1; i <= p; i++) {
    document.querySelector("footer > ul > li:nth-last-child(2)").insertAdjacentHTML("beforeBegin", strBtn);
    let dom = document.querySelector("footer > ul > li:nth-last-child(3) > a");
    dom.innerText = i;
    dom.addEventListener("click", function(e) {
      currentPage = dom.innerText;
      // console.log("currentPage", currentPage);
      clickPageBtn(currentPage);
    });
  }
  chooseNewPage();
}

//初始化 四个固定点击按钮的点击 与显示
function setPage() {
  let uldom = document.querySelector(".pagination_hid");
  if (uldom) {
    uldom.setAttribute("class", "pagination");
  } else {
    uldom = document.querySelector(".pagination");
  }
  preSelectPageBtnDom = document.querySelector(`.pagination > li:nth-child(${Number(currentPage) + 2}) > a`);
  for (var i = 1; i <= 4; i++) {
    let dom = document.querySelector(`.pagination > li:nth-child(${i}) > a`);
    dom.addEventListener("click", function(e) {
      let total = uldom.childElementCount;
      switch (dom.innerText) {
        case "首页":
          currentPage = 1;
          break;
        case "上一页":
          currentPage = (--currentPage > 1) ? currentPage : 1;
          break;
        case "下一页":
          currentPage = (++currentPage < total - 4) ? currentPage : total - 4;
          break;
        case "尾页":
          currentPage = total - 4;
          break;
        default:
          return;
      }
      clickPageBtn(currentPage);
    });
  }
}
setPage();
/**
页码点击
*/
function clickPageBtn(currentPage) {
  let index = Number(currentPage) + 2;
  console.log(index);
  let dom = document.querySelector(`.pagination > li:nth-child(${index}) > a`);
  console.log(dom);
  // document.querySelector("footer > ul > li:nth-last-child(3) > a");
  if (preSelectPageBtnDom) {
    preSelectPageBtnDom.setAttribute("class", "");
  }
  preSelectPageBtnDom = dom;
  dom.setAttribute("class", "active");

  let cName = currentSelectingLeftDom.className;
  fetch("/upfile/clickphotoalbum?className=" + cName + "&cPage=" + currentPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      res.json()
    )
    .then(pageobj => {
      if (pageobj) {
        showPhoto(pageobj);
      }
    })
}

//设置左边框的点击效果
let preBackItem;

function setBackground(item) {
  if (preBackItem) {
    preBackItem.style.backgroundColor = "#fff";
  }
  preBackItem = item;
  item.style.backgroundColor = "#eee";
}
setBackground(currentSelectingLeftDom);

//创建相册
let createPhoto = document.querySelector(".a-create");
let defaultItem = document.querySelector(".left > .defaultAll").outerHTML;
// let index = 0;
createPhoto.addEventListener("click", function() {
  var name = window.prompt("请输入相册名字", ""); // TODO:
  if (name) {
    name = setContent(name);
    let cName = "main" + new Date().getTime(); //作为新创建的相册的className
    fetch("/upfile/createphotoalbum", {
        method: "POST",
        body: JSON.stringify({
          name,
          cName
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res =>
        res.text()
      )
      .then(res => {
        if (res) {
          res = JSON.parse(res);
          createPhotoAlbum(res);
          currentSelectingLeftDom = document.querySelector(".left > div:last-of-type");
          clickLeft(currentSelectingLeftDom);
        }
      })
  }
});

function setContent(str) {
str = str.replace(/<\/?[^>]*>/g,'');          //去除HTML tag
str.value = str.replace(/[ | ]*\n/g,'\n');    //去除行尾空白
return str;
}

//页面刷新
function refresh() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "/upfile/")
  xhr.responseType = "json";
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4 && Object.keys(xhr.response).length !== 0) {
      // console.log(Object.keys(xhr.response).length);
      let total = xhr.response;
      // console.log(total);
      let className = currentSelectingLeftDom.className;
      setUrl(total[className].arrPhoto);
      Object.keys(xhr.response).forEach(obj => {
        if (obj != "defaultAll") {
          createPhotoAlbum(total[obj]);
        }
      });
      currentSelectingLeftDom = defaultLeft;
      currentContent = defaultMain.setAttribute("class", "defaultAll");
    }
  }
  xhr.send();
};
refresh();

//刷新数据时 创建页面左边栏相册目录 obj对应的相册对象
function createPhotoAlbum(obj) {
  document.querySelector(".left").insertAdjacentHTML("beforeEnd", defaultItem);
  //最新创建的相册边栏
  let divDom = document.querySelector(".left > div:last-of-type");
  divDom.setAttribute("class", obj.cName);
  // var defineStr = divDom.className;
  divDom.querySelector("span").innerHTML = obj.name;
  divDom.querySelector("img:first-child").setAttribute("class", "def");
  divDom.querySelector("img:last-of-type").setAttribute("class", "del");
  divDom.style.backgroundColor = "#fff";
  addPhotoAlumClickListener(divDom);
  delPhotoAlumListener(divDom);
}

//添加图片
let domInput = document.querySelector("#file");
domInput.addEventListener("change", function(e) {
  let formData = new FormData();
  formData.append("cName", currentSelectingLeftDom.className);
  let files = e.target.files;
  for (var file of files) {
    formData.append("mfiles", file);
  }
  upload(formData);
  domInput.value = "";
});

function upload(formdata) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/upfile/uparr/")
  xhr.responseType = "json";
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      let pageobj = xhr.response;
      currentPage = Math.ceil(pageobj.total / count);
      currentContent.innerHTML = "";
      setUrl(pageobj.arr);
      //处理分页
      goPage(pageobj.total, Math.ceil(pageobj.total / count));
    }
  }
  xhr.send(formdata);
}

function setUrl(files) {
  for (var file of files) {
    let url = "/upfile/img/" + file.filename;
    addImage(url, file.filename);
  }
}

function addImage(url, filename) {
  document.querySelector(".main > header+div ").insertAdjacentHTML("beforeEnd", str);
  let divdom = document.querySelector(".main > header+div > div:last-of-type");
  let newImg = divdom.querySelector("img:first-child");
  // newImg.setAttribute("class", `${++imgIndex}`);
  newImg.src = url;
  newImg.width = "150";
  newImg.height = "150";
  let del_photoDom = divdom.querySelector("img:last-child");
  del_photoDom.addEventListener("click", function(event) {
    event.stopPropagation();
    delPhoto(divdom, filename);
  });
}

function delPhoto(divdom, filename) {
  let cName = currentSelectingLeftDom.className;
  if (confirm("确认删除?")) {
    fetch("/upfile/delphoto?className=" + cName + "&cPage=" + currentPage + "&filename=" + filename, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res =>
        res.json()
      )
      .then(pageobj => {
        if (pageobj) {
          currentPage = pageobj.cPage;
          showPhoto(pageobj);
        }
      })
  }
}

//相册点击
function addPhotoAlumClickListener(dom) {
  dom.addEventListener("click", function() {
    clickLeft(dom);
  });
}

function clickLeft(dom) {
  currentPage = 1;
  let cName = dom.className;
  fetch("/upfile/clickphotoalbum?className=" + cName + "&cPage=" + currentPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res =>
      res.json()
    )
    .then(pageobj => {
      if (pageobj) {
        console.log("pageobj = " + pageobj.total + "--" + typeof pageobj.arr);
        //为相册对应的内容div设置class
        let cName = dom.className;
        document.querySelector(".main > div:last-of-type").setAttribute("class", cName);
        currentContent = document.querySelector(`.main > div.${cName}`);
        document.querySelector(".photo_title").innerText = dom.innerText;
        //当前点击的左边栏相册
        currentSelectingLeftDom = dom;
        setBackground(currentSelectingLeftDom);
        showPhoto(pageobj);
      }
    })
}
//默认相册的点击
clickLeft(defaultLeft);
addPhotoAlumClickListener(defaultLeft);

//相册删除
function delPhotoAlumListener(dom) {
  let cName = dom.className;
  dom.querySelector("img:last-of-type").addEventListener("click", function(event) {
    event.stopPropagation();
    if (confirm("确认删除?")) {
      fetch("/upfile/delphotoalbum?className=" + cName, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res);
            dom.remove();
            if (dom == currentSelectingLeftDom) {
              currentSelectingLeftDom = defaultLeft;
              clickLeft(currentSelectingLeftDom);
            }
          }
        })
    }
  });
}

//显示对应页码的照片照片
function showPhoto(pageobj) {
  currentContent.innerHTML = "";
  //处理分页
  goPage(pageobj.total, Math.ceil(pageobj.total / count));
  setUrl(pageobj.arr);
}

//选中新分页按钮
function chooseNewPage() {
  if (preSelectPageBtnDom) {
    preSelectPageBtnDom.setAttribute("class", "not");
  }
  // console.log(currentPage);
  let newdom = document.querySelector(`.pagination > li:nth-child(${Number(currentPage) + 2}) > a`);
  if (newdom) {
    preSelectPageBtnDom = newdom;
    newdom.setAttribute("class", "active");
  }
}
