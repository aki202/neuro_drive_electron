const path          = require('path')
const GlobalManager = require(path.resolve('src/managers/GlobalManager.js'))
const Text          = require(path.resolve('src/components/Text.js'))
const BgmPlayer     = require(path.resolve('src/BgmPlayer.js'))

const canvas = document.getElementById('game')
const ctx    = canvas.getContext('2d')

const gm        = new GlobalManager(canvas)
const bgmPlayer = new BgmPlayer()
bgmPlayer.play()

const speedText   = new Text(gm)
const mileageText = new Text(gm)
const timeText    = new Text(gm)
const goalText    = new Text(gm, { textAlign: 'center', style: '#8b0000' })

const drawSpeedText = () => {
  const speedToDisplay = Math.round(gm.speedSource.speed / 1000)
  speedText.draw(`Speed: ${speedToDisplay}km/h`, canvas.width-20, canvas.height-60, 40)
}
const drawMileageText = () => {
  mileageText.draw(`Total: ${gm.speedSource.mileage}m/${gm.maxMileage}m`, canvas.width-20, 80, 40)
}
const drawTimeText = () => {
  timeText.draw(`Time: ${Math.round(gm.speedSource.time * 100) / 100} seconds`, canvas.width-20, 20, 40)
}
const drawGoalText = () => {
  if (!gm.speedSource.goaled) return
  goalText.draw('GOAL!!', canvas.width/2, canvas.height/2-60, 120)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  gm.background.draw()
  gm.road.draw()
  gm.car.draw()
  gm.blockManager.draw()
  drawSpeedText()
  drawMileageText()
  drawTimeText()
  drawGoalText()
}

const interval = setInterval(draw, 10)
