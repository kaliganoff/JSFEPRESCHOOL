const canvas = document.querySelector('.game');
const ctx = canvas.getContext('2d');
const eat = document.querySelector('.eat');
const turn = document.querySelector('.turn');
const up = document.querySelector('.up');
const down = document.querySelector('.down');
const gameover = document.querySelector('.gameover');
turn.volume = 0.3;
up.volume = 0.3;
down.volume = 0.3;
gameover.volume = 0.5;
const li = document.querySelectorAll('li');
const header = document.querySelector('.header');
const hint = document.querySelector('.hint');
const restart = document.querySelector('.restart');
const h2 = document.querySelector('.h2');
const difficultyHeader = document.querySelector('.difficulty');
const easy = document.querySelector('.easy');
const normal = document.querySelector('.normal');
const hard = document.querySelector('.hard');
const year = document.querySelector('.year');



const background = new Image();
background.src = 'assets/background.jpg';

const foodImg = new Image();
foodImg.src = 'assets/snake.jpg';

if(window.innerWidth >= window.innerHeight) {
canvas.height = window.innerHeight * 0.9;
canvas.width = canvas.height;
} else {
    canvas.width = window.innerWidth * 0.5;
    canvas.height = canvas.width;
}

header.height = canvas.height / 12;
h2.height = header.height * 0.8;
difficultyHeader.height = header.height;

hint.style.top = `${header.height * 2.5}px`;
hint.style.left = '50%';

restart.style.display = 'none';
restart.style.top = `${header.height * 6}px`;
restart.style.left = '50%';

easy.style.fontSize = `${h2.height * 0.5}px`;
normal.style.fontSize = `${h2.height * 0.5}px`;
hard.style.fontSize = `${h2.height * 0.5}px`;

easy.height = difficultyHeader.height * 0.5;
normal.height = difficultyHeader.height * 0.5;
hard.height = difficultyHeader.height * 0.5;

year.height = easy.height;


let box = canvas.height / 16;

let score = 0;
let results = [];
if(localStorage.results)
results = JSON.parse(localStorage.results);
for (let i = 0; i < results.length; i++) {
    li[i].innerText = `Score: ${results[i]}`;
    li[i].style.fontSize = `${h2.height * 0.5}px`;
}

let difficulty = 100;
if (localStorage.difficulty) {
difficulty = +localStorage.difficulty;
switch(localStorage.difficulty) {
    case '150': easy.style.color = 'blue';
    break;
    case '100': normal.style.color = 'blue';
    break;
    case '50': hard.style.color = 'blue';
    break;
}
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
    hint.style.display = 'none';
    event.preventDefault();
    hint.hidden = true;
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
                down.load();
                down.play();
                }
                if (!snake[1]) {
                    dir = 'down';
                    } else if (snake[1].x !== snake[0].x) dir = 'down';
        } else if (yDelta < 0 && dir != 'down') {
            if (dir != 'up') {
                up.load();
                up.play();
                }
                if (!snake[1]) {
                    dir = 'up';
                    } else if (snake[1].x !== snake[0].x) dir = 'up';  
         }
    }
}, {passive: false});

let dir;

function direction(event) {
    hint.style.display = 'none';
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
            up.load();
            up.play();
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
            down.load();
            down.play();
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
    ctx.drawImage(background, -canvas.width * 0.3, -canvas.height * 0.7, canvas.width * 2, canvas.height * 2);
    ctx.drawImage(foodImg, food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
        if (i === 0) {
        ctx.globalAlpha = 0.8;
        ctx.drawImage(foodImg, snake[i].x, snake[i].y, box, box);
        ctx.globalAlpha = 1.0;
        } else {
        ctx.drawImage(foodImg, snake[i].x, snake[i].y, box, box);
        };
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

let game = setInterval(drawGame, difficulty);

function gameOver() {
    gameover.load();
    gameover.play();
    results.push(score);
    if(results.length >= 11) results.shift();
    for (let i = 0; i < results.length; i++) {
        li[i].innerText = `Score: ${results[i]}`;
    };
    localStorage.results = JSON.stringify(results);
    clearInterval(game);
    header.outerHTML = `<h1 style="text-align:center; font-size: ${canvas.height / 17}px; height: ${canvas.height / 32}px; margin-top: 2px;">You've lost! Your result is ${score}.<h1>`;
    restart.style.display = 'block';
    restart.addEventListener('click', () => {
        location.reload();
    })
}

easy.addEventListener('click', () => {
    localStorage.difficulty = '150';
    difficulty = +localStorage.difficulty;
    easy.style.color = 'blue';
    normal.style.color = 'black';
    hard.style.color = 'black';
    location.reload();
})

normal.addEventListener('click', () => {
    localStorage.difficulty = '100';
    difficulty = +localStorage.difficulty;
    easy.style.color = 'black';
    normal.style.color = 'blue';
    hard.style.color = 'black';
    location.reload();
})

hard.addEventListener('click', () => {
    localStorage.difficulty = '50';
    difficulty = +localStorage.difficulty;
    easy.style.color = 'black';
    normal.style.color = 'black';
    hard.style.color = 'blue;'
    location.reload();
});