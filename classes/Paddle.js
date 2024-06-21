class Paddle {
  size = { width: PADDLE_WIDTH, height: PADDLE_HEIGHT };
  x = CANVAS_WIDTH / 2 - this.size.width / 2;
  y = CANVAS_HEIGHT - 100;
  color = PADDLE_COLOR;
  speed = PADDLE_SPEED;
  prevX = this.x;

  constructor(ctx) {
    this.ctx = ctx;
  }

  moveRight() {
    if (this.x + this.size.width >= CANVAS_WIDTH) return;
    this.prevX = this.x;
    this.x += PADDLE_SPEED;
  }

  moveLeft() {
    if (this.x <= 0) return;
    this.prevX = this.x;
    this.x -= PADDLE_SPEED;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.size.width, this.size.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
