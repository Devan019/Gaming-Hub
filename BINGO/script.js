
let comp = [[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0],
[0, 0, 0, 0, 0]];
let user = [[], [], [], [], []];
let user_win = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];
let comp_win = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24], [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24], [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];

// let pc_tick = [[] , [] , [] , [] , []];
// let user_tick = [[] , [] , [] , [] , []];

let choose = document.querySelectorAll(".choose");
let com = document.querySelector(".comp");
let forpc = document.querySelectorAll(".forpc");
let head = document.querySelector("#startTickMark");

let count = 1;
function random() {
    let x = Math.round(Math.random() * 25);
    return x;
}
//check  where random no is repeat or not
function isCheck(array, no) {
    for (let i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            if (array[i][j] == no) {
                return false;
            }
        }
    }
    return true;

}

let x = 0, i = 0, j = 0, c = 0, temp = 1;
while (temp) {
    let no = random();
    while (true) {
        if (isCheck(comp, no)) {
            break;
        }
        else {
            no = random();
        }
    }
    x = 0;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            if (comp[i][j] == 0) {
                comp[i][j] = no;
                x = 1;
                break;
            }
        }
        if (x == 1) {
            break;
        }
    }
    c = 0;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            if (comp[i][j] == 0) {
                c++;
            }
        }
    }

    if (c == 0) {
        temp = 0;

    }



}
let bingo = document.querySelectorAll(".bingo");
let pcbingo = document.querySelectorAll(".pcbingo");
//check who is win:
function isWin() {
    let check_pc = 0, check_user = 0, str = "";
    let ans = "";
    let flag = false;
    for (let i = 0; i < 5; i++) {
        if (bingo[i].classList.contains("over")) {
            check_user++;
        }
        if (pcbingo[i].classList.contains("over")) {
            check_pc++;
        }
    }
    console.log(check_pc, " ", check_user)
    if (check_pc == 5 || check_user == 5) {
        if (check_pc > check_user) {
            str = "pc is win!";

        } else if (check_pc < check_user) {
            str = "user is win!";
        } else {
            str = "match is tie!";
        }
        flag = true;
        head.innerText = str + "pls click on reset button!";
        ans = head.innerText;
        alert(ans);
        reset();
    }

   

}
//check bingo or not

let b = 0, bb = 0;
let p = 0, pp = 0;
function BINGO() {
    b = 0;
    p = 0;
    for (let i = 0; i < 12; i++) {
        bb = 0;
        pp = 0;
        for (let j = 0; j < 5; j++) {
            if (choose[(user_win[i][j])].classList.contains("over")) {
                bb++;
            }
            if (forpc[(comp_win[i][j])].classList.contains("over")) {
                pp++;
            }
        }
        if (b == 5 || p == 5) {
            isWin();
            break;
        }
        if (bb == 5) {
            bingo[b].classList.add("over");
            b++;
        }
        if (pp == 5) {
            pcbingo[p].classList.add("over");
            p++;
        }
    }

    isWin();
}

//display comp grid

let ll = 0;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        forpc[ll].innerText = comp[i][j];
        ll++;
    }
}


// let bingo = document.querySelectorAll(".bingo");
// bingo.disabled = true;

console.log(bingo.disabled);


//function for changing hading
function changHead() {
    head.innerText = `Tick to start your BINGO`;
}


