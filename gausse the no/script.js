let rno = Math.floor(100*Math.random());
let diff = 0;
let high = 0;
let hcount=0;
let v = 0;
let r = "";
let sc = 0;
let uno = document.querySelector("input");
let b = document.querySelector(".b");
let s = document.createElement("div");
let reset = document.querySelector(".new");
let score = document.querySelector(".score");
let highscore = document.querySelector(".high");
reset.disabled = true;

function winner()
{
    score.innerHTML = sc;
    if(hcount == 1)
    {
        
        highscore.innerHTML = score.innerHTML;
        high = highscore.innerHTML;
    }
    if(high >= score.innerHTML)
    {
        high = score.innerHTML;
        highscore.innerHTML = high;
    }
    
    
    uno.disabled = true;
    b.disabled = true;
    reset.disabled = false;
    sc = 0;
}

reset.addEventListener("click",(e) => {
    rno = Math.floor(100*Math.random());
    score.innerHTML = 0; 
    uno.disabled = false;
    b.disabled = false;
    reset.disabled = true;
    b.value = `00`;
    s.innerHTML = ``;
}
)

function game()
{

    v = eval(uno.value);
  if(v == rno)
  {
    sc++;
    hcount++;
    score.innerHTML = sc;
    r = `congratulation your are predic true no and no is ${rno}`;
    winner();
  }
  else
  {
    sc++;
    score.innerHTML = sc;
    if(v > rno)
    {

        diff = v - rno;
        if(diff > 60)
        {
            r = `pls enetr very very small no! try again!`;
        }
        else if(diff > 30)
        {
            r = `pls enter very small no! try again!`;
        }
        else if(diff > 15)
        {
            r = `pls enter small no! try again!`;
        }
        else
        {
           if(diff >= 7)
           {
            r = 'your are close! try again!';
           }
           else if(diff  >= 4)
           {
            r = 'your are very close! try again!';
           }
           else{
            r = 'your are very very close! try again!';
           }
        }
    }
    else
    {

        diff = rno - v;
        if(diff > 60)
        {
            r = `pls enetr very very big no! try again!`;
        }
        else if(diff > 30)
        {
            r = `pls enter very big no! try again!`;
        }
        else if(diff > 15)
        {
            r = `pls enter big no! try again!`;
        }
        else
        {
            if(diff >= 7)
           {
            r = 'your are close! try again!';
           }
           else if(diff  >= 4)
           {
            r = 'your are very close! try again!';
           }
           else{
            r = 'your are very very close! try again!';
           }
        }
    }
  }
  s.innerHTML = r;
  b.after(s);
}

b.addEventListener("click",(e) => {
    game();
}
);



document.body.addEventListener("keydown",(e)=>{
    if(e.key == "Enter")
    {
        game();
    }
})
