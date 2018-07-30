let ship;
let aliens = [];
let bullets = [];
var gameover = 0;
var score = 0;
var scoretosee = 0;
var shooting = 0;
var kill = 0;
var killtosee = 0;
var realscore = 0;
var realscoretosee = 0;

var pressedkey = 0;
var uparrowst = 0;
var downarrowst = 0;
var leftarrowst = 0;
var rightarrowst = 0;
var resetbuttonst = 0;
var mousepos = 0;

function preload() {
  shippic = loadImage("IMAGES/spaceship.png");
}

function setup() {
  startgame();
}

function draw() {
  background(255);
  ship.show();
  realscore = score * 2 + kill * 10;
  var spacebarx = width*15/20;
  var spacebary = height*17/20;
  var spacebardx = width*4/20;
  var spacebardy = width*1/20;
  var resetbuttonx =  width*8/20;
  var resetbuttony =  height*8/20;
  var resetbuttondx =  width*3/20;
  var resetbuttondy =  width*3/20;
  noStroke();
  fill(255,0,0,150);
  rect(spacebarx, spacebary, spacebardx, spacebardy);
  if (pressedkey > 0) {
    if (uparrowst == 1) {
      ship.move(0, -10);
    }
    if (downarrowst == 1) {
      ship.move(0, 10);
    }
    if (leftarrowst == 1) {
      ship.move(-10, 0);
    }
    if (rightarrowst == 1) {
      ship.move(10, 0);
    }
  }
  if (mouseX < resetbuttonx+resetbuttondx && mouseX > resetbuttonx && mouseY < resetbuttony+resetbuttondy && mouseY > resetbuttony) {
    mousepos = 5;
  }
  else if (mouseY < height/2 && mouseX < width*2/3 && mouseX > width/3) {
    mousepos = 1;
  }
  else if (mouseY > height/2 && mouseX < width*2/3 && mouseX > width/3) {
    mousepos = 2;
  }
  else if (mouseX < width/3) {
    mousepos = 3;
  }
  else if (mouseX > width*2/3) {
    mousepos = 4;
  }
  // if (keyIsDown(65)) { // A key
  //   ship.move(-10, 0);
  // }
  // if (keyIsDown(68)) { // D key
  //   ship.move(10, 0);
  // }
  // if (keyIsDown(87)) { // W key
  //   ship.move(0, -10);
  // }
  // if (keyIsDown(83)) { // S key
  //   ship.move(0, 10);
  // }
  for (let a of aliens) {
    if (ship.intersect(a)) {
      gameOver();
    }
    var velocity = random(4,7);
    a.show();
    a.move(0, velocity);
  }
  for (let bb of bullets) {
    for (let a of aliens) {
      if (bb.intersect(a)) {
        kill = kill + 1;
        bullets.splice(bb, 1);
        aliens.splice(a, 1);
      }
    }
  }
  if (shooting) {
    for (bb of bullets) {
      bb.show();
      bb.move(0, -10);
    }
  }
  if (gameover) {
    fill(255, 0, 0);
    textSize(16);
    textAlign(CENTER);
    text ("GAME OVER! Press the BIG RED RESET BUTTON or wait.", width / 2, height - 100);
    textSize(16);
    textAlign(RIGHT);
    text("Aliens:", width - 150, 50);
    text(scoretosee, width - 100, 50);
    text("Kill:", width - 150, 70);
    text(killtosee, width - 100, 70);
    text("Score:", width - 150, 90);
    text(realscoretosee, width - 100, 90);
    fill(255,0,0,150);
    rect(resetbuttonx, resetbuttony, resetbuttondx, resetbuttondy);
    if (pressedkey > 0) {
      if (resetbuttonst == 1) {
        clearTimeout(gamerestart);
        startgame();
      }
    }
    // if (keyIsDown(82)) { // R key
    //   clearTimeout(gamerestart);
    //   startgame();
    // }
  }
  else {
    fill(0, 255, 0);
    textSize(16);
    textAlign(RIGHT);
    text("Aliens:", width - 150, 50);
    text(score, width - 100, 50);
    text("Kill:", width - 150, 70);
    text(kill, width - 100, 70);
    text("Score:", width - 150, 90);
    text(realscore, width - 100, 90);
    if (score < 200) {
      text("SHITPACE", width/2, 100);
      text("Use FOUR SIDES OF SCREEN to move, RED BAR to shoot.", width - 100, 200);
    }
  }
}

