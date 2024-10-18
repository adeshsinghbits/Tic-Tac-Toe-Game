let button = document.querySelectorAll(".button-option");
let popup = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let message = document.getElementById("message");
let playerChance = document.querySelector(".player");
let xPlayerScore = document.querySelector(".scorexplayer");
let oPlayerScore = document.querySelector(".scoreoplayer");
let scoreinfopopup = document.querySelector(".score-info");
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;
let score = {
  xPLayer: 0,
  oPlayer: 0
}

const savedScore = JSON.parse(localStorage.getItem('score'));
if (savedScore) {
    score = savedScore;
}

const disableButtons = () => {
  button.forEach((element) => (element.disabled = true));
  
  popup.classList.remove("hide");
};

const enableButtons = () => {
  button.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });

  popup.classList.add("hide");
};

const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    message.innerHTML = "X player Win";
 
  } else {
    message.innerHTML = "O player  Win";
  }
  scoreRecord(message);
};

const drawFunction = () => {
  disableButtons();
  message.innerHTML = "It's a Draw";
};

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

const winChecker = () => {
  
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      button[i[0]].innerText,
      button[i[1]].innerText,
      button[i[2]].innerText,
    ];
   
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        
        winFunction(element1);
      }
    }
  }
}; 

button.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
       playerChance.innerText = 'O player Move' 
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      playerChance.innerText = 'X player Move' 
      element.innerText = "O";
      element.disabled = true;
    }
    
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    
    winChecker();
  });
});

const scoreRecord = (message) => {
  if (message.innerText === "X player Win") {
      score.xPLayer += 1;

  } else if (message.innerText === "O player Win") {
    score.oPlayer += 1;

  }
  // console.log(score)
  localStorage.setItem("score",JSON.stringify(score))

  xPlayerScore.innerText = `${score.xPLayer}`;
  oPlayerScore.innerText = `${score.oPlayer}`;
 
}


const scoreDisplay = () => {
  xPlayerScore.innerHTML = `Win: ${score.xPLayer} <br> Lose: ${score.oPlayer} `;
  oPlayerScore.innerHTML = `Win: ${score.oPlayer}  <br> Lose: ${score.xPLayer}`;

  scoreinfopopup.classList.add("scorehide");
}
const scoreDisplayhide = () => {
  scoreinfopopup.classList.remove("scorehide");
}
const resetscore = () => {
  score.oPlayer = 0;
  score.xPLayer = 0;
  localStorage.removeItem("score")
}








window.onload = enableButtons;