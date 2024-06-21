import { Game } from "./classes/Game";

// 예제 코드: 게임을 시작하기 위한 초기 설정
const canvas = document.getElementById("gameGui");
const ctx = canvas.getContext("2d");

const game = new Game(ctx, (status) => {
  if (status.clear) {
    console.log("You win!");
  } else if (status.life < 1) {
    console.log("Game over");
  }
});

document.getElementById("startButton").addEventListener("click", () => {
  game.run();
});

document.getElementById("pauseButton").addEventListener("click", () => {
  game.pauseGame();
});

document.getElementById("resumeButton").addEventListener("click", () => {
  game.resumeGame();
});

game.run();
