let isStart = false;
let hsl = 0;
let lastX = 0,
  lastY = 0;
window.addEventListener("mousedown", function () {
  isStart = true;
});
window.addEventListener("mouseup", function () {
  isStart = false;
});

/**
 * 创建画笔
 */
const canvas = document.getElementById("my-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

/**
 * 设置画笔粗20px
 */
ctx.lineWidth = 20;
/**
 * 创建平滑曲线
 */
ctx.lineJoin = "round";
ctx.lineCap = "round";
/**
 * 开始绘制
 */
function draw(x, y) {
  /**
   * 根据hsl设置画笔颜色
   */
  ctx.strokeStyle = `hsl(${hsl}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.quadraticCurveTo(lastX, lastY, x, y);
  ctx.stroke();
  /**
   * 如果hsl超出边界就重置为0
   */
  hsl = hsl >= 360 ? 0 : hsl + 1;
}
window.addEventListener("mousemove", function (e) {
  /**
   * 如果鼠标超出屏幕范围，就把#mouse设为隐藏
   */
  if (e.clientX < 0 || e.clientX > window.innerWidth || e.clientY < 0 || e.clientY > window.innerHeight) {
    document.querySelector("#mouse").style.display = "none";
  }else {
    document.querySelector("#mouse").style.display = "block";
  }
  lastX = this.document.querySelector("#mouse").style.left.replace("px", "");
  lastY = this.document.querySelector("#mouse").style.top.replace("px", "");
  this.document.querySelector("#mouse").style.left = e.clientX - 10 + "px";
  this.document.querySelector("#mouse").style.top = e.clientY - 10 + "px";
  if (isStart) {
    draw(e.clientX, e.clientY);
  }
});

/**
 * 设置快捷键ctrl+z
 */
document.onkeydown = function (e) {
  if (e.ctrlKey && e.keyCode == 90) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};
