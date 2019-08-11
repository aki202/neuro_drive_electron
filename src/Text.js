class Text {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  draw(text, x, y, size) {
    this.ctx.fillStyle = '#003366'
    this.ctx.font = `${size}px 'Arial'`
    this.ctx.textAlign = 'left'
    this.ctx.textBaseline = 'top'
    this.ctx.fillText(text, x, y, this.canvas.width)
  }
}

module.exports = Text
