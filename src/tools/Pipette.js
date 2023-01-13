import Tool from "./Tool";
import toolState from "../store/toolState";

export default class Pipette extends Tool {
  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
  }

  mouseDownHandler(e) {
    const x = e.pageX - e.target.offsetLeft,
          y = e.pageY - e.target.offsetTop,
          pxData = this.ctx.getImageData(x,y,1,1),
          color = "#" + ((1 << 24) + (pxData.data[0] << 16) + (pxData.data[1] << 8) + pxData.data[2]).toString(16).slice(1)
    toolState.setStrokeColor(color)
  }

}