class Ball {
  dx = 0;
  dy = BALL_SPEED;
  size = { radius: BALL_RADIUS };
  x = CANVAS_WIDTH / 2;
  y = CANVAS_HEIGHT / 2;
  color = BALL_COLOR;
  status = {
    fixed: true,
  };

  constructor(ctx, paddle) {
    this.ctx = ctx;
    this.paddle = paddle;
  }

  draw() {
    if (this.status.fixed) {
      this.fixOnPaddle();
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();

    this.handleWallCollision();
    this.setNextPosition();
  }

  fixOnPaddle() {
    this.status.fixed = true;
    this.stop();
    this.x = this.paddle.x + this.paddle.size.width / 2;
    this.y = this.paddle.y - this.size.radius - 10;
  }

  shoot() {
    this.status.fixed = false;
    this.dy = -BALL_SPEED;
  }

  handleWallCollision() {
    // when the ball hits left or right
    if (
      this.x + this.size.radius >= CANVAS_WIDTH ||
      this.x - this.size.radius <= 0
    ) {
      this.dx = -this.dx;
    }

    // when the ball hits the top
    if (this.y - this.size.radius <= 0) this.dy = -this.dy;
  }

  setNextPosition() {
    this.x += this.dx;
    this.y += this.dy;
  }

  stop() {
    this.dx = 0;
    this.dy = 0;
  }
}
