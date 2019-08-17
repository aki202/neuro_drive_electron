class SpeedSource {
  constructor(eegReceiver, maxMileage) {
    this.speed    = 0 // meter an hour
    this.mileage  = 0 // total meter
    this.time     = 0
    this.mileageMeasureTimer
    this.timeRecordTimer
    this.goaled   = false
    this.stopping = false
    this.se       = new Audio(path.resolve('src/sounds/save.wav'))


    this.eegReceiver = eegReceiver
    this.eegReceiver.on('data', data => {
      if (this.stopping) return
      this.speed = data.eSense.attention * 1000
      if (this.speed < 0) this.speed = 0
      //console.log('data', data.eSense.attention, this.speed)
    })
    this.eegReceiver.connect()

    this.mileageMeasureTimer = setInterval(() => {
      this.mileage += Math.round(this.speed / 36000)
      if (this.mileage > maxMileage) {
        this.mileage = maxMileage
        clearInterval(this.mileageMeasureTimer)
        this.goaled = true
        this.se.play()
      }
    }, 100)

    this.timeRecordTimer = setInterval(() => {
      this.time += 0.1
      if (this.goaled) clearInterval(this.timeRecordTimer)
    }, 100)

    //setInterval(() => { if (this.stopping) return; this.speed = Math.random() * 100  * 1000 )
  }

  speedToDraw() {
    return this.speed / 10000
  }

  start() {
    this.stopping = false
  }

  stop() {
    this.stopping = true
    this.speed = 0
  }
}

module.exports = SpeedSource
