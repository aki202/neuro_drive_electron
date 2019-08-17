const LANES = {
  left:  1,
  right: 2
}

class Car {
  constructor(globalManager) {
    this.gm          = globalManager
    this.ctx         = globalManager.canvas.getContext('2d')
    this.loaded      = false
    this.lane        = LANES.left
    this.chaningLane = false
    this.crushing    = false

    this.img = new Image()
    this.img.onload = () => {
      this.loaded = true
      this.width  = this.gm.canvas.width/6
      const ratio = this.img.width / this.width
      this.height = this.img.height / ratio
    }
    this.img.src = path.resolve('src/images/red_car.png')

    this.gm.eegReceiver.on('on_blink', data => {
      if (data.blinkStrength < 40) return
      console.log(`blink: strength=${data.blinkStrength}`)
      this.beginChanginLane()
    })

    window.addEventListener('keyup', e => {
      if (e.key === 'ArrowRight') this.beginChanginLane()
      if (e.key === 'ArrowLeft')  this.beginChanginLane()
    }, true)

    this.leftLaneX  = this.gm.canvas.width / 2 - this.gm.canvas.width/3 / 2
    this.rightLaneX = this.leftLaneX + 100
    this.x          = this.leftLaneX
    this.y          = this.gm.canvas.height*0.75
  }

  beginChanginLane() {
    if (this.chaningLane) return
    this.chaningLane = true
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

    if (this.lane === LANES.left)  return this.x += 5
    if (this.lane === LANES.right) return this.x -= 5
  }

  rect() {
    const margin = 15
    return {
      lt: [this.x+margin,            this.y+margin],
      rt: [this.x+this.width-margin, this.y+margin],
      lb: [this.x+margin,            this.y+this.height-margin],
      rb: [this.x+this.width-margin, this.y+this.height-margin],
    }
  }

  draw() {
    if (!this.loaded) return

    this.updateX()

    if (this.crushing) this.ctx.globalAlpha = 0.4
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    this.ctx.globalAlpha = 1.0
  }
}

module.exports = Car
