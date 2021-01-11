var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  canvas2 = document.getElementById('canvas2'),
  ctx2 = canvas2.getContext('2d'),
  // full screen dimensions
  cw = $("#head").innerWidth(),
  ch = $("#head").innerHeight(),
  //charArr = ['0', '1', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  charArr = ['0', '1'],
  maxCharCount = 10,
  fallingCharArr = [],
  fontSize = 16,
  maxColums = cw / (fontSize);
  canvas.width = canvas2.width = cw;
  canvas.height = canvas2.height = ch;

$( window ).resize(function() {
  cw = $("#head").innerWidth();
  ch = $("#head").innerHeight();
  maxColums = cw / (fontSize);
  canvas.width = canvas2.width = cw;
  canvas.height = canvas2.height = ch;

});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.draw = function(ctx) {

  this.value = charArr[randomInt(0, charArr.length)].toUpperCase();
  if(this.y < 0) {
    this.speed = randomFloat(2, 8);
    this.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  }

  ctx2.fillStyle = "rgba(255,255,255,0.8)";
  ctx2.font = fontSize + "px san-serif";
  ctx2.fillText(this.value, this.x, this.y);

  ctx.fillStyle = this.color;
  ctx.font = fontSize + "px san-serif";
  ctx.fillText(this.value, this.x, this.y);



  this.y += this.speed;
  if (this.y > ch) {
    this.y = randomFloat(-100, 0);
    this.speed = randomFloat(2, 8);
  }
}

for (var i = 0; i < maxColums; i++) {
  fallingCharArr.push(new Point(i * fontSize, randomFloat(-500, 0)));
}


var update = function() {

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(0, 0, cw, ch);

  ctx2.clearRect(0, 0, cw, ch);

  var i = fallingCharArr.length;

  while (i--) {
    fallingCharArr[i].draw(ctx);
    var v = fallingCharArr[i];
  }

  requestAnimationFrame(update);
}

update();