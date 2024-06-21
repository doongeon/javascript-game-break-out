class Stage {
  bricks = [];

  constructor(ctx, map) {
    this.ctx = ctx;
    this.map = map;
    this.rowCount = this.map.length;
    this.columnCount = this.map[0].length;
    this.bricks = this.getBricks(map);
  }

  getBricks(map) {
    const bricks = [];
    for (let i = 0; i < this.rowCount; i++) {
      bricks[i] = [];
      for (let j = 0; j < this.columnCount; j++) {
        if (map[i][j] === 0) continue;

        bricks[i][j] = new Brick(
          this.ctx,
          {
            x: (CANVAS_WIDTH / this.columnCount) * j,
            y: (i * CANVAS_HEIGHT) / 3 / this.rowCount + CANVAS_HEIGHT * 0.05,
          },
          {
            width: CANVAS_WIDTH / (this.columnCount + 0.5),
            height: CANVAS_HEIGHT / 3 / (this.rowCount + 0.5),
          }, //@ts-ignore
          BRICK_COLOR[map[i][j]]
        );
      }
    }

    return bricks;
  }

  drawStage() {
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.columnCount; j++) {
        if (!this.bricks[i][j]) continue;
        if (this.bricks[i][j].cracked) continue;
        this.bricks[i][j].draw();
      }
    }
  }

  getLeftBricks() {
    let total = 0;
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.columnCount; j++) {
        if (!this.bricks[i][j]) continue;
        if (this.bricks[i][j].cracked) continue;

        total += 1;
      }
    }

    return total;
  }
}
