class BgmPlayer {
  constructor() {
    this.audio = new Audio(path.resolve('src/bgm.mp3'))
    this.audio.loop = true
  }

  play() {
    this.audio.play()
  }
}

module.exports = BgmPlayer
