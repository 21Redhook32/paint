import React, {useState} from 'react';
import '../styles/toolbar.scss'
import toolState from "../store/toolState";
import canvasState from "../store/canvasState"
import Brush from "../tools/Brush";
import Rect from "../tools/Rect";
import Oval from "../tools/Oval";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Pipette from "../tools/Pipette";
import {observer} from "mobx-react-lite";
import Triangle from "../tools/Triangle";
import PaintBucket from "../tools/PaintBucket";

const Toolbar = observer(() => {

  const [currentTool, setCurrentTool] = useState('brush')

  const setTool = (tool, name) => {
    setCurrentTool(name)
    toolState.setTool(tool)
  }

  const changeColor = e => {
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
  }

  const downloadImage = () => {
      const link = document.createElement('a');
      link.download = 'draw.png';
      link.href = canvasState.canvas.toDataURL("image/jpeg")
      link.click();
  }
  
  const clearCanvas = () => {
    canvasState.pushToUndo(canvasState.canvas.toDataURL())
    canvasState.setCanvas(canvasState.canvas)
  }

  return (
    <div className="toolbar">

      <div className="toolbar__panel panel">
        <div className="panel__buttons buttons">
          <button
            className="buttons__btn btn btn--save"
            title="сохранить"
            onClick={() => downloadImage()}/>
          <button
            className="buttons__btn btn btn--trash"
            title="очистить"
            onClick={() => clearCanvas()}/>
          <button
            className="buttons__btn btn btn--undo"
            title="назад"
            onClick={() => canvasState.undo()}/>
          <button
            className="buttons__btn btn btn--redo"
            title="вперед"
            onClick={() => canvasState.redo()}/>
        </div>
        <div className="panel__label label">
          <p className="label__text">Действия</p>
        </div>
      </div>

      <div className="toolbar__panel panel">
        <div className="panel__buttons buttons">
          <button
            className={`buttons__btn btn btn--brush ${currentTool === 'brush' ? 'btn--active' : ''}`}
            title="кисть"
            onClick={() => setTool(new Brush(canvasState.canvas),'brush')}/>
          <button
            className={`buttons__btn btn btn--eraser ${currentTool === 'eraser' ? 'btn--active' : ''}`}
            title="ластик"
            onClick={() => setTool(new Eraser(canvasState.canvas),'eraser')}/>
          <button
            className={`buttons__btn btn btn--pipette ${currentTool === 'pipette' ? 'btn--active' : ''}`}
            title="пипетка"
            onClick={() => setTool(new Pipette(canvasState.canvas),'pipette')}/>

          <button
            className={`buttons__btn btn btn--paint-bucket ${currentTool === 'paintBucket' ? 'btn--active' : ''}`}
            title="пипетка"
            onClick={() => setTool(new PaintBucket(canvasState.canvas),'paintBucket')}/>
        </div>
        <div className="panel__label label">
          <p className="label__text">Инструменты</p>
        </div>
      </div>

      <div className="toolbar__panel panel">
        <div className="panel__buttons buttons">
          <button
            className={`buttons__btn btn btn--line ${currentTool === 'line' ? 'btn--active' : ''}`}
            title="линия"
            onClick={() => setTool(new Line(canvasState.canvas),'line')}/>
          <button
            className={`buttons__btn btn btn--oval ${currentTool === 'oval' ? 'btn--active' : ''}`}
            title="овал"
            onClick={() => setTool(new Oval(canvasState.canvas),'oval')}/>
          <button
            className={`buttons__btn btn btn--rect ${currentTool === 'rect' ? 'btn--active' : ''}`}
            title="прямоугольник"
            onClick={() => setTool(new Rect(canvasState.canvas),'rect')}/>
          <button
            className={`buttons__btn btn btn--triangle ${currentTool === 'triangle' ? 'btn--active' : ''}`}
            title="равнобедренный треугольник"
            onClick={() => setTool(new Triangle(canvasState.canvas),'triangle')}/>
        </div>
        <div className="panel__label label">
          <p className="label__text">Фигуры</p>
        </div>
      </div>

      <div className="toolbar__panel panel" title="размер">
        <div className="panel__select select">
          <button className="select__icon"/>
          <select defaultValue={toolState.lineWidth} onChange={e => toolState.setLineWidth(e.target.value)}>
            <option value="2">2px</option>
            <option value="4">4px</option>
            <option value="6">6px</option>
            <option value="8">8px</option>
          </select>
        </div>
        <div className="panel__label label">
          <p className="label__text">Размер</p>
        </div>
      </div>


      <div className="toolbar__panel panel" title="цвет">
        <div className="panel__colors colors">
          <input
            type="color"
            value={toolState.color}
            className="colors__picker picker"
            onChange={e => changeColor(e)}
          />
        </div>
        <div className="panel__label label">
          <p className="label__text">Цвет</p>
        </div>
      </div>


    </div>
  )
})

export default Toolbar