function inti(){
    que= Array.from({length : 9} , () => Array(9).fill(0));
    sol = que;
}
let grid_no = 0;

function gen_row(){
    return Math.floor(3*Math.random()) + Math.floor(grid_no/3) * 3;
    
}
function gen_col(){
    return Math.floor(3*Math.random()) + (grid_no%3)*3;
}
function isCheck(row , col , num){
    for(let i =0; i < 9 ; i++){
        if(que[row][i] == num || que[i][col] == num){
            return false;
        }
    }
    let strow = (Math.floor(row / 3))*3;
    let stcol = (Math.floor(col / 3))*3;

    for(let i = strow ; i < strow + 3 ; i++){
        for(let j = stcol ; j < stcol + 3;  j++){
            if(que[i][j] === num){
                return false;
            }
        }
    }
    return true;
}
function check(no, i, j) {
    for (let ii = 0; ii < 9; ii++) {
        if (que[ii][j] === no || que[i][ii] === no) {
            return true;
        }
    }

    let startRow = Math.floor(i / 3) * 3;
    let startCol = Math.floor(j / 3) * 3;

    for (let ii = startRow; ii < startRow + 3; ii++) {
        for (let jj = startCol; jj < startCol + 3; jj++) {
            if (que[ii][jj] === no) {
                return true;
            }
        }
    }
    return false;
}
function solution(row , col){
    if(row === 9){
        return true;
    }

    let nex_row = row;
    let nex_col = col + 1;
    if(col === 8){
        nex_col = 0;
        nex_row = row + 1;
    }
    if(que[row][col] !== 0){
        return solution(nex_row , nex_col);
    }

    for(let i = 1; i <= 9 ; i++){
        if(isCheck(row , col , i)){
            que[row][col] = i;
            if(solution(nex_row , nex_col)){
                return true;
            }
            que[row][col] = 0;
        }
    }

    return false;
}


function sudokuGenerator(){
    for(let i = 0 ; i < 3; i++){
        while(true){
            let random_no =  Math.floor(9*Math.random()) + 1;//take random no
                
    
            let random_row = gen_row();
            let random_col = gen_col();
    
             
    
            if(!check(random_no , random_row,random_col)){
                que[random_row][random_col] = random_no;
                break;
            }
        }
    }
    grid_no++;
}

let attemps = 0;
let max = 100;

while(attemps < max)
    {
        inti();
        grid_no = 0;
        for(let i = 0 ; i < 9 ; i++){
            sudokuGenerator();
            
        }
        Orignalque = JSON.parse(JSON.stringify(que));

        if(solution(0 , 0)){
            console.log(Orignalque);
            console.log(que);
            break;
        }
        attemps++;
        console.log("Attempt", attemps);
    }


let divs = document.querySelector(".main").getElementsByTagName("div");
for(let i = 0 ; i < divs.length ; i++){
    if(i >= 18 && i <=26 || i >= 45 && i <= 53){
        divs[i].classList.add("bottom_r");
    }
    else if(i % 9 != 8){
        divs[i].classList.add("both");
    }else{
        divs[i].classList.add("bottom_b");
    }
    if(i%3 == 2 && i%9 != 8){
        divs[i].classList.add("right_r");
    }else if(i % 9 != 8){
        divs[i].classList.add("both");
    }
}
for(let i = 0 ; i < divs.length ; i++){

    if(i > 71 && i <= 80){
        divs[i].classList.add("remove");
    }
}
let index = 0;
for(let i = 0 ;i  < 9 ; i++){
    for(let j = 0 ; j < 9 ; j++){
        if(Orignalque[i][j]!= 0){
            divs[index].innerText = Orignalque[i][j];
            divs[index].classList.add("spno");
            divs[index].disabled = true;
        }
        index++;
    }
}
let ans_arr = [];
for(let i = 0 ; i < 81 ; i++){
    // console.log(divs[i].innerText);
    if(divs[i].innerText == ''){
        let input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.classList.add("input");
        divs[i].append(input);

        let count = 0;
        input.addEventListener("keydown" , (e) => {
            if(e.key!='ArrowUp' && e.key != 'ArrowDown'){
                count++;
            if(count > 1 && e.key != 'Backspace' ){
                e.preventDefault();
            }else if(e.key == 'Backspace'){
                count = 0;
            }
            }
            
        }
        )
    }

}
let userans = Orignalque;
let flag = 0;
let winner = false;
// console.log(userans);
document.querySelector("button").addEventListener("click",(e) => {
  let inputs =  document.querySelectorAll("input");

  let idx = 0;
    for(let i = 0 ; i < 9 ; i++){
        for(let j = 0 ; j < 9 ; j++){
            if(userans[i][j] == 0){
                userans[i][j] = parseInt(inputs[idx].value);
                if(isCheck(i , j ,userans[i][j])){
                    flag = 1;
                    break;
                }else{
                    console.log("your step goning on right");
                }
                idx++;
            }
        }
        if(flag == 1){
            break;
        }
    }

    if(flag == 0){
        confirm("you are win!");
        winner = true;
    }else{
        confirm("you are lose!");
    }

    
    
    console.log(userans);
}
)

let time = "Time :-  00 : 00 : 00";
let second = 0 , mintus = 0 , hours = 0;
let str_second = 0 , str_mintus = 0 , str_hours = 0;

let t = document.querySelector(".t");
t.innerText = time;
const clear = setInterval(()=>{
        second++;
        if(second == 60){
            second = 0;
            mintus++;
        }

        if(mintus == 60){
            mintus = 0;
            hours++;
        }
        
        str_second = (String)(second);
        str_mintus = (String)(mintus);
        str_hours = (String)(hours);
        // console.log(str_second , second);
        if(second <= 9){
            str_second = "0"+String(second);
        }

        if(mintus <= 9){
            str_mintus = "0"  +String(mintus);
        }

        if(hours <= 9){
            str_hours = "0"  +(String)(hours);
        }
        // console.log(str_second);
        t.innerText = `Time :-  ${str_hours} : ${str_mintus} : ${str_second}`;

        if(winner){
            clearInterval(clear);
        }
    
    },1000);