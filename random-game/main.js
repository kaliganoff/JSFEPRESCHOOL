const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = 'assets/background.jpg';

const foodImg = new Image();
foodImg.src = 'assets/snake.jpg';

let box = 32;

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 17 + 17)) * box,
};

let snake = [];

snake[0] = {
    x: 17 * box,
    y: 30 * box,
};

document.addEventListener('keydown', direction);

let dir;

function direction(event) {
    if (event.keyCode === 37 && dir !== 'right') dir = 'left';
    if (event.keyCode === 38 && dir !== 'down') dir = 'up';
    if (event.keyCode === 39 && dir !== 'left') dir = 'right';
    if (event.keyCode === 40 && dir !== 'up') dir = 'down';
}

function drawGame() {
    ctx.drawImage(background, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i++) {
        ctx.drawImage(foodImg, snake[i].x, snake[i].y);
    }

    ctx.fillStyle = 'black';
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 2.5);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 17 + 17)) * box,
        };
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > 30 * box || snakeY < box || snakeY > 40 * box)
    clearInterval(game);

    if(dir === "left") snakeX -= box;
    if(dir === "right") snakeX += box;
    if(dir === "up") snakeY -= box;
    if(dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);