class Car {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.loaded = false

    this.img = new Image()
    this.img.onload = () => {
      this.width  = this.img.width
      this.height = this.img.height
      this.loaded = true
    }
    this.img.src = 'img/red_car.png'
  }

  draw() {
    if (!this.loaded) return

    const x = this.canvas.width / 2 - this.canvas.width/3 / 2
    const width = this.canvas.width/6
    const ratio = width / this.width
    const height = this.height * ratio
    this.ctx.drawImage(this.img, x, this.canvas.height*0.7, width, height)
  }
}

module.exports = Car
