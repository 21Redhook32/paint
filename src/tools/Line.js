import Tool from "./Tool"

export default class Line extends Tool {
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
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      this.endX = e.pageX - e.target.offsetLeft
      this.endY = e.pageY - e.target.offsetTop
      this.draw()
    }
  }

  draw() {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.endX,  this.endY)
      this.ctx.stroke()
    }

  }
}