class Brick {
  cracked = false;

  constructor(ctx, position, size, color) {
    this.ctx = ctx;
    this.x = position.x;
    this.y = position.y;
    this.size = size;
    this.color = color;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + BRICK_BORDER_RADIUS, this.y); // 좌상단
    this.ctx.lineTo(this.x + this.size.width - BRICK_BORDER_RADIUS, this.y); // 우상단
    this.ctx.quadraticCurveTo(
      this.x + this.size.width,
      this.y,
      this.x + this.size.width,
      this.y + BRICK_BORDER_RADIUS
    ); // 우상단 모서리
    this.ctx.lineTo(
      this.x + this.size.width,
      this.y + this.size.height - BRICK_BORDER_RADIUS
    ); // 우하단
    this.ctx.quadraticCurveTo(
      this.x + this.size.width,
      this.y + this.size.height,
      this.x + this.size.width - BRICK_BORDER_RADIUS,
      this.y + this.size.height
    ); // 우하단 모서리
    this.ctx.lineTo(this.x + BRICK_BORDER_RADIUS, this.y + this.size.height); // 좌하단
    this.ctx.quadraticCurveTo(
      this.x,
      this.y + this.size.height,
      this.x,
      this.y + this.size.height - BRICK_BORDER_RADIUS
    ); // 좌하단 모서리
    this.ctx.lineTo(this.x, this.y + BRICK_BORDER_RADIUS); // 좌상단
    this.ctx.quadraticCurveTo(
      this.x,
      this.y,
      this.x + BRICK_BORDER_RADIUS,
      this.y
    ); // 좌상단 모서리

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
