class Background {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.loaded = false

    this.img = new Image()
    this.img.onload = () => {
      this.loaded = true
      this.y1 = -this.canvas.height
      this.y2 = 0
    }
    this.img.src = 'img/pattern_shibafu.png'
  }

  draw(speed) {
    if (!this.loaded) return

    this.ctx.drawImage(this.img, 0, this.y1, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(this.img, 0, this.y2, this.canvas.width, this.canvas.height)
    this.y1 += speed
    this.y2 += speed
    if (this.y1 > this.canvas.height) this.y1 = -this.canvas.height + speed
    if (this.y2 > this.canvas.height) this.y2 = -this.canvas.height + speed
  }
}

module.exports = Background
