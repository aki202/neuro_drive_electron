const LANES = {
  left:  1,
  right: 2
}

class Car {
  constructor(canvas, ctx, eegReceiver) {
    this.canvas      = canvas
    this.ctx         = ctx
    this.loaded      = false
    this.eegReceiver = eegReceiver
    this.lane        = LANES.left
    this.chaningLane = false

    this.img = new Image()
    this.img.onload = () => {
      this.width  = this.img.width
      this.height = this.img.height
      this.loaded = true
    }
    this.img.src = 'img/red_car.png'

    this.eegReceiver.on('on_blink', data => {
      if (data.blinkStrength < 40) return
      if (this.chaningLane) return
      this.chaningLane = true
    })

    this.leftLaneX  = this.canvas.width / 2 - this.canvas.width/3 / 2
    this.rightLaneX = this.leftLaneX + 100
    this.x          = this.leftLaneX
  }

  updateX() {
    if (!this.chaningLane) return

    if (this.lane === LANES.right && this.x < this.leftLaneX) {
      this.x = this.leftLaneX
      this.chaningLane = false
      this.lane = LANES.left
      return
    }
    if (this.lane === LANES.left && this.x > this.rightLaneX) {
      this.x = this.rightLaneX
      this.chaningLane = false
      this.lane = LANES.right
      return
    }

    if (this.lane === LANES.left)  return this.x += 2
    if (this.lane === LANES.right) return this.x -= 2
  }

  draw() {
    if (!this.loaded) return

    this.updateX()

    const width = this.canvas.width/6
    const ratio = width / this.width
    const height = this.height * ratio
    this.ctx.drawImage(this.img, this.x, this.canvas.height*0.7, width, height)
  }
}

module.exports = Car
