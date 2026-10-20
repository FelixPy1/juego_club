let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = "inicio";
let spawnEvery = 60;

function setup() {
  createCanvas(880, 750);
  frameRate(24);
  spawnGhost();
}

function draw() {
  background(15, 10, 25);
  noStroke();
  fill(215, 210, 250);
  ellipse(800, 70, 60, 60);
  fill(40, 30, 50);
  rect(0, 700, 880, 50);
  fill(75, 65, 95);
  rect(70, 640, 55, 60, 20, 20, 0, 0);
  rect(720, 630, 65, 70, 20, 20, 0, 0);

  if (state === "inicio") {
    textAlign(CENTER, CENTER);
    fill(220, 210, 250);
    textSize(48);
    text("GHOST HUNT", width / 2, 280);

    fill(220, 255, 230);
    textSize(22);
    text("Atrapa los fantasmas", width / 2, 340);

    fill(255);
    textSize(18);
    text("Haz clic para comenzar", width / 2, 420);
    return;
  }

  if (state === "over") {
    textAlign(CENTER, CENTER);
    fill(220, 210, 250);
    textSize(42);
    text("¡Juego terminado!", width / 2, 280);

    fill(220, 255, 230);
    textSize(25);
    text("Puntos: " + score, width / 2, 350);

    fill(255);
    textSize(18);
    text("Haz clic para volver a jugar", width / 2, 420);
    return;
  }

  // Tiempo
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  if (timeLeft <= 0) {
    state = "over";
    return;
  }


  if (frameCount % spawnEvery === 0) {
    spawnGhost();
  }

  drawGhost(ghost.x, ghost.y);


  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Puntos: " + score, 20, 20);

  textAlign(RIGHT, TOP);
  text("Tiempo: " + ceil(timeLeft), width - 20, 20);
}

function spawnGhost() {
  ghost = {
    x: random(40, width - 40),
    y: random(120, height - 100)
  };
}

function drawGhost(x, y) {
  noStroke();

  fill(220, 255, 230);
  ellipse(x, y, 60, 60);
  rect(x - 30, y, 60, 25);
  triangle(x - 30, y + 25, x - 10, y + 25, x - 25, y + 38);
  triangle(x - 10, y + 25, x + 10, y + 25, x, y + 38);
  triangle(x + 10, y + 25, x + 30, y + 25, x + 25, y + 38);
  fill(20);
  ellipse(x - 12, y - 5, 10, 12);
  ellipse(x + 12, y - 5, 10, 12);
  ellipse(x, y + 12, 8, 10);
}

function mousePressed() {
  if (state === "inicio" || state === "over") {
    score = 0;
    startTime = millis();
    spawnGhost();
    state = "play";
    return;
  }

  if (state === "play") {
    if (dist(mouseX, mouseY, ghost.x, ghost.y) < 35) {
      score++;
      spawnGhost();
    }
  }
}