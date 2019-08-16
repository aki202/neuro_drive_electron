const path         = require('path')
const Background   = require(path.resolve('src/Background.js'))
const Road         = require(path.resolve('src/Road.js'))
const Car          = require(path.resolve('src/Car.js'))
const Text         = require(path.resolve('src/Text.js'))
const EegReceiver  = require(path.resolve('src/EegReceiver.js'))
const SpeedSource  = require(path.resolve('src/SpeedSource.js'))
const BgmPlayer    = require(path.resolve('src/BgmPlayer.js'))

const eegReceiver  = new EegReceiver()
const speedSource  = new SpeedSource(eegReceiver)
const bgmPlayer    = new BgmPlayer()
//bgmPlayer.play()

const canvas = document.getElementById('game')
const ctx    = canvas.getContext('2d')

const background = new Background(canvas, ctx, speedSource)
const road       = new Road(canvas, ctx, speedSource)
const car        = new Car(canvas, ctx, eegReceiver)
const text       = new Text(canvas, ctx)

const drawSpeed = () => {
  const speedToDisplay = Math.round(speedSource.speed * 10)
  text.draw(`Speed: ${speedToDisplay}km/h`, canvas.width-230, canvas.height-50, 30)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  background.draw()
  road.draw()
  car.draw()
  drawSpeed()
}

const interval = setInterval(draw, 10)
