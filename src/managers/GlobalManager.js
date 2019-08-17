const path         = require('path')
const EegReceiver  = require(path.resolve('src/EegReceiver.js'))
const SpeedSource  = require(path.resolve('src/SpeedSource.js'))
const Background   = require(path.resolve('src/components/Background.js'))
const Road         = require(path.resolve('src/components/Road.js'))
const Car          = require(path.resolve('src/components/Car.js'))
const BlockManager = require(path.resolve('src/managers/BlockManager.js'))

class GlobalManager {
  constructor(canvas) {
    this.canvas       = canvas
    this.maxMileage   = 500
    this.eegReceiver  = new EegReceiver()
    this.speedSource  = new SpeedSource(this.eegReceiver, this.maxMileage)
    this.background   = new Background(this)
    this.road         = new Road(this)
    this.car          = new Car(this)
    this.blockManager = new BlockManager(this)
  }
}

module.exports = GlobalManager

