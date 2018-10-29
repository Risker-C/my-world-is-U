// JavaScript Document
  var object = new Array();
  nbfm = 60;
  var xm = 0;
  var ym = 9999;
  var nx = 0;
  var ny = 0;

  // 图片移动
  function movbulb() {
    with(this) {
      if (ec < 20) {
        if (Math.abs(x0 - xm) < 100 && Math.abs(y0 - ym) < 100) {
          xx = (xm - x0) / 8;
          yy = (ym - y0) / 8;
          ec++;
        }
      }
      xx *= 0.99;
      yy *= 0.99;
      x0 = Math.round(x0 + Math.cos(y0 / 15) * p) + xx;
      y0 += yy - v;
      if (y0 < -h * 2 || x0 < -w * 2 || x0 > nx + w * 2) {
        y0 = ny + N + h * 2;
        x0 = nx / 2 - 100 + Math.random() * 100;
        ec = 0;
      }
      obj.style.top = y0 - h;
      obj.style.left = x0 - w;
    }
  }
  // 获取一张图片
  function CObj(N, img, w, h) {
    this.obj = document.createElement("img");
    this.obj.src = img.src;
    this.obj.style.position = "fixed";
    this.obj.style.left = -1000;
    document.body.appendChild(this.obj);
    this.N = N;
    this.x0 = 0;
    this.y0 = -1000;
    this.v = 1 + Math.round((80 / h) * Math.random());
    this.p = 1 + Math.round((w / 8) * Math.random());
    this.xx = 0;
    this.yy = 0;
    this.ec = 0;
    this.w = w;
    this.h = h;
    this.movbulb = movbulb;
  }

  // 获取浏览器大小
  function resize() {
    nx = document.body.offsetWidth;
    ny = document.body.offsetHeight;
  }
  onresize = resize;
  
  // 监听鼠标移动事件
  document.onmousemove = function (e) {
    if (window.event) e = window.event;
    xm = document.body.scrollLeft + (e.x || e.clientX);
    ym = document.body.scrollTop + (e.y || e.clientY);
  }

  // 让出现在浏览器窗口的图片动起来
  function run() {
    for (i in object) object[i].movbulb();
    setTimeout(run, 16);
  }
  onload = function () {
    PIC = document.getElementById("bubbles").getElementsByTagName("img");
    resize();
    for (nbf = 0; nbf < nbfm; nbf++) {
      sf = PIC[nbf % PIC.length];
      object[nbf] = new CObj(nbf, sf, sf.width / 2, sf.height / 2);
    }
    run();
  }