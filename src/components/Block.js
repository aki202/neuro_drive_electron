const POSITION = {
  left: 1,
  right: 2
}
const width    = 100
const height   = 70
const sePlayer = require(path.resolve('src/BgmPlayer.js'))

class Block {
  constructor(globalManager) {
    this.gm       = globalManager
    this.ctx      = globalManager.canvas.getContext('2d')
    this.loaded   = false
    this.position = Math.random() > 0.5 ? POSITION.left : POSITION.right
    this.se       = new Audio(path.resolve('src/explosion.wav'))

    this.img = new Image()
    this.img.onload = () => {
      this.loaded = true
      this.y = -height
    }
    this.img.src = 'img/block.png'
  }

  x() {
    const center = this.gm.canvas.width / 2 - width / 2
    if (this.position === POSITION.left) return center - 80
    return center + 80
  }

  deleteIfNeeded() {
    if (this.y < this.gm.canvas.height) return
    this.delete()
  }

  delete() {
    this.gm.blockManager.delete(this)
  }

  crushIfNeeded() {
    const carRect   = this.gm.car.rect()
    const blockRect = this.rect()
    if (this.position === POSITION.left) {
      if (carRect.lt[1] > blockRect.lb[1]) return
      if (carRect.lt[0] > blockRect.rb[0]) return
      if (carRect.lb[1] < blockRect.rt[1]) return
      this.crush()
      this.delete()
    }
    if (this.position === POSITION.right) {
      if (carRect.rt[1] > blockRect.rb[1]) return
      if (carRect.rt[0] < blockRect.lb[0]) return
      if (carRect.rb[1] < blockRect.rt[1]) return
      this.crush()
      this.delete()
    }
  }

  crush() {
    if (this.gm.car.crushing) return
    this.se.play()
    this.gm.speedSource.stop()
    this.gm.car.crushing = true
    setTimeout(() => {
      this.gm.speedSource.start()
      this.gm.car.crushing = false
    }, 3000)
  }

  rect() {
    return {
      lt: [this.x(),       this.y],
      rt: [this.x()+width, this.y],
      lb: [this.x(),       this.y+height],
      rb: [this.x()+width, this.y+height],
    }
  }

  draw() {
    if (!this.loaded) return

    const speed = this.gm.speedSource.speedToDraw()
    this.y += speed
    this.ctx.drawImage(this.img, this.x(), this.y, width, height)

    this.crushIfNeeded()
    this.deleteIfNeeded()
  }
}

module.exports = Block