function startgame() {
  gameover = 0;
  kill = 0;
  score = 0;
  realscore = 0;
  createCanvas(windowWidth, windowHeight);
  var x = width / 2;
  var y = height - 50;
  var d = 70;
  ship = new Ship(x, y, d);
  aliengenvar = setInterval(aliengen, 150);
}

function gameOver() {
  gameover = 1;
  clearInterval(aliengenvar);
  scoretosee = score;
  killtosee = kill;
  realscoretosee = realscore;
  aliens = [];
  gamerestart = setTimeout(startgame, 10000);
}

function aliengen() {
  let d = 20;
  let x = random(0, width - d);
  let y = -20;
  let a = new Alien(x, y, d);
  aliens.push(a);
  score = score + 1;
}

function mousePressed() {
  pressedkey = 1;
  var spacebarx = width*15/20;
  var spacebary = height*17/20;
  var spacebardx = width*4/20;
  var spacebardy = height*1/20;
  if (mouseX < spacebarx+spacebardx && mouseX > spacebarx && mouseY < spacebary+spacebardy && mouseY > spacebary) {
    ship.shoot();
    shooting = 1;
  }
  else if (mousepos == 5) {
    resetbuttonst = 1;
  }
  else if (mousepos == 1) {
    uparrowst = 1;
  }
  else if (mousepos == 2) {
    downarrowst = 1;
  }
  else if (mousepos == 3) {
    leftarrowst = 1;
  }
  else if (mousepos == 4) {
    rightarrowst = 1;
  }
}

function mouseReleased() {
  pressedkey = 0;
  resetbuttonst = 0;
  uparrowst = 0;
  downarrowst = 0;
  leftarrowst = 0;
  rightarrowst = 0;
}

class Bullet {
  constructor(tempX, tempY, tempD) {
    this.x = tempX - tempD;
    this.y = tempY - tempD;
    this.d = tempD;
  }
  intersect(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < (this.d + other.d) / 3);
  }
  show() {
    noStroke();
    fill(0, 200);
    ellipse(this.x, this.y, this.d, this.d);
  }
  move(velocityX, velocityY) {
    this.x = this.x + velocityX;
    this.y = this.y + velocityY;
  }
}

class Alien {
  constructor(tempX, tempY, tempD) {
    this.x = tempX - tempD;
    this.y = tempY - tempD;
    this.d = tempD;
  }
  move(velocityX, velocityY) {
    this.x = this.x + velocityX;
    this.y = this.y + velocityY;
  }
  show() {
    noStroke();
    fill(0, 255, 0);
    rect(this.x, this.y, this.d, this.d);
  }
}

class Ship {
  constructor(tempX, tempY, tempD) {
    this.x = tempX - tempD;
    this.y = tempY - tempD;
    this.d = tempD;
  }
  intersect(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return (d < (this.d + other.d) / 3);
  }
  shoot() {
    let bb = new Bullet(this.x + this.d / 2 + this.d / 8, this.y, 10);
    bullets.push(bb);
  }
  move(velocityX, velocityY) {
    this.x = this.x + velocityX;
    this.y = this.y + velocityY;
    //collusion to edges
    if (this.x < 0) {
      this.x = this.x + 50;
    }
    if (this.x > width) {
      this.x = this.x - 50;
    }
    if (this.y < 0) {
      this.y = this.y + 50;
    }
    if (this.y > height) {
      this.y = this.y - 50;
    }
  }
  show() {
    image(shippic, this.x, this.y, this.d, this.d);
  }
}
