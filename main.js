const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  win = new BrowserWindow({
    width: 600,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (win != null) return
  createWindow()
})
