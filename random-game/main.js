const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');
const eat = document.querySelector('.eat');
const turn = document.querySelector('.turn');
const li = document.querySelectorAll('li');
const header = document.querySelector('h1');

const background = new Image();
background.src = 'assets/background.jpg';

const foodImg = new Image();
foodImg.src = 'assets/snake.jpg';

if(window.innerWidth >= window.innerHeight) {
canvas.height = window.innerHeight * 0.9;
canvas.width = canvas.height;
} else {
    canvas.width = window.innerWidth * 0.7;
    canvas.height = canvas.width;
}


let box = canvas.height / 16;

let score = 0;
let results = [];
if(localStorage.results)
results = JSON.parse(localStorage.results);
for (let i = 0; i < results.length; i++) {
    li[i].innerText = results[i];
}

let food = {
    x: Math.floor((Math.random() * 14 + 1)) * box,
    y: Math.floor((Math.random() * 14 + 1)) * box,
};

let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

document.addEventListener('keydown', direction);
let x1 = 0;
let y1 = 0;
document.addEventListener('touchstart', (event) => {
    x1 = event.touches[0].clientX;
    y1 = event.touches[0].clientY;
    console.log(x1, y1);
});
document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    let x2 = event.touches[0].clientX;
    let y2 = event.touches[0].clientY;

    let xDelta = x2 - x1;
    let yDelta = y2 - y1;

    if (Math.abs(xDelta) > Math.abs(yDelta)) {
        if (xDelta > 0 && dir != 'left') {
            if (dir != 'right') {
                turn.load();
                turn.play();
                }
                if (!snake[1]) {
                    dir = 'right';
                    } else if (snake[1].y !== snake[0].y) dir = 'right';
        } else if (xDelta < 0 && dir != 'right') {
            if (dir != 'left') {
                turn.load();
                turn.play();
                }
                if (!snake[1]) {
                dir = 'left';
                } else if (snake[1].y !== snake[0].y) dir = 'left';
        }
    } else {
        if (yDelta > 0 && dir != 'up') {
            if (dir != 'down') {
                turn.load();
                turn.play();
                }
                if (!snake[1]) {
                    dir = 'down';
                    } else if (snake[1].x !== snake[0].x) dir = 'down';
        } else if (yDelta < 0 && dir != 'down') {
            if (dir != 'up') {
                turn.load();
                turn.play();
                }
                if (!snake[1]) {
                    dir = 'up';
                    } else if (snake[1].x !== snake[0].x) dir = 'up';  
         }
    }
})

let dir;

function direction(event) {
    if (event.keyCode === 37 && dir !== 'right') {
        event.preventDefault();
        if (dir != 'left') {
        turn.load();
        turn.play();
        }
        if (!snake[1]) {
        dir = 'left';
        } else if (snake[1].y !== snake[0].y) dir = 'left';
    }
    if (event.keyCode === 38 && dir !== 'down'){
        event.preventDefault();
        if (dir != 'up') {
            turn.load();
            turn.play();
            }
            if (!snake[1]) {
                dir = 'up';
                } else if (snake[1].x !== snake[0].x) dir = 'up';    
            }
    if (event.keyCode === 39 && dir !== 'left'){
        event.preventDefault();
        if (dir != 'right') {
            turn.load();
            turn.play();
            }
            if (!snake[1]) {
                dir = 'right';
                } else if (snake[1].y !== snake[0].y) dir = 'right';    
            }
    if (event.keyCode === 40 && dir !== 'up'){
        event.preventDefault();
        if (dir != 'down') {
            turn.load();
            turn.play();
            }
            if (!snake[1]) {
                dir = 'down';
                } else if (snake[1].x !== snake[0].x) dir = 'down';    
            }
}

function eatTail(head, arr) {
    for(let i = 0; i < snake.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y)
        gameOver();
    }
}

function drawGame() {
    ctx.drawImage(background, 0, 0, canvas.width * 2, canvas.height * 2);
    ctx.drawImage(foodImg, food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
        ctx.drawImage(foodImg, snake[i].x, snake[i].y, box, box);
        if(food.x === snake[i].x && food.y === snake[i].y && i != 0){
        food = {
            x: Math.floor((Math.random() * 14 + 1)) * box,
            y: Math.floor((Math.random() * 14 + 1)) * box,
        };
    }
        }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === food.x && snakeY === food.y) {
        eat.load();
        eat.play();
        score++;
        food = {
            x: Math.floor((Math.random() * 14 + 1)) * box,
            y: Math.floor((Math.random() * 14 + 1)) * box,
        };
    } else {
        snake.pop();
    }

    if(dir === "left") snakeX -= box;
    if(dir === "right") snakeX += box;
    if(dir === "up") snakeY -= box;
    if(dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    }

    if (snakeX < 0 || snakeX > 15 * box || snakeY < 0 || snakeY > 15 * box)
    gameOver();

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);

function gameOver() {
    results.push(score);
    if(results.length >= 11) results.shift();
    localStorage.results = JSON.stringify(results);
    clearInterval(game);
    header.innerText = `You've lost! Your result is ${score}. Refresh or click here to play again.`;
    header.addEventListener('click', () => {
        location.reload();
    })
}