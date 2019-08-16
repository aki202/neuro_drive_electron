class SpeedSource {
  constructor(eegReceiver) {
    this.speed = 0

    this.eegReceiver = eegReceiver
    this.eegReceiver.on('data', data => {
      this.speed = data.eSense.attention / 10
      if (this.speed < 0) this.speed = 0
      //console.log('data', data.eSense.attention, this.speed)
    })
    this.eegReceiver.connect()

    //setInterval(() => { this.speed = Math.random() * 10 }, 1000)
  }
}

module.exports = SpeedSource
