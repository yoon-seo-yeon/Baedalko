
// 캔버스 생성
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


let firstgradeImg = new Image();
firstgradeImg.src = '1grade.gif';

let Character = {
    x : 50,
    y : 300,
    width : 80,
    height : 80,

    draw(){
        ctx.fillStyle = "green";
        ctx.drawImage(firstgradeImg, this.x, this.y);
    }
}

Character.draw();

class Cactus{
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let cactus = new Cactus();
cactus.draw();


let timer = 0;
let cactusCount = [];
let jumpTimer = 0;

function frameExecution(){
    requestAnimationFrame(frameExecution);
    timer++;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 60 == 0){
        let cactus = new Cactus();
        cactusCount.push(cactus);
        
    }

    cactusCount.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거해야한다.
        if(a.x < 0){
            o.splice(i, 1);
        }
        a.x--;
        a.draw();
    })
    
    // 점프
    if(jumpSwitch == true){
        Character.y -= 7;
        jumpTimer++;
    }
    if(jumpSwitch == false){
        if(Character.y < 300) Character.y += 2;
    }

    if(jumpTimer > 20){ jumpSwitch = false; jumpTimer = 0; }
    Character.draw()
}

frameExecution();

// 스페이스를 누를 때마다 점프하기
var jumpSwitch = false; // 점프를 하는지 안 하는지 체크해주는 거
document.addEventListener('keydown', function(e){
    if(e.code === 'Space'){
        jumpSwitch = true;
    }
})