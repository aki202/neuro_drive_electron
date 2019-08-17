class Road {
  constructor(globalManager) {
    this.canvas      = globalManager.canvas
    this.ctx         = globalManager.canvas.getContext('2d')
    this.loaded      = false
    this.speedSource = globalManager.speedSource

    this.img = new Image()
    this.img.onload = () => {
      this.width  = this.img.width
      this.height = this.img.height
      this.loaded = true
      this.y1     = -this.canvas.height
      this.y2     = 0
    }
    this.img.src = 'img/road.png'
  }

  draw() {
    if (!this.loaded) return

    const speed = this.speedSource.speedToDraw()

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
