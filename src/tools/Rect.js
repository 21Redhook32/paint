import Tool from "./Tool"
import toolState from "../store/toolState";

export default class Rect extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft,
          currentY = e.pageY - e.target.offsetTop,
          width = currentX - this.startX,
          height = currentY - this.startY
      this.draw(this.startX,  this.startY, width, height)
    }
  }

  draw(x, y, w, h) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.strokeStyle = toolState.color
      this.ctx.stroke()
    }
  }
}