const Block = require(path.resolve('src/components/Block.js'))
const margin = 50 // Margin between blocks [meter]

class BlockManager {
  constructor(globalManager) {
    this.gm            = globalManager
    this.blocks        = []
    this.nextMileToPut = 0
    this.putBlockTImer = setInterval(() => {
      if (this.gm.speedSource.stopping) return
      if (this.nextMileToPut < this.gm.speedSource.mileage) {
        this.nextMileToPut += margin
        this.putBlock()
      }
    }, 2000)
  }

  putBlock() {
    this.blocks.push(new Block(this.gm))
  }

  draw() {
    this.blocks.forEach(block => block.draw())
  }

  delete(block) {
    const index = this.blocks.indexOf(block)
    if (index < 0) return
    this.blocks.splice(index, 1)
  }
}

module.exports = BlockManager
