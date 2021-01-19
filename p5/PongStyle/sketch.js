var x_width = window.outerWidth - 15;
var y_height = window.outerHeight - 105;
var time = 120;
var left1 = 10;
var right1 = 55;
var left2 = y_height - 95;
var right2 = y_height - 50;
var border1 = left1;
var border2 = right2;
var ballX = x_width / 2;
var ballY = y_height / 2;
var ballW = 15;
var ballH = 15;
var pad1X = 10;
var pad2X = x_width - 20;
var padH = 10;
var padW = 45;
var padR = 20;
var pad1P = 0;
var pad2P = 0;
var ballGoingUp = true;
var ballGoingLeft = true;
var ballVel = 2;
var pad1Vel = 10;
var pad2Vel = pad1Vel;

setInterval("updateTime()", 1000);

function setup() {
  // put setup code here
  createCanvas(x_width, y_height);
}

function drawBall() {
  fill("white")
  noStroke();
  ellipse(ballX, ballY, ballW, ballH);
}

function drawPad1() {
  fill("blue");
  rect(pad1X, left1, padH, padW, padR);
}

function drawPad2() {
  fill("red");
  rect(pad2X, left2, padH, padW, padR);
}

function prueba() {
  fill("white")
  noStroke();
  ellipse(pad1X + 2 * padH - 2, left1, ballW, ballH);
  ellipse(pad1X + 2 * padH - 2, right1, ballW, ballH);
  ellipse(pad2X - padH, left2, ballW, ballH);
  ellipse(pad2X - padH, right2, ballW, ballH);
}

function draw() {
  // put drawing code here
  background(0);
  updateScore();
  prueba();
  updateBall();
  drawBall();
  drawPad1();
  drawPad2();
}


function keyPressed() {
  if (keyCode == UP_ARROW) {
    if (left2 - pad2Vel < border1) {
      left2 = border1;
      right2 = border1 + padW;
      return;
    }
    left2 -= pad2Vel;
    right2 -= pad2Vel;
  }
  else if (keyCode == DOWN_ARROW) {
    if (left2 + padW + pad2Vel > border2) {
      left2 = border2 - padW;
      right2 = border2;
      return;
    }
    left2 += pad2Vel;
    right2 += pad2Vel;
  }
  if (key == "w" || key == "W") {
    if (left1 - pad1Vel < border1) {
      left1 = border1;
      right1 = border1 + padW;
      return;
    }
    left1 -= pad1Vel;
    right1 -= pad1Vel;
  }
  else if (key == "s" || key == "S") {
    if (left1 + padW + pad1Vel > border2) {
      left1 = border2 - padW;
      right1 = border2;
      return;
    }
    left1 += pad1Vel;
    right1 += pad1Vel;
  }
  return false;
}

function updateBall() {
  ballY += (ballGoingUp) ? -ballVel : ballVel;
  ballX += (ballGoingLeft) ? -ballVel : ballVel;
  if (ballY <= border1 || ballY >= border2)
    ballGoingUp = !ballGoingUp;
  if (ballX <= pad1X - 5 || ballX >= pad2X + 5)
    ballGoingLeft = !ballGoingLeft;
}

function endGame() {
  alert("Puntuacion final: " +
    String(pad1P) + '-' + String(pad2P) + '\n' + ((pad2P == pad1P) ?
      "Empate" : ("Felicitaciones jugador " + ((pad1P < pad2P) ? "2" : "1")) + "!!!"));
  clear();
  exit();
}

function updateTime() {
  time -= 1;
  if (time == 0)
    endGame();
}

function scored() {
  ballX = x_width / 2;
  ballY = y_height / 2;
  time += 3;
  ballGoingLeft = !ballGoingLeft;
  ballGoingUp = !ballGoingUp;
}

function updateScore() {
  if ((ballX == pad1X + 2 * padW - 2 && (ballY >= left1) && (ballY <= right1))
    || (ballX == pad2X - padW && (ballY >= left2) && (ballY <= right2)))
    ballGoingLeft = !ballGoingLeft;
  else if (ballX < pad1X) {
    pad2P += 1;
    scored();
  }
  else if (ballX > pad2X) {
    pad1P += 1;
    scored();
  }
  document.getElementById("tiempo").textContent = String(time) + "s";
  document.getElementById("puntaje").textContent = String(pad1P) + " - " + String(pad2P);
}