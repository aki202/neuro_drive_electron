const path = require('path')
const Background = require(path.resolve('src/Background.js'))
const Road       = require(path.resolve('src/Road.js'))
const Car        = require(path.resolve('src/Car.js'))
const Text       = require(path.resolve('src/Text.js'))

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
//const port = new SerialPort('/dev/tty.MindWaveMobile-SerialPo')

const background = new Background(canvas, ctx)
const road = new Road(canvas, ctx)
const car = new Car(canvas, ctx)
const text = new Text(canvas, ctx)

let speed = 1

let interval

const drawSpeed = () => {
  const speedToDisplay = speed * 10
  text.draw(`Speed: ${speedToDisplay}km/h`, canvas.width-230, canvas.height-50, 30)
}

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  background.draw(speed)
  road.draw(speed)
  car.draw()
  drawSpeed()
}

interval = setInterval(draw, 10)
