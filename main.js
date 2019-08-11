const { app, BrowserWindow } = require('electron')

let win

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  win.webContents.openDevTools()

  win.on('closed',  () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (win != null) return
  createWindow()
})
