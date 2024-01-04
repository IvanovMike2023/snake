let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style = 'background: #918c86'
ctx.fill()
let width = canvas.width
let height = canvas.height
let blockSize = 10;
let scope = 0
//размеры в блоках
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
//рисую линию обертку
const drawBorder = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, blockSize)
    ctx.fillRect(0, height - blockSize, width, blockSize)
    ctx.fillRect(0, 0, blockSize, height)
    ctx.fillRect(width - blockSize, 0, width - blockSize, height)
}
//счет
const drawScope = () => {
    ctx.font = '20px Courier'
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top"
    ctx.fillText('Счет:' + scope, blockSize, blockSize)
}
// функция конец игры
const gameover = () => {
    snake.segments.splice(3)
    clearTimeout(intervalId)
    scope=0
    speed=100
    ctx.font = '20px Courier'
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"
    ctx.fillText('Конец игры!!!', width / 2, height / 2)
}
//конструктор блока (ячейки)
let Block = function (col, row) {
    this.col = col;
    this.row = row
}
//рисую квадрат в позиции
Block.prototype.drawSquare = function (color) {
    let x = this.col * blockSize
    let y = this.row * blockSize
    ctx.fillStyle = color
    ctx.fillRect(x, y, blockSize, blockSize)
}
//рисую круг в позиции
let circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
        ctx.fill();
    } else {
        ctx.stroke();
    }
}
Block.prototype.drawCircle = function (color) {
    var centerX = this.col * blockSize + blockSize / 2;
    var centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};
//проверка находится ли ячейка в той,же в которой находится otherBlock
Block.prototype.equal = function (otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row
}
//создаем объект змейка
let Snake = function () {
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ],
        this.direction = 'right',
        this.nexdirection = 'right'
}
//отрисовка змейки
Snake.prototype.draw = function () {
    for (let i = 0; i < this.segments.length; i++) {
        if(i==0){
            this.segments[i].drawSquare('green')
        }else
        this.segments[i].drawSquare('blue')
    }
}
Snake.prototype.move = function () {
    let head = this.segments[0]
    let newhead
    this.direction = this.nexdirection
    if (this.direction === 'right') {
        newhead = new Block(head.col + 1, head.row)
    }
    if (this.direction === 'down') {
        newhead = new Block(head.col, head.row + 1)
    }
    if (this.direction === 'up') {
        newhead = new Block(head.col, head.row - 1)
    }
    if (this.direction === 'left') {
        newhead = new Block(head.col - 1, head.row)
    }
    if (this.checkCollision(newhead)) {
        gameover()
        return
    }
    this.segments.unshift(newhead)
    if (newhead.equal(apple.position)) {
        scope++
        apple.move()
    } else {
        this.segments.pop()
    }
}
//проверка на столкновение
Snake.prototype.checkCollision = function (head) {
    let leftCollision = (head.col === 0)
    let toptCollision = (head.row === 0)
    let rightCollision = (head.col === widthInBlocks - 1)
    let bottomtCollision = (head.row === heightInBlocks - 1)
    let wallCollision = leftCollision || toptCollision || rightCollision || bottomtCollision
    let selfCollision = false
    for (let i = 0; i < this.segments.length; i++) {
        if (head.equal(this.segments[i])) {
            selfCollision = true
        }
    }
    return wallCollision || selfCollision
}

//создаем метод setDirection - метод напрвления змейки
Snake.prototype.setDirection = function (newDirection) {
    if (this.direction === 'up' && newDirection === 'doun')
        return
    if (this.direction === 'down' && newDirection === 'up')
        return
    if (this.direction === 'right' && newDirection === 'left')
        return
    if (this.direction === 'left' && newDirection === 'right')
        return
    this.nexdirection = newDirection
}
//конструктор Apple
let Apple = function () {
    this.position = new Block(10, 10)
}
//рисуем яблоко
Apple.prototype.draw = function () {
    this.position.drawCircle('green')
}
//перемещения яблока
Apple.prototype.move = function () {
    let randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1
    let randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1
    this.position = new Block(randomCol, randomRow)
}
//создаем объкт яблоко и змейка
let apple = new Apple()
let snake = new Snake()
//Обработка клавиатуры
let directions = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
}
document.addEventListener('keydown', function (event) {
    let newDirection = directions[event.keyCode]
    if (newDirection !== undefined) {
        snake.setDirection(newDirection)
    }
});
//запускаем функцию анимации через setInterval
let speed =100
let intervalId =  function () {
    ctx.clearRect(0, 0, width, height)
    drawScope()
    snake.move()
    snake.draw()
    apple.draw()
    drawBorder()
    setTimeout(intervalId,speed)
    if(scope>2){
        speed=50
    } if(scope>5){
        speed=40
    } if(scope>7){
        speed=30
    }if(scope>8){
        speed=20
    }
  }
intervalId()
// let intervalId =  setInterval(function () {
//     ctx.clearRect(0, 0, width, height)
//     drawScope()
//     snake.move()
//     snake.draw()
//     apple.draw()
//     drawBorder()
// }, speed)

//snake.draw()
//let apple = new Block(1, 6)
//let head = new Block(1, 6)


//console.log(head.Equal(apple))
//sampleBlock.drawSquare('red')
//sampleCircle.drawCircle('red')
//console.log(sampleBlock)
//console.log(heightInBlocks)