class Road {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.loaded = false

    this.img = new Image()
    this.img.onload = () => {
      this.width  = this.img.width
      this.height = this.img.height
      this.loaded = true
      this.y1 = -this.canvas.height
      this.y2 = 0
    }
    this.img.src = 'img/road.png'
  }

  draw(speed) {
    if (!this.loaded) return

    const x = this.canvas.width / 2 - this.canvas.width/3 / 2
    this.ctx.drawImage(this.img, x, this.y1, this.canvas.width/3, this.canvas.height)
    this.ctx.drawImage(this.img, x, this.y2, this.canvas.width/3, this.canvas.height)
    this.y1 += speed
    this.y2 += speed
    if (this.y1 > this.canvas.height) this.y1 = -this.canvas.height + speed
    if (this.y2 > this.canvas.height) this.y2 = -this.canvas.height + speed
  }
}

module.exports = Road
