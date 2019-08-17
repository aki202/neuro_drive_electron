const path         = require('path')
const Background   = require(path.resolve('src/Background.js'))
const Road         = require(path.resolve('src/Road.js'))
const Car          = require(path.resolve('src/Car.js'))
const Text         = require(path.resolve('src/Text.js'))
const EegReceiver  = require(path.resolve('src/EegReceiver.js'))
const SpeedSource  = require(path.resolve('src/SpeedSource.js'))
const BgmPlayer    = require(path.resolve('src/BgmPlayer.js'))

const maxMileage = 100000 // meter

const eegReceiver  = new EegReceiver()
const speedSource  = new SpeedSource(eegReceiver, maxMileage)
const bgmPlayer    = new BgmPlayer()
//bgmPlayer.play()

const canvas = document.getElementById('game')
const ctx    = canvas.getContext('2d')

const background  = new Background(canvas, ctx, speedSource)
const road        = new Road(canvas, ctx, speedSource)
const car         = new Car(canvas, ctx, eegReceiver)
const speedText   = new Text(canvas)
const mileageText = new Text(canvas)
const timeText    = new Text(canvas)
const goalText    = new Text(canvas, { textAlign: 'center', style: '#8b0000' })

const drawSpeedText = () => {
  const speedToDisplay = Math.round(speedSource.speed / 1000)
  speedText.draw(`Speed: ${speedToDisplay}km/h`, canvas.width-20, canvas.height-60, 40)
}
const drawMileageText = () => {
  mileageText.draw(`Total: ${speedSource.mileage}m/${maxMileage}m`, canvas.width-20, 80, 40)
}
const drawTimeText = () => {
  timeText.draw(`Time: ${Math.round(speedSource.time * 100) / 100} seconds`, canvas.width-20, 20, 40)
}
const drawGoalText = () => {
  if (!speedSource.goaled) return
  goalText.draw('GOAL!!', canvas.width/2, canvas.height/2-60, 120)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  background.draw()
  road.draw()
  car.draw()
  drawSpeedText()
  drawMileageText()
  drawTimeText()
  drawGoalText()
}

const interval = setInterval(draw, 10)
