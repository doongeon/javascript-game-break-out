class Controller {
  rightPressed = false;
  leftPressed = false;
  spacePressed = false;

  constructor() {
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    document.addEventListener("keydown", this.keyDownHandler);
    document.addEventListener("keyup", this.keyUpHandler);
  }

  keyDownHandler(e) {
    if (e.code === "ArrowUp") {
      e.preventDefault();
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
    }
    if (e.code === "ArrowRight") {
      e.preventDefault();
      this.rightPressed = true;
    }
    if (e.code === "ArrowLeft") {
      e.preventDefault();
      this.leftPressed = true;
    }
    if (e.code === "Space") {
      e.preventDefault();
      this.spacePressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.code === "ArrowRight") {
      this.rightPressed = false;
    }
    if (e.code === "ArrowLeft") {
      this.leftPressed = false;
    }
    if (e.code === "Space") {
      this.spacePressed = false;
    }
  }

  free() {
    document.removeEventListener("keydown", this.keyDownHandler);
    document.removeEventListener("keyup", this.keyUpHandler);
  }
}
