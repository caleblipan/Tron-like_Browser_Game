var SCL = 5;

var player1, player2;

function setup() {
    createCanvas(0.8 * windowWidth, 0.8 * windowHeight);
    
    frameRate(30);
    
    player1 = new Bike(50 / SCL, height / 2 / SCL, 1, 0, color("yellow"));
    player2 = new Bike((width - 50) / SCL, height / 2 / SCL, -1, 0, color("lightblue"));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    player1.update();
    player2.update();
    
    // Recursive
    player1.draw();
    player2.draw();
    
    // If players collide at the same time
	if ((player1.collidesWith(player2.trail) && player2.collidesWith(player1.trail)) ||
        (player1.collidesWith(player1.trail) && player2.collidesWith(player2.trail)) ||
		(player1.collidesWithBounds() && player2.collidesWithBounds()))	{
		endGame("Draw!");
	} else if (player1.collidesWith(player2.trail) || player1.collidesWithBounds() || player1.collidesWith(player1.trail)) {
        // If CLU collides
		endGame("User wins");
	} else if (player2.collidesWith(player1.trail) || player2.collidesWithBounds() || player2.collidesWith(player2.trail)) {
        // If User collides
		endGame("CLU (Codified Likeness Utility) wins!");
	}
}

function keyPressed() {

  switch (keyCode) {

    case 37:
      player2.setVelocity(createVector(-1, 0));
      break;

    case 38:
      player2.setVelocity(createVector(0, -1));
      break;

    case 39:
      player2.setVelocity(createVector(1, 0));
      break;

    case 40:
      player2.setVelocity(createVector(0, 1));
      break;

    case 65:
      player1.setVelocity(createVector(-1, 0));
      break;

    case 87:
      player1.setVelocity(createVector(0, -1));
      break;

    case 68:
      player1.setVelocity(createVector(1, 0));
      break;

    case 83:
      player1.setVelocity(createVector(0, 1));
      break;
  }
}

function endGame(winner) {
    alert("Game over, " + winner);
    noLoop();
}