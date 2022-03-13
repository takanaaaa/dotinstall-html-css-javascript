'use script'

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;

var blockRowCount = 6;
var blockColumnCount = 5;
var blockWidth = 75;
var blockHeight = 20;
var blockPadding = 10;
var blockOffsetTop = 30;
var blockOffsetLeft = 30;

var blocks = [];

for(var c = 0; c < blockColumnCount; c++) {
  blocks[c] = [];
  for(var r = 0; r < blockRowCount; r++) {
    blocks[c][r] = {x: 0, y: 0, status: 1};
  }
}

function collisionDetection() {
  for(var c = 0; c < blockColumnCount; c++) {
    for(var r = 0; r < blockRowCount; r++) {
      var b = blocks[c][r];

      if(b.status == 1) {
        if(x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight) {
          dy = -dy;
          b.status = 0;
          score++;

          if(score == blockRowCount * blockColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScores() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score:" + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives:" + lives, canvas.width - 65, 20);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBlocks() {
  for(var c = 0; c < blockColumnCount; c++) {
    for(var r = 0; r < blockRowCount; r++) {

      if(blocks[c][r].status == 1) {
        var blocksX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
        var blocksY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
        blocks[c][r].x = blocksX;
        blocks[c][r].y = blocksY;

        ctx.beginPath();
        ctx.rect(blocksX, blocksY, blockWidth, blockHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 棒状にならないようにクリアする
  drawBall();
  drawBlocks();
  drawPaddle();
  drawScores();
  drawLives();
  collisionDetection();

  if( y + dy < ballRadius) {
    dy = -dy;
  } else if(y + dy > canvas.height - ballRadius) {

    if(x > paddleX && x < paddleX + paddleWidth) {
      if(y = y - paddleHeight) {
        dy = -dy;
      }
    } else {
      lives--;

      if(!lives) {
        alert("Game Over");
        document.location.reload();
        clearInterval(interval);
      } else {
        // 中央から開始
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX - (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if(x + dx > canvas.width -ballRadius | x + dx < ballRadius) {
    dx = -dx;
  }

  if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// 押している時
function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

// 押してない時
function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

 var interval = setInterval(draw, 10);
