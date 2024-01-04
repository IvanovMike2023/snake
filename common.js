var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
let ground = new Image()
ground.src = "img/1.png"
let foodImg = new Image()
foodImg.src = "img/2.png"
let box = 32
let scope = 0
let speed = 250
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}
let shake = []
shake[0] = {
    x: 9 * box,
    y: 10 * box
}
let dir = 'd'
const direction = (event) => {
    if (event.keyCode === 37 && dir != 'right')
        dir = 'left'
    if (event.keyCode === 38 && dir != 'down')
        dir = 'up'
    if (event.keyCode === 40 && dir != 'up')
        dir = 'down'
    if (event.keyCode === 39 && dir != 'left')
        dir = 'right'
}
document.onkeydown = direction
// document.addEventListener('keydown', direction)
const eatYourself=(head,arr)=>{
    for(let i=0;i<arr.length;i++){
        if(head.x===arr[i].x && head.y===arr[i].y )
            clearInterval(game)
    }
}
let drawgame = () => {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImg, food.x, food.y)
    for (let i = 0; i < shake.length; i++) {
        ctx.fillStyle = "black"
        ctx.fillRect(shake[i].x, shake[i].y, box, box)
    }

    let shakeX = shake[0].x
    let shakeY = shake[0].y
    if (shakeX === food.x && shakeY === food.y) {
        scope++
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }
    else {
        shake.pop()
    }
    if (shakeX < box || shakeX > 17 * box || shakeY < 3 * box || shakeY > 17 * box) {
        clearInterval(game)
    }
    if (dir == 'right') shakeX += box
    if (dir == 'left') shakeX -= box
    if (dir == 'up') shakeY -= box
    if (dir == 'down') shakeY += box
    let newHead = {
        x: shakeX,
        y: shakeY
    }
    eatYourself(newHead,shake)
    shake.unshift(newHead)
    ctx.fillStyle = "white"
    ctx.font = '50px Arial'
    ctx.fillText(scope, box * 2.5, box * 1.7)
    ctx.fillText(speed, box * 4.5, box * 1.7)


}
console.log(scope)
//setInterval(drawgame, speed-=20)

let game = setInterval(drawgame, speed)
