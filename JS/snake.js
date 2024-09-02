const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');
const toggleLightBtn = document.getElementById('toggleLight');

const box = 15;
let snake = [];
let food = {};
let direction = 'right';
let game;
let score = 0;

function init() {
    snake = [
        {x: 9 * box, y: 10 * box},
        {x: 8 * box, y: 10 * box},
        {x: 7 * box, y: 10 * box}
    ];
    createFood();
    direction = 'right';
    score = 0;
    scoreElement.textContent = `分数: ${score}`;
}

function createFood() {
    food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格线
    ctx.strokeStyle = "#ddd";
    for (let i = 0; i <= canvas.width; i += box) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += box) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
    
    // 绘制蛇
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "green" : "white";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "red";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });
    
    // 绘制食物
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    // 移动蛇
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (direction === "left") snakeX -= box;
    if (direction === "up") snakeY -= box;
    if (direction === "right") snakeX += box;
    if (direction === "down") snakeY += box;
    
    // 检查是否吃到食物
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        scoreElement.textContent = `分数: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
    
    // 创建新的蛇头
    const newHead = {x: snakeX, y: snakeY};
    
    // 检查碰撞
    if (checkCollision(newHead)) {
        clearInterval(game);
        alert(`游戏结束！你的得分是: ${score}`);
        init();
        return;
    }
    
    snake.unshift(newHead);
}

function checkCollision(head) {
    return (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && direction !== 'right') direction = 'left';
    if (key === 38 && direction !== 'down') direction = 'up';
    if (key === 39 && direction !== 'left') direction = 'right';
    if (key === 40 && direction !== 'up') direction = 'down';
}

document.addEventListener('keydown', changeDirection);

startBtn.addEventListener('click', () => {
    clearInterval(game);
    init();
    game = setInterval(draw, 100);
});

// 虚拟按键控制
document.getElementById('upBtn').addEventListener('click', () => { if(direction !== "down") direction = "up"; });
document.getElementById('leftBtn').addEventListener('click', () => { if(direction !== "right") direction = "left"; });
document.getElementById('rightBtn').addEventListener('click', () => { if(direction !== "left") direction = "right"; });
document.getElementById('downBtn').addEventListener('click', () => { if(direction !== "up") direction = "down"; });

// 关灯功能
toggleLightBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleLightBtn.textContent = document.body.classList.contains('dark-mode') ? '开灯' : '关灯';
});

init();

