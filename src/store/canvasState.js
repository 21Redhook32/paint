import {makeAutoObservable} from "mobx";

class CanvasState {
  canvas = null
  undoList = []
  redoList = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  undo() {
    this.saveAction(this.undoList, this.redoList)
  }

  redo() {
    this.saveAction(this.redoList, this.undoList)
  }

  saveAction(popTo, pushTo){
    if(popTo.length > 0){
      const ctx = this.canvas.getContext('2d'),
        dataUrl = popTo.pop(),
        img = new Image()
      pushTo.push(this.canvas.toDataURL())
      img.src = dataUrl
      img.onload = () => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }

    }
  }
}

export default new CanvasState()
