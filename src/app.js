const path = require('path')
const thinkgear = require('node-thinkgear-sockets')
const Background = require(path.resolve('src/Background.js'))
const Road       = require(path.resolve('src/Road.js'))
const Car        = require(path.resolve('src/Car.js'))
const Text       = require(path.resolve('src/Text.js'))

let speed = 0

const client = thinkgear.createClient({ enableRawOutput: true  })
client.on('data', function(data) {
  speed = data.eSense.attention / 10 - 3
  if (speed < 0) speed = 0
  console.log('data', data.eSense.attention, speed)
})
client.connect()

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const background = new Background(canvas, ctx)
const road = new Road(canvas, ctx)
const car = new Car(canvas, ctx)
const text = new Text(canvas, ctx)

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

let interval = setInterval(draw, 10)
