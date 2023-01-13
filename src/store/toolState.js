import {makeAutoObservable} from "mobx";

class ToolState {
  tool = null
  color = '#000000'
  lineWidth = 2
  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool) {
    this.tool = tool
  }
  setFillColor(color) {
    this.color = color
    this.tool.fillColor = color
  }
  setStrokeColor(color) {
    this.color = color
    this.tool.strokeColor = color
  }
  setLineWidth(width) {
    this.lineWidth = width
    this.tool.lineWidth = width
  }

}

export default new ToolState()
