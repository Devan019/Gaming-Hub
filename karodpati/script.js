
let defult_timer = 10;
let roundNo = 1;

let ansArr = []
const player1 = document.querySelector(".player-1")
const player2 = document.querySelector(".player-2")

const p1_score = player1.querySelector(".point")
const p2_score = player2.querySelector(".point")
const round = document.querySelector(".roundNo")
round.innerText = roundNo

const ansdiv = document.querySelector(".ans-div");
const ansbtn = ansdiv.querySelector("button")
const ansinput = ansdiv.querySelector("input")
const putque = document.querySelector(".quetions")

const check = document.querySelector(".check")

async function que_ans() {
  const api = await fetch("./ans.json");
  const data = await api.json();
  return data;
}

async function getQuetions() {
  const quetions = await que_ans()
    .then((data) => {
      let que = [];
      for (const element of data) {
        que.push(element.que);
      }
      return que;
    })

  return quetions;
}

function isAvalable(answer) {
  for (const ans of ansArr) {
    if (ans == answer) return true;
  }
  return false;
}

async function getAnswers() {
  const answers = await que_ans()
    .then((data) => {
      let que = [];
      let i = 0;
      for (const element of data) {
        que.push(element.points);
      }
      return que;
    })

  return answers;
}

function checkAns(allAnswers) {
  console.log(allAnswers)
  let flag = false;

  allAnswers[roundNo - 1].forEach(element => {
    if (element.ans.toLowerCase() == ansinput.value.toLowerCase() && !isAvalable(ansinput.value.toLowerCase())) {
      ansArr.push(element.ans)
      ansinput.value = ""
      check.innerText = "✔️"
      p1_score.innerText = (Number)(p1_score.innerText) + (Number)(element.point)
      flag = true;
    }
  });

  if (flag == false) {
    ansinput.value = ""
    check.innerText = "❌"
  }
}

async function main() {
  const allQuetions = await getQuetions();
  const allAnswers = await getAnswers();

  ansdiv.classList.remove("hidden")


  putque.querySelector("h3").innerText = allQuetions[0]

  let timer = putque.querySelector(".timer")
  timer.innerText = "time :- ";
  timer.innerText += "00 : " + defult_timer;

  const timer_id = setInterval(() => {
    defult_timer--;
    timer.innerText = "time :- " + "00 : " + defult_timer
    if (defult_timer == 0) {
      timer.innerText = ""
      defult_timer = 15;
      roundNo++;
      round.innerText = roundNo
      clearInterval(timer_id)
    }
  }, 1000);

  ansbtn.addEventListener("click", (evt) => {
    check.classList.remove("hidden")
    checkAns(allAnswers)
  })


}



function startgame() {
  console.log("start game")
  main()
}


document.querySelector(".start-btn").addEventListener("click", (evt) => {
  startgame()
  evt.target.classList.add("hidden")
}
)

