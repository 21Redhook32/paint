import Tool from "./Brush";
import toolState from "../store/toolState";

export default class PaintBucket extends Tool {

  constructor(canvas) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
  }

  mouseDownHandler(e) {
    const x = e.pageX - e.target.offsetLeft,
          y = e.pageY - e.target.offsetTop
    this.flood_fill(x, y, this.color_to_rgba(toolState.color))

  }

  flood_fill( x, y, color ) {
    let pixel_stack = [{x:x, y:y}] ;
    let pixels = this.ctx.getImageData( 0, 0, this.canvas.width, this.canvas.height )
    let linear_cords = ( y * this.canvas.width + x ) * 4
    let original_color = {r:pixels.data[linear_cords],
      g:pixels.data[linear_cords+1],
      b:pixels.data[linear_cords+2],
      a:pixels.data[linear_cords+3]}

    while( pixel_stack.length>0 ) {
      let new_pixel = pixel_stack.shift()
      x = new_pixel.x
      y = new_pixel.y


      linear_cords = ( y * this.canvas.width + x ) * 4
      while( y-->=0 &&
      (pixels.data[linear_cords]===original_color.r &&
        pixels.data[linear_cords+1]===original_color.g &&
        pixels.data[linear_cords+2]===original_color.b &&
        pixels.data[linear_cords+3]===original_color.a) ) {
        linear_cords -= this.canvas.width * 4
      }
      linear_cords += this.canvas.width * 4
      y++

      let reached_left = false
      let reached_right = false
      while( y++<this.canvas.height &&
      (pixels.data[linear_cords]===original_color.r &&
        pixels.data[linear_cords+1]===original_color.g &&
        pixels.data[linear_cords+2]===original_color.b &&
        pixels.data[linear_cords+3]===original_color.a) ) {
        pixels.data[linear_cords]   = color.r
        pixels.data[linear_cords+1] = color.g
        pixels.data[linear_cords+2] = color.b
        pixels.data[linear_cords+3] = color.a

        if( x>0 ) {
          if( pixels.data[linear_cords-4]===original_color.r &&
            pixels.data[linear_cords-4+1]===original_color.g &&
            pixels.data[linear_cords-4+2]===original_color.b &&
            pixels.data[linear_cords-4+3]===original_color.a ) {
            if( !reached_left ) {
              pixel_stack.push( {x:x-1, y:y} )
              reached_left = true
            }
          } else if( reached_left ) {
            reached_left = false
          }
        }

        if( x<this.canvas.width-1 ) {
          if( pixels.data[linear_cords+4]===original_color.r &&
            pixels.data[linear_cords+4+1]===original_color.g &&
            pixels.data[linear_cords+4+2]===original_color.b &&
            pixels.data[linear_cords+4+3]===original_color.a ) {
            if( !reached_right ) {
              pixel_stack.push( {x:x+1,y:y} )
              reached_right = true
            }
          } else if( reached_right ) {
            reached_right = false
          }
        }

        linear_cords += this.canvas.width * 4
      }
    }
    this.ctx.putImageData( pixels, 0, 0 )
  }

  color_to_rgba( color ) {
    if( color[0]==="#" ) {
      color = color.replace( "#", "" )
      let bigint = parseInt(color, 16)
      let r = (bigint >> 16) & 255
      let g = (bigint >> 8) & 255
      let b = bigint & 255
      return {r:r,
        g:g,
        b:b,
        a:255}
    } else if( color.indexOf("rgba(")===0 ) {
      color = color.replace( "rgba(", "" ).replace( " ", "" ).replace( ")", "" ).split( "," )
      return {r:color[0],
        g:color[1],
        b:color[2],
        a:color[3]*255}
    } else {
      return {r:0,
        g:0,
        b:0,
        a:0}
    }
  }




}