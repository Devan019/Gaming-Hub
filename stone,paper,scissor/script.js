let stone = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissors = document.querySelector(".scissors");
let msq=document.querySelector('.msg');
let winner=document.querySelector(".win");
let loser=document.querySelector(".lose");
let win=0;
let lose=0;

stone.addEventListener("click",()=> {
  check("stone");
}
)

paper.addEventListener("click",()=> {
  check("paper");
}
)

scissors.addEventListener("click",()=> {
  check("scissors");
}
)
function check(x){
  let temp=["stone","paper","scissors"];
  let string=x;
  let index=Math.floor(3*Math.random())
  let newstring=temp[index];
 
  let opstring=(string)+newstring;
  let final="";
   switch (opstring) {
    case "stonescissors":
    case "scissorspaper":
    case "paperstone":
      final+="win";
      break;

    case "scissorsstone":
    case "paperscissors":
    case "stonepaper":
      final+="lose";
      break;
  
    default:
      final+="drow"
      break;
  }

if(final=="win"){
  win++;
}
else if(final=="lose"){
  lose++;
}
msq.innerHTML=`you chose <b><u>${string}</b></u> and computer chose  <b><u>${newstring}</b></u>
. so you are <b><u>${final}</b></u>.`

winner.innerHTML=`win:-${win}`;
loser.innerHTML=`lose:-${lose}`;
console.log("win",win,"lose",lose);
console.log(opstring);
}

