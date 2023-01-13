import toolState from "../store/toolState";

export default class Tool{
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.ctx.strokeStyle = toolState.color
    this.ctx.lineWidth = toolState.lineWidth
    this.ctx.setLineDash([])
    this.destroyEvents()
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
  }

  set strokeColor(color) {
    this.ctx.strokeStyle = color
  }

  set lineWidth(width) {
    this.ctx.lineWidth = width
  }

  destroyEvents() {
    this.canvas.onMouseMove = null
    this.canvas.onMouseDown = null
    this.canvas.onMouseUp = null
  }
}