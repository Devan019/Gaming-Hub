//start js
// let game = document.querySelector("#main");
// game.classList.add("display");
let inputMove = {
    x : 0,
    y : 0,
}

let snack = [
    {x : 5 , y : 7,}
]

let foodLocation = {
    x : 10,
    y : 16,
}
let f1 = 0 , f2 = 0;

let moveAudio = new Audio("./move.mp3");
let bgMusic = new Audio("./music.mp3");
let foodSound = new Audio("./food.mp3");
let gameOver = new Audio("./gameover.mp3");

let board = document.querySelector("#board");
let sc = document.querySelector("#sc");
let high = document.querySelector("#high");

let score = 0;
let highest = 0;

let speed = 50;
let prevtime = 0;

function isCollide(){
    for(let i = 1 ; i < snack.length ; i++){
        if(snack[i].x === snack[0].x && snack[i].y === snack[0].y){
            return true;
        }
    }

    if(snack[0].x < 0 || snack[0].x > 20 || snack[0].y < 0 || snack[0].y > 20){
        return true;
    }

    return false;
}

function gameStart(){
    if(isCollide()){
        gameOver.play();
        alert("game is over");
        snack = [
            {x : 5 , y : 7,}
        ]
        inputMove = {
            x : 0,
            y : 0,
        }
        // console.log(high.innerText , score);
        if(highest < score){
            high.innerText = `Highest Score :- ${score}`
        }
        score = 0;
        return;
    }
    sc.innerText = `Score :- ${score}`;
    //display food
    board.innerHTML = "";
    let food = document.createElement("div");
    food.classList.add("food");
    food.style.gridRowStart = foodLocation.y;
    food.style.gridColumnStart = foodLocation.x;
    board.appendChild(food);

    //display snack
    snack.forEach((value,idx)=>{
        let snackBody = document.createElement("div");
        snackBody.style.gridRowStart = value.y;
        snackBody.style.gridColumnStart = value.x;
        if(idx === 0){
            snackBody.classList.add("snack-head");
        }else{
            snackBody.classList.add("snack-body");
        }

        board.appendChild(snackBody);
    });

    //food == snack-head
    if(snack[0].x === foodLocation.x && snack[0].y === foodLocation.y){
        foodSound.play();
        let a = 2 , b = 18;
        foodLocation = {
            x : Math.round(a + (b-a)*Math.random()),
            y : Math.round(a + (b-a)*Math.random()),
        }

        snack.unshift({
            x: snack[0].x + inputMove.x,
            y: snack[0].y + inputMove.y,
        })
        score++;
    }

    //move snack
    for(let i = snack.length - 2 ;i  >= 0 ;i--){
        snack[i+1] = {...snack[i]};
    }
    snack[0].x += inputMove.x;
    snack[0].y += inputMove.y;
    
}

function main(ctime){
    window.requestAnimationFrame(main);
    if(ctime - prevtime < speed){
        return;
    }
    prevtime = ctime;
    // console.log(ctime);

    gameStart(); //gameStart
}

//frame randoring
window.requestAnimationFrame(main);

window.addEventListener("keydown",(e)=>{
    let div = document.querySelectorAll("div");
    console.log(e.key);
    bgMusic.play();
    moveAudio.play();
    if(f1 == 0 && e.key == "ArrowRight"){
        f1 = 1;
        f2 = 0;
        inputMove.x = 1;
        inputMove.y = 0;
        div.forEach((ele) => {
            if(ele.classList.contains("snack-head")){
                ele.classList.add("right-rotate");
            }
        });
    }else if(f1 == 0 && e.key == "ArrowLeft"){
        f1 = 1;
        f2 = 0;
        inputMove.x = -1;
        inputMove.y = 0;
        div.forEach((ele) => {
            if(ele.classList.contains("snack-head")){
                ele.classList.add("left-rotate");
            }
        });
    }else if(f2 == 0 && e.key == "ArrowUp"){
        f1 = 0;
        f2 = 1;
        inputMove.x =0,
        inputMove.y = -1;
        div.forEach((ele) => {
            if(ele.classList.contains("snack-head")){
                ele.classList.add("top-rotate");
            }
        });
    }else if(f2 == 0 && e.key == "ArrowDown"){
        f1 = 0;
        f2 = 1;
        inputMove.x = 0;
        inputMove.y = 1;
        div.forEach((ele) => {
            if(ele.classList.contains("snack-head")){
                ele.classList.add("bottom-rotate");
            }
        });
    }
})

