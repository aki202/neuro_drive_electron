class Text {
  constructor(globalManager, options = {}) {
    this.canvas  = globalManager.canvas
    this.options = options
  }

  draw(text, x, y, size) {
    this.ctx              = canvas.getContext('2d')
    this.ctx.fillStyle    = this.options.style || '#003366'
    this.ctx.textAlign    = this.options.textAlign || 'right'
    this.ctx.textBaseline = this.options.textBaseline || 'top'
    this.ctx.font = `${size}px 'Arial'`
    this.ctx.fillText(text, x, y, this.canvas.width)
  }
}

module.exports = Text
