let gameStart = false;
let gamePause = false;
let game = null;

const renderStars = () => {
  const stars = document.getElementById("stars");
  stars.innerHTML = [...Array(100)]
    .map((__) => {
      return `<div
        class="star"
        style="
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 1.5}s;
    "
      ></div>`;
    })
    .join("");
};

const canvas = document.getElementById("gameGui");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const context = canvas.getContext("2d");
const pauseBtn = document.getElementById("pauseBtn");
const startBtn = document.getElementById("startBtn");
const resumeBtn = document.getElementById("resumeBtn");
const gameModal = document.getElementById("gameModal");
const gameModalMessage = document.getElementById("gameModalMessage");

const onClickPause = () => {
  if (!gameStart) return;
  gameModalMessage.innerText = "pause";
  gamePause = true;
  setGameStart(false);
  game.pauseGame();
};
pauseBtn.addEventListener("click", onClickPause);

const onClickStart = () => {
  if (gameStart) return;
  setGameStart(true);
  game = new Game(context, (status) => {
    setGameStart(false);
    if (status.clear) {
      gameModalMessage.innerText = "win!";
      startBtn.innerText = "again?";
    } else {
      gameModalMessage.innerText = "lose...";
      startBtn.innerText = "restart";
    }
  });
  game.run();
};
startBtn.addEventListener("click", onClickStart);

const onClickResume = () => {
  if (gameStart) return;
  if (!gamePause) return;
  gamePause = false;
  setGameStart(true);
  game.resumeGame();
};
resumeBtn.addEventListener("click", onClickResume);

const setGameStart = (gameStartState) => {
  gameStart = gameStartState;
  renderModal();
  renderPauseBtn();
  renderStartBtn();
};

const renderModal = () => {
  if (!gameStart) {
    gameModal.style.visibility = "visible";
  } else {
    gameModal.style.visibility = "hidden";
  }
};

const renderPauseBtn = () => {
  if (gamePause) {
    resumeBtn.style.display = "block";
  } else {
    resumeBtn.style.display = "none";
  }
};

const renderStartBtn = () => {
  if (gamePause) {
    startBtn.style.display = "none";
  } else {
    startBtn.style.display = "block";
  }
};

const render = () => {
  renderModal();
  renderStartBtn();
  renderPauseBtn();
};

renderStars();
render();
