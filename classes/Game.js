class Game {
  controller = new Controller();
  status = {
    start: false,
    round: 1,
    life: 3,
    clear: false,
  };

  constructor(ctx, gameCallback) {
    this.ctx = ctx;
    this.stage = new Stage(this.ctx, MAPS[1]);
    this.paddle = new Paddle(ctx);
    this.ball = new Ball(ctx, this.paddle);
    this.collisionDetector = new CollisionDetector(
      this.ball,
      this.paddle,
      this.stage
    );
    this.gameCallback = gameCallback;
  }

  run() {
    this.status.start = true;
    this.status.clear = false;
    this.resetGame();
    this.writeRound();
    this.writeLife();
    this.writeLeftBricks();
    this.play();
  }

  play() {
    const interval = setInterval(() => {
      if (!this.status.start) return;

      this.draw();
      const collision = this.collisionDetector.detect();

      if (this.controller.leftPressed) this.moveLeft();
      if (this.controller.rightPressed) this.moveRight();
      if (this.controller.spacePressed && this.ball.status.fixed)
        this.shootBall();
      if (collision.falldown) this.discountLife();
      if (collision.brick) this.writeLeftBricks();
      if (this.status.round === FINAL_ROUND && this.getLeftBricks() < 1)
        this.winGame();
      if (this.getLeftBricks() < 1) this.nextStage();
      if (this.status.life < 1) this.loseGame();

      console.log("frame");
    }, 16);

    this.interval = interval;
  }

  draw() {
    this.clearCanvas();
    this.ball.draw();
    this.paddle.draw();
    this.stage.drawStage();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  moveLeft() {
    if (!this.status.start) return;
    this.paddle.moveLeft();
  }

  moveRight() {
    if (!this.status.start) return;
    this.paddle.moveRight();
  }

  shootBall() {
    if (!this.status.start) return;
    this.ball.shoot();
  }

  getLeftBricks() {
    return this.stage.getLeftBricks();
  }

  resetGame() {
    this.status.life = 3;
    this.status.round = 1;
  }

  pauseGame() {
    this.status.start = false;
    clearInterval(this.interval);
  }

  resumeGame() {
    this.status.start = true;
    this.play();
  }

  winGame() {
    this.status.clear = true;
    clearInterval(this.interval);
    this.gameCallback(this.status);
  }

  loseGame() {
    this.status.start = false;
    clearInterval(this.interval);
    this.gameCallback(this.status);
  }

  nextStage() {
    if (!this.status.start) return;
    if (this.status.round === FINAL_ROUND) return;

    this.stage.drawStage(); // erase last brick
    this.ball.stop();
    this.status.start = false; // to avoid running fram on background
    this.ball.fixOnPaddle();
    this.status.round += 1;
    this.stage = new Stage(this.ctx, MAPS[this.status.round]);
    this.collisionDetector = new CollisionDetector(
      this.ball,
      this.paddle,
      this.stage
    );

    // start next stage after 500ms
    setTimeout(() => {
      this.status.start = true;
      this.writeRound();
      this.writeLeftBricks();
    }, 500);
  }

  discountLife() {
    this.status.life -= 1;
    this.writeLife();
  }

  writeRound() {
    const roundWindow = document.getElementById("round");
    if (!roundWindow) return;

    roundWindow.innerText = `round: ${this.status.round}`;
  }

  writeLife() {
    const lifeWindow = document.getElementById("life");
    if (!lifeWindow) return;

    lifeWindow.innerText = "life: " + this.status.life;
  }

  writeLeftBricks() {
    const leftBricksWindow = document.getElementById("bricks");
    if (!leftBricksWindow) return;

    leftBricksWindow.innerText = "bricks: " + this.getLeftBricks();
  }

  cleanup() {
    this.controller.free();
    clearInterval(this.interval);
  }
}
