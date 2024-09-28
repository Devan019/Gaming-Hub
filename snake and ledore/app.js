let dice = document.querySelector(".paso");
let divs = document.querySelector(".main").getElementsByTagName("div");
console.log(divs);
let idx = 0;
let arr = [
    [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
    [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
    [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
    [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
    [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
    [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];
let h2 = document.querySelector(".h2");
h2.innerHTML = "now <span class = 'red'>red</span>'s turn";
let snanks = [[56, 15], [62, 57], [51, 11], [92, 53], [98, 8]];
let leador = [[2, 38], [4, 14], [9, 31], [33, 85], [52, 88], [80, 99]];

let dice_audio = new Audio("dice-142528.mp3");
let snack_sound = new Audio("eating-sound-effect-36186.mp3");
let move_sound = new Audio('maro-jump-sound-effect_1.mp3');
let bg_sound = new Audio('scheming-weasel-faster-1-mp3cutn-mp3cut.mp3');
let winning = new Audio('cheering-and-clapping-crowd-1-5995.mp3');


bg_sound.loop = true;

let first_time = 0;


function isWin(value) {
    if(value == 100){
        winning.play();
        return true;
    }

    return false;
   
}

let j = 0;
for (let i of divs) {
    if (idx == 10) {
        j++;
        idx = 0;
    }
    i.innerText = arr[j][idx];
    idx++;
}

let c1 = document.createElement("div");
let c2 = document.createElement("div");

c1.classList.add("c1");
c2.classList.add("c2");
c1.style.width = 30 + "px";
c1.style.height = 30 + "px";

c2.style.width = 30 + "px";
c2.style.height = 30 + "px";

if(document.body.offsetWidth <= 700){
    c1.style.width = 15 + "px";
    c1.style.height = 15 + "px";

    c2.style.width = 15 + "px";
    c2.style.height = 15 + "px";
}

for(let i of divs){
    if(i.innerText == 1){
        i.appendChild(c1);
        i.appendChild(c2);
        break;
    }
}

async function move(idx, c) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let i of divs) {
                if (i.innerText == idx) {
                    if (!i.contains(c)) {
                        
                        i.appendChild(c);
                    }
                }
            }
            resolve(200);
        }, 500);
    })
}



function isSnack(value) {
    for (let i = 0; i < snanks.length; i++) {
        if (snanks[i][0] == value) {
            snack_sound.play();
            return snanks[i][1];
        }
    }

    return -1;
}

function isLeador(value) {
    for (let i = 0; i < leador.length; i++) {
        if (leador[i][0] == value) {
            move_sound.play();
            return leador[i][1];
        }
    }

    return -1;
}

async function get_no() {
    return new Promise((reslove, reject) => {
        dice_audio.play();
        dice_audio.play();
        setTimeout(() => {
            reslove(Math.floor(1 + Math.random() * 6));
        }, 500)
    })
}

let f = 0;
let idx1 = 1, idx2 = 1;
let s = 0, l = 0;

function setimg(n) {
    if(n == 5){
        document.querySelector(".img").classList.add("img2");
        document.querySelector(".img").src = `dice${n}.svg`;
    }
    else
     document.querySelector(".img").src = `dice${n}.svg`;
}

async function for_move(idx,no,c){
    current_idx = idx;
    for(let i = 1 ; i <= no ;i++){
        current_idx++;
        await move(current_idx,c);
        
    }
}

function  setSmaliy(no){
    let s = document.querySelector(".smily");
    console.log(s , no);
    switch(no){
        case 1:
            s.innerText = '🤣'
            break;
        case 2:
            s.innerText = '😂'
            break
        case 3:
            s.innerText = '😆'
            break;
        case 4:
            s.innerText = '😃';
            break;
        case 5:
            s.innerText = '😀';
            break
        case 6:
            s.innerText = '🫡';
            break;
    }
}


dice.addEventListener("click", async (e) => {
    if(first_time == 0){
        bg_sound.play();
        first_time = 1;
    }
    dice.style.animation = "none";
    void dice.offsetWidth;
    dice.style.animation = "dice 2s";

    dice.disabled = true;
    dice.classList.add("opacity");
    let no = await get_no();
    // setSmaliy(no);


    setimg(no);
    if (f == 0 && idx1 + no <= 100) {
        await for_move(idx1,no,c1);

        idx1 += no;
        for (let i of divs) {
            if (i.innerText == idx1) {
                i.appendChild(c1);
            }
        }

        s = isSnack(idx1);
        l = isLeador(idx1);

        if (s != -1) {
            idx1 = s;

            for (let i of divs) {
                if (i.innerText == idx1) {
                    await move(idx , c1);
                    i.appendChild(c1);
                }
            }
        }
        else if (l != -1) {
            idx1 = l;

            for (let i of divs) {
                if (i.innerText == idx1) {
                    await move(idx , c1);
                    i.appendChild(c1);
                }
            }
        } else if (isWin(idx1)) {
            await move(idx1,c1);
            idx1 = 1;
            idx2 = 1;
            
            for (let i of divs) {
                if (i.innerText == idx1) {
                    i.appendChild(c1);
                }
            }
            
            for (let i of divs) {
                if (i.innerText == idx2) {
                    i.appendChild(c2);
                }
            }
            alert("Red is win!");
        }
        if(no != 6){
            f = 1;
            h2.innerHTML = "now <span class = 'yellow'>Yellow</span>'s turn";
        }else{
            f = 0;
        }
    }
    else if(f == 1 && no + idx2 <= 100) {
        await for_move(idx2 , no , c2);
        idx2 += no;
        for (let i of divs) {
            if (i.innerText == idx2) {
                i.appendChild(c2);
            }
        }

        s = isSnack(idx2);
        l = isLeador(idx2);

        if (s != -1) {
            idx2 = s;

            for (let i of divs) {
                if (i.innerText == idx2) {
                    await move(idx , c2);
                    i.appendChild(c2);
                }
            }
        } else if (l != -1) {
            idx2 = l;
            for (let i of divs) {
                if (i.innerText == idx2) {
                    await move(idx , c2);
                    i.appendChild(c2);
                }
            }
        }
        else if (isWin(idx2)) {
            await move(idx1,c1);
            idx1 = 1;
            idx2 = 1;
            
            for (let i of divs) {
                if (i.innerText == idx1) {
                    i.appendChild(c1);
                }
            }
            
            for (let i of divs) {
                if (i.innerText == idx2) {
                    i.appendChild(c2);
                }
            }
            alert("yellow is win!");

        }

        if(no != 6){
            f = 0;
            h2.innerHTML = "now <span class = 'red'>red</span>'s turn";
        }
    }
    else{
        if(f == 0){
            f = 1;
        }else{
            f = 0;
        }
    }

    dice.disabled = false;
    dice.classList.remove("opacity");
    console.log(no);
})