//tick mark for user
function for_user(index) {
    let value = forpc[index].innerText;

    console.log(value);
    for (let i = 0; i < 25; i++) {
        if (value == choose[i].innerText) {
            choose[i].classList.add("over");
            break;
        }
    }




}
//pc turn
function pc_turn(index) {
    //for 0 to 4
    // if (index >= 0 && index <= 4) 
    {
        if (index != 4 && index != 9 && index != 14 && index != 19 && index != 24) {
            ++index;
            while (true) {
                if (forpc[index].classList.contains("over")) {
                    ++index;
                    if (index == 25) {
                        while (true) {
                            index--;
                            if (forpc[index].classList.contains("over")) {
                                index--;
                            } else {
                                break;
                            }
                        }
                    }

                }
                else {
                    forpc[index].classList.add("over");
                    for_user(index);
                    break;
                }
            }
        }
        else {
            --index;
            let c = 0;
            while (true) {
                if (index == 0) {
                    index = c + 4;
                }
                if (forpc[index].classList.contains("over")) {
                    --index;
                }
                else {
                    forpc[index].classList.add("over");
                    for_user(index);
                    break;
                }
            }

        }
    }

}
//pc tic_mark
function for_pc(event) {
    let x = event.target.innerText;
    for (let i = 0; i < 25; i++) {
        if (x == forpc[i].innerText) {
            forpc[i].classList.add("over");
            pc_turn(i);
            break;
        }
    }
}
function make_user_array() {
    let len = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            user[i].push(choose[len++].innerText);
        }

    }
    console.log(user);
}
function st(event) {
    // console.log("hi");
    //user turn
    event.target.classList.add("over");
    for_pc(event);
    //comp turn

    //check bingo or not
    BINGO();
}


//start game
function startGame() {
    choose.forEach((e) => {
        e.addEventListener("click", st);
    });
}

//for user bydefault grid
let bydefault = document.querySelector(".default");
bydefault.addEventListener("click", (e) => {
    changHead();
    for (let i = 0; i < 25; i++) {
        choose[i].innerText = (i + 1);
    }
    count = 26;
    startGame();
}
)

//for user fid tic_mark
let ii = 0, jj = 0, l = 0;
function handleClick(event) {
    // console.log(event.target.getBoundingClientRect().y);
    if (count <= 25) {
        event.target.innerText = count;
        count++;
        if (count == 26) {
            changHead();
            startGame();
            console.log(user_win);
        }
        event.target.removeEventListener("click", handleClick);
    }
}

choose.forEach((e) => {
    e.addEventListener("click", handleClick);

});


//for show grid of pc
com.classList.add("display");
let show = document.querySelector('.pc');
ii = 0;
jj = 0;
let flag = true;
show.addEventListener("click", (e) => {
    if (flag == true) {
        com.classList.remove("display");
        flag = false;
    }
    else {
        com.classList.add("display");
        flag = true;
    }
}
)

// console.log(forpc);

//click on reset button
function reset_grid(){
    comp = [[0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]];
    user = [[], [], [], [], []];

    // Clear the displayed grids
    choose.forEach((cell) => {
        cell.innerText = "";
        cell.classList.remove("over");
    });
    forpc.forEach((cell) => {
        cell.innerText = "";
        cell.classList.remove("over");
    });

    // Reset the BINGO markers
    bingo.forEach((marker) => {
        marker.classList.remove("over");
    });
    pcbingo.forEach((marker) => {
        marker.classList.remove("over");
    });

    // Reinitialize necessary variables
    count = 1;
    head.innerText = "Click on the grid to start your BINGO";

    // Remove all event listeners
    choose.forEach((e) => {
        e.removeEventListener("click", st);
        e.removeEventListener("click", handleClick);
        e.addEventListener("click", handleClick);
    });

    // Reinitialize the computer grid
    temp = 1;
    while (temp) {
        let no = random();
        while (true) {
            if (isCheck(comp, no)) {
                break;
            } else {
                no = random();
            }
        }
        x = 0;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (comp[i][j] == 0) {
                    comp[i][j] = no;
                    x = 1;
                    break;
                }
            }
            if (x == 1) {
                break;
            }
        }
        c = 0;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (comp[i][j] == 0) {
                    c++;
                }
            }
        }

        if (c == 0) {
            temp = 0;
        }
    }

    // Display the new computer grid
    ll = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            forpc[ll].innerText = comp[i][j];
            ll++;
        }
    }

    // Disable the BINGO markers
    bingo.disabled = true;
}
let reset = document.querySelector(".reset");

reset.addEventListener("click", (e) => {
    reset_grid();
}
)