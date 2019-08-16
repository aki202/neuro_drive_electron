const net    = require('net')
const events = require('events')
const util   = require('util')

class EegReceiver {
  constructor(options = {}) {
    this.port = options.port || 13854
    this.host = options.host || 'localhost'

    this.config = {
      enableRawOutput: !!options.enableRawOutput,
      format         : 'Json'
    }

    events.EventEmitter.call(this);
  }

  connect() {
    this.client = net.connect(this.port, this.host, () => {
      this.client.write(JSON.stringify(this.config))
    })

    this.client.on('data', data => {
      try {
        const json = JSON.parse(data.toString())
        //console.log('json', json)
        if (json['rawEeg'])        return this.emit('raw_data', json)
        if (json['blinkStrength']) return this.emit('on_blink', json)
        this.emit('data', json)
      } catch(e) {
        this.emit('parse_error', data.toString());
      }
    });
  }
}

util.inherits(EegReceiver, events.EventEmitter);

module.exports = EegReceiver
