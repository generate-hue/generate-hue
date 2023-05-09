// Set up the canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Set up the game variables
var snake = [{x: 5, y: 5}];
var direction = "right";
var food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
var score = 0;

// Handle key presses to change direction
document.addEventListener("keydown", function(event) {
  if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Update the game state and redraw the canvas
function update() {
  // Move the snake
  var head = {x: snake[0].x, y: snake[0].y};
  if (direction === "up") {
    head.y--;
  } else if (direction === "down") {
    head.y++;
  } else if (direction === "left") {
    head.x--;
  } else if (direction === "right") {
    head.x++;
  }
  snake.unshift(head);
  
  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20)};
  } else {
    snake.pop();
  }
  
  // Check for collision with walls or self
  if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
    clearInterval(interval);
    alert("Game over! Score: " + score);
    return;
  }
  for (var i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      clearInterval(interval);
      alert("Game over! Score: " + score);
      return;
    }
  }
  
  // Redraw the canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
  ctx.fillStyle = "green";
  for (var i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 20, snake[i].y * 20, 20, 20);
  }
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Start the game loop
var interval = setInterval(update, 100);
